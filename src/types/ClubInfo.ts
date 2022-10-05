import type { Slot } from './Slot';

export interface ClubInfo {
    weekday: string;
    date: string;
    apiDate: string;
    slots: Slot[];
}

export type ClubInfoWithoutSlots = Omit<ClubInfo, 'slots'>;
