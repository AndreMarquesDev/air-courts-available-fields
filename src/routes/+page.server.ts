import type { ApiSlot } from 'src/types/ApiSlot';
import type { ClubInfo, ClubInfoWithoutSlots } from 'src/types/ClubInfo';
import type { Slot } from 'src/types/Slot';
import { ClubId } from '../types/ClubId';
import type { PageServerLoad } from './$types';

const FUTEBOL_7_ID = 2;
const DEFAULT_START_TIME = '20%3A00';

// format date to dd/mm/yyyy
const formatDate = (date: Date): string[] =>
    date
        .toLocaleString('pt-PT', {
            timeZone: 'Europe/Lisbon',
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        })
        .split(', ');

// format date to yyy-mm-dd
const formatDateForApi = (date: Date): string =>
    date.toLocaleString('en-CA', { timeZone: 'Europe/Lisbon' }).slice(0, 10);

const addOneDayToDate = (date: Date): number => date.setDate(date.getDate() + 1);

// const getNextFiveDaysDates = (): { weekday: string; date: string; apiDate: string }[] => {
const getNextFiveDaysDates = (): ClubInfoWithoutSlots[] => {
    const date = new Date();

    const nextFiveDaysDates: ClubInfoWithoutSlots[] = [];

    for (let index = 0; index < 5; index++) {
        if (index > 0) {
            addOneDayToDate(date);
        }

        const [weekday, formattedDate] = formatDate(date);
        const apiDate = formatDateForApi(date);

        nextFiveDaysDates.push({
            weekday,
            date: formattedDate,
            apiDate,
        });
    }

    return nextFiveDaysDates;
};

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

const fetchSlotsByClub = (clubId: ClubId): Promise<Slot[][]> => {
    const nextFiveDaysDates = getNextFiveDaysDates();

    return Promise.allSettled(
        nextFiveDaysDates.map(date => {
            const url = `https://www.aircourts.com/index.php/api/search_with_club/${clubId}?sport=${FUTEBOL_7_ID}&date=${date.apiDate}&start_time=${DEFAULT_START_TIME}`;

            return fetch(url).then(response => response.json());
        })
    ).then(promiseResults => {
        return promiseResults.map(result => {
            if (result.status === 'fulfilled' && result.value) {
                const slots = result.value.results[0].slots as ApiSlot[];
                const availableSlots = getAvailableSlots(slots);
                const prunedAvailableSlots = availableSlots.map(slot => pruneSlotData(slot));

                return prunedAvailableSlots;
            }

            return [];
        });
    });
};

export const load: PageServerLoad = async () => {
    // const slots = await fetchSlotsByClub(ClubId.Rainha);
    const slots = mockSlots; // eslint-disable-line @typescript-eslint/no-use-before-define

    const clubInfo = slots.map((slotsListByDate, index): ClubInfo => {
        const slotDate = getNextFiveDaysDates()[index];

        return {
            ...slotDate,
            slots: slotsListByDate,
        };
    });

    return {
        // TODO: será clubInfo o melhor nome? Rever o nome do componente também
        clubInfo,
    };
};

const mockSlots: Slot[][] = [
    [
        {
            id: '32117286567',
            date: '2022-10-04',
            start: '23:00',
            end: '23:30',
            courtId: '1787',
        },
    ],
    [
        {
            id: '32117286599',
            date: '2022-10-05',
            start: '21:00',
            end: '21:30',
            courtId: '1787',
        },
        {
            id: '32117286600',
            date: '2022-10-05',
            start: '21:30',
            end: '22:00',
            courtId: '1787',
        },
        {
            id: '32117286601',
            date: '2022-10-05',
            start: '22:00',
            end: '22:30',
            courtId: '1787',
        },
        {
            id: '32117286602',
            date: '2022-10-05',
            start: '22:30',
            end: '23:00',
            courtId: '1787',
        },
        {
            id: '32117286603',
            date: '2022-10-05',
            start: '23:00',
            end: '23:30',
            courtId: '1787',
        },
    ],
    [],
    [
        {
            id: '32117286630',
            date: '2022-10-07',
            start: '21:00',
            end: '21:30',
            courtId: '1787',
        },
        {
            id: '32117286631',
            date: '2022-10-07',
            start: '21:30',
            end: '22:00',
            courtId: '1787',
        },
        {
            id: '32117286632',
            date: '2022-10-07',
            start: '22:00',
            end: '22:30',
            courtId: '1787',
        },
        {
            id: '32117286633',
            date: '2022-10-07',
            start: '22:30',
            end: '23:00',
            courtId: '1787',
        },
        {
            id: '32117286634',
            date: '2022-10-07',
            start: '23:00',
            end: '23:30',
            courtId: '1787',
        },
    ],
    [
        {
            id: '32117286664',
            date: '2022-10-08',
            start: '20:00',
            end: '20:30',
            courtId: '1787',
        },
        {
            id: '32117286668',
            date: '2022-10-08',
            start: '22:00',
            end: '22:30',
            courtId: '1787',
        },
        {
            id: '32117286669',
            date: '2022-10-08',
            start: '22:30',
            end: '23:00',
            courtId: '1787',
        },
        {
            id: '32117286670',
            date: '2022-10-08',
            start: '23:00',
            end: '23:30',
            courtId: '1787',
        },
    ],
];
