import type { ClubId } from './ClubId';
import type { Slot } from './Slot';

export interface ClubInfo {
    weekday: string;
    date: string;
    apiDate: string;
    clubId: ClubId;
    slots: Slot[];
}

export type ClubInfoWithoutSlots = Omit<ClubInfo, 'slots' | 'clubId'>;
