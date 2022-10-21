export interface Slot {
    date: string;
    start: string;
    end: string;
    id: string;
    courtId: string;
    price: string;
    priceMultipliedBy2: number;
}

export type SlotWithoutPrice = Omit<Slot, 'price' | 'priceMultipliedBy2'>;
