import type { ClubId } from './ClubId';
import type { ClubSlotsByDate } from './ClubSlotsByDate';

export interface ClubData {
    clubId: ClubId;
    clubSlotsByDateList: ClubSlotsByDate[];
}
