import type { Slot } from './Slot';

export interface ClubSlotsByDate {
    weekday: string;
    date: string;
    apiDate: string;
    slots: Slot[];
}

export type ClubInfoWithoutSlots = Omit<ClubSlotsByDate, 'slots'>;
