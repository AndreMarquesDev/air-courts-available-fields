import { error } from '@sveltejs/kit';
import { ClubId } from '../types/ClubId';
import type { Slot } from 'src/types/Slot';
import type { PageServerLoad } from './$types';

const FUTEBOL_7_ID = 2;
const DEFAULT_START_TIME = '20%3A00';

const formatDate = (date: Date) => date.toLocaleString('en-CA', { timeZone: 'Europe/Lisbon' }).slice(0, 10)
const addOneDayToDate = (date: Date) => date.setDate(date.getDate() + 1);

const getNextFiveDaysDates = (): string[] => {
    const date = new Date();

    const nextFiveDaysDates = [formatDate(date)];

    for (let index = 0; index < 4; index++) {
        addOneDayToDate(date)

        nextFiveDaysDates.push(formatDate(date))
    }

    return nextFiveDaysDates;
}

const fetchSlotsByClub = (clubId: ClubId): Promise<Slot[][]> => {
    const nextFiveDaysDates = getNextFiveDaysDates();

    return Promise.allSettled(nextFiveDaysDates.map((date) => {
        const url = `https://www.aircourts.com/index.php/api/search_with_club/${clubId}?sport=${FUTEBOL_7_ID}&date=${date}&start_time=${DEFAULT_START_TIME}`;

        console.log(url)

        return fetch(url).then((response) => response.json())
    })).then(
        (promiseResults) => {
            return promiseResults.map(result => {
                if (result.status === 'fulfilled' && result.value) {
                    const slots = result.value.results[0].slots as Slot[];
                    const availableSlots = slots.filter(
                        (slot) => slot.locked === false && slot.lock_reason !== 'insufficient_duration'
                    ) || [];
                    return availableSlots
                } else {
                    return []
                }
            })
        }
    );
}

export const load: PageServerLoad = async () => {
    const slots = await fetchSlotsByClub(ClubId.Rainha);

    // console.log('slots no server', slots)

    return {
        slots: slots
    };
    // const response = await fetch(
    //     // 'https://www.aircourts.com/index.php/api/search_with_club/411?sport=0&date=2022-10-01&start_time=20%3A00'
    //     'https://jsonplaceholder.typicode.com/todos/1'
    // );

    // if (response.status === 404) {
    //     return {
    //         slots: [] as Slot[]
    //     };
    // }

    // if (response.status === 200) {
    //     const data = (await response.json());

    //     // TODO: tirar isto, é só para o json placeholder
    //     if (data.title) {
    //         console.log(data)

    //         return { slots: [] as Slot[] }
    //     }

    //     const slots = data.results[0].slots as Slot[];
    //     const availableSlots = slots.filter(
    //         (slot) => slot.locked === false && slot.lock_reason !== 'insufficient_duration'
    //     );

    //     console.log(availableSlots)

    //     return {
    //         slots: availableSlots as Slot[]
    //     };
    // }

    // throw error(response.status);
};
