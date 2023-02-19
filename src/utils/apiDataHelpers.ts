import type { ApiSlot, ApiRawData } from '../types/ApiSlot';
import type { ApiSlotPrice } from '../types/ApiSlotPrice';
import { ClubId } from '../types/ClubId';
import type { ClubInfoWithoutSlots, ClubSlotsByDate } from '../types/ClubSlotsByDate';
import type { SlotWithoutPrice, Slot } from '../types/Slot';

export const DEFAULT_START_TIME = '17%3A00'; // 17:00
const FUTEBOL_7_ID = 2;
const afterHoursTimeslots = ['23:30', '00:00', '00:30', '01:00'];

export const clubsList: ClubId[] = [
    ClubId.Rainha,
    ClubId.Miraflores,
    ClubId.Restelo,
    ClubId.Marquês,
];

const getAvailableSlots = (slots: ApiSlot[]): ApiSlot[] => {
    const availableSlots =
        slots.filter(slot => {
            const slotIsNotLocked = slot.locked === false;
            const slotIsAtLeast60Minutes = slot.lock_reason !== 'insufficient_duration';
            const slotIsNotAfterHours = !afterHoursTimeslots.some(
                timeslot => timeslot === slot.start
            );

            return slotIsNotLocked && slotIsAtLeast60Minutes && slotIsNotAfterHours;
        }) || [];

    return availableSlots;
};

// eslint-disable-next-line camelcase
const pruneSlotData = ({ date, start, end, id, court_id }: ApiSlot): SlotWithoutPrice => {
    return {
        date,
        start,
        end,
        id,
        // eslint-disable-next-line camelcase
        courtId: court_id,
    };
};

const fetchPricesByTimeslot = (slot: SlotWithoutPrice): Promise<ApiSlotPrice> => {
    const { courtId, date, start, end } = slot;
    const url = `https://www.aircourts.com/index.php/api/calculate_booking_price/${courtId}/${date}/${start}/${end}/0/1?tier=0&user_id=0`;

    return fetch(url).then(res => res.json());
};

const addPriceToSlot = (slot: SlotWithoutPrice, apiSlotPrice: ApiSlotPrice): Slot => ({
    ...slot,
    price: apiSlotPrice.price,
    priceMultipliedBy2: parseFloat(apiSlotPrice.price) * 2,
});

const getPrices = async (slots: SlotWithoutPrice[]): Promise<Slot[]> => {
    const arrayOfPromisesOfFetchedPricesByTimeslot = slots.map(slot =>
        fetchPricesByTimeslot(slot).then(apiSlotPrice => addPriceToSlot(slot, apiSlotPrice))
    );

    const arrayOfSettledPromises = await Promise.allSettled(
        arrayOfPromisesOfFetchedPricesByTimeslot
    );

    const arrayOfSlotsWithPrices = arrayOfSettledPromises.map(result => {
        const resultHasData = result.status === 'fulfilled' && !!result.value;

        if (resultHasData) {
            return result.value;
        }

        return undefined;
    });

    return arrayOfSlotsWithPrices.filter((slot): slot is Slot => typeof slot !== 'undefined');
};

const getFilteredSlots = (slots: ApiSlot[]): SlotWithoutPrice[] => {
    const availableSlots = getAvailableSlots(slots);
    const prunedAvailableSlots = availableSlots.map(slot => pruneSlotData(slot));

    return prunedAvailableSlots;
};

const fetchClubDataForDay = (clubId: ClubId, date: ClubInfoWithoutSlots): Promise<ApiRawData> => {
    const url = `https://www.aircourts.com/index.php/api/search_with_club/${clubId}?sport=${FUTEBOL_7_ID}&date=${date.apiDate}&start_time=${DEFAULT_START_TIME}`;

    return fetch(url).then(response => response.json());
};

export const getFilteredDataFromApi = async (
    clubId: ClubId,
    nextSevenDaysDates: ClubInfoWithoutSlots[]
): Promise<Promise<Slot[]>[]> => {
    const arrayOfSettledPromises = await Promise.allSettled(
        nextSevenDaysDates.map(date => fetchClubDataForDay(clubId, date))
    );

    const arrayOfSlotsWithoutPrices = arrayOfSettledPromises.map(async result => {
        const hasData = result.status === 'fulfilled' && !!result.value;

        if (hasData) {
            const slots = getFilteredSlots(result.value.results[0].slots);
            const slotsWithPrices = await getPrices(slots);

            return slotsWithPrices;
        }

        return [];
    });

    return arrayOfSlotsWithoutPrices;
};

export const buildClubInfo = (
    clubSlotsForNext5Days: Slot[][],
    nextSevenDaysDates: ClubInfoWithoutSlots[]
): ClubSlotsByDate[] => {
    return clubSlotsForNext5Days.map((slotsListByDate, index) => {
        const slotDate = nextSevenDaysDates[index];

        return {
            ...slotDate,
            slots: slotsListByDate,
        };
    });
};
