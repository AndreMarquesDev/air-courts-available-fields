/* eslint-disable camelcase */

export interface Slot {
    id: string;
    date: string;
    start: string;
    end: string;
    court_id: string;
    locked: boolean;
    status: string;
    debug: unknown[];
    forward: number;
    durations: number[];
    lock_reason?: string;
}
