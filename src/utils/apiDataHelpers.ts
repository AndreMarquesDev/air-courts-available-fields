import type { ApiRawData, ApiSlot } from 'src/types/ApiSlot';
import type { ClubInfoWithoutSlots, ClubSlotsByDate } from 'src/types/ClubSlotsByDate';
import type { Slot } from 'src/types/Slot';
import { ClubId } from '../types/ClubId';

const FUTEBOL_7_ID = 2;
const DEFAULT_START_TIME = '20%3A00'; // 20:00

export const clubsList: ClubId[] = [
    ClubId.Rainha,
    ClubId.Miraflores,
    ClubId.Restelo,
    ClubId.Marquês,
];

const getAvailableSlots = (slots: ApiSlot[]): ApiSlot[] =>
    slots.filter(slot => slot.locked === false && slot.lock_reason !== 'insufficient_duration') ||
    [];

// eslint-disable-next-line camelcase
const pruneSlotData = ({ date, start, end, id, court_id }: ApiSlot): Slot => {
    return {
        date,
        start,
        end,
        id,
        courtId: court_id,
    };
};

export const getFilteredSlots = (slots: ApiSlot[]): Slot[] => {
    const availableSlots = getAvailableSlots(slots);
    const prunedAvailableSlots = availableSlots.map(slot => pruneSlotData(slot));

    return prunedAvailableSlots;
};

const fetchClubDataForDay = (clubId: ClubId, date: ClubInfoWithoutSlots): Promise<ApiRawData> => {
    const url = `https://www.aircourts.com/index.php/api/search_with_club/${clubId}?sport=${FUTEBOL_7_ID}&date=${date.apiDate}&start_time=${DEFAULT_START_TIME}`;

    return fetch(url).then(response => response.json());
};

export const getFilteredDataFromApi = (
    clubId: ClubId,
    nextFiveDaysDates: ClubInfoWithoutSlots[]
): Promise<Slot[][]> => {
    const apiRawDataPromise = Promise.allSettled(
        nextFiveDaysDates.map(date => fetchClubDataForDay(clubId, date))
    );

    return apiRawDataPromise.then(promiseResults => {
        return promiseResults.map(result => {
            const hasData = result.status === 'fulfilled' && result.value;

            if (hasData) {
                const slots = getFilteredSlots(result.value.results[0].slots);

                return slots;
            }

            return [];
        });
    });
};

export const buildClubInfo = (
    clubSlotsForNext5Days: Slot[][],
    nextFiveDaysDates: ClubInfoWithoutSlots[]
): ClubSlotsByDate[] => {
    return clubSlotsForNext5Days.map((slotsListByDate, index) => {
        const slotDate = nextFiveDaysDates[index];

        return {
            ...slotDate,
            slots: slotsListByDate,
        };
    });
};
