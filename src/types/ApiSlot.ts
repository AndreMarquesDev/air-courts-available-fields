export interface ApiSlot {
    id: string;
    date: string;
    start: string;
    end: string;
    court_id: string; // eslint-disable-line camelcase
    locked: boolean;
    status: string;
    debug: unknown[];
    forward: number;
    durations: number[];
    lock_reason?: string; // eslint-disable-line camelcase
}
