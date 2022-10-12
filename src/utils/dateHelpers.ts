import type { ClubInfoWithoutSlots } from 'src/types/ClubSlotsByDate';

// format date to dd/mm/yyyy
const formatDate = (date: Date): string[] =>
    date
        .toLocaleString('pt-PT', {
            timeZone: 'Europe/Lisbon',
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        })
        .split(', ');

// format date to yyyy-mm-dd
const formatDateForApi = (date: Date): string =>
    date.toLocaleString('en-CA', { timeZone: 'Europe/Lisbon' }).slice(0, 10);

const addOneDayToDate = (date: Date): number => date.setDate(date.getDate() + 1);

export const getNextSevenDaysDates = (): ClubInfoWithoutSlots[] => {
    const date = new Date();

    const nextSevenDaysDates: ClubInfoWithoutSlots[] = [];

    for (let index = 0; index < 7; index++) {
        if (index > 0) {
            addOneDayToDate(date);
        }

        const [weekday, formattedDate] = formatDate(date);
        const apiDate = formatDateForApi(date);

        nextSevenDaysDates.push({
            weekday,
            date: formattedDate,
            apiDate,
        });
    }

    return nextSevenDaysDates;
};
