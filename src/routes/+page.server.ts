import type { ClubData } from 'src/types/ClubData';
import { buildClubInfo, clubsList, getFilteredDataFromApi } from '../utils/apiDataHelpers';
import { getNextSevenDaysDates } from '../utils/dateHelpers';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async () => {
    const nextSevenDaysDates = getNextSevenDaysDates();

    const arrayOfPromisesOfArrayOfSlots = clubsList.map(async club => {
        const filteredSlots = await getFilteredDataFromApi(club, nextSevenDaysDates);
        const arrayOfSettledPromises = await Promise.allSettled(filteredSlots);

        const arrayOfSlots = arrayOfSettledPromises.map(result => {
            const hasData = result.status === 'fulfilled' && !!result.value;

            if (hasData) {
                return result.value;
            }

            return [];
        });

        return arrayOfSlots;
    });

    const arrayOfPromises = await Promise.allSettled(arrayOfPromisesOfArrayOfSlots);

    const dataByClub: ClubData[] = arrayOfPromises.map((result, index) => {
        const hasData = result.status === 'fulfilled' && !!result.value;

        if (hasData) {
            const clubSlotsForNext5Days = result.value;
            const clubSlotsByDateList = buildClubInfo(clubSlotsForNext5Days, nextSevenDaysDates);

            return {
                clubId: clubsList[index],
                clubSlotsByDateList,
            };
        }

        return {
            clubId: clubsList[index],
            clubSlotsByDateList: [],
        };
    });

    return {
        date: `${new Date().getHours()}h${new Date().getMinutes()}`,
        allClubsInfo: dataByClub,
    };
};
