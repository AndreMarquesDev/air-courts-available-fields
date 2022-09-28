import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export interface Slot {
    id: string;
    date: string;
    start: string;
    end: string;
    court_id: string;
    locked: boolean,
    status: string;
    debug: [];
    forward: number;
    durations: number[];
    lock_reason?: string;
};

export const load: PageServerLoad = async () => {
    const response = await fetch(
        'https://www.aircourts.com/index.php/api/search_with_club/411?sport=0&date=2022-10-01&start_time=20%3A00'
        // 'https://jsonplaceholder.typicode.com/todos/1'
    );

    if (response.status === 404) {
        return {
            slots: [] as Slot[]
        };
    }

    if (response.status === 200) {
        const data = (await response.json());

        // TODO: tirar isto, é só para o json placeholder
        if (data.title) {
            console.log(data)

            return { slots: [] as Slot[] }
        }

        const slots = data.results[0].slots as Slot[];
        const availableSlots = slots.filter(
            (slot) => slot.locked === false && slot.lock_reason !== 'insufficient_duration'
        );

        console.log(availableSlots)

        return {
            slots: availableSlots as Slot[]
        };
    }

    throw error(response.status);
};
