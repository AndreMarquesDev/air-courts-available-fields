import { add, format } from 'date-fns';
import pt from 'date-fns/locale/pt/index';
import enCA from 'date-fns/locale/en-CA/index';
import type { ClubInfoWithoutSlots } from '../types/ClubSlotsByDate';

export const getNextSevenDaysDates = (): ClubInfoWithoutSlots[] => {
    const date = new Date();

    const nextSevenDaysDates: ClubInfoWithoutSlots[] = [];

    for (let index = 0; index < 7; index++) {
        let newDate = date;

        if (index > 0) {
            newDate = add(date, { days: index });
        }

        const formattedDate = format(newDate, 'dd/MM/yyyy', { locale: pt });
        const weekday = format(newDate, 'EEEE', { locale: pt });
        const apiDate = format(newDate, 'yyyy-MM-dd', { locale: enCA });

        nextSevenDaysDates.push({
            weekday,
            date: formattedDate,
            apiDate,
        });
    }

    return nextSevenDaysDates;
};
