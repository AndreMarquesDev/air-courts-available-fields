import type { ClubInfo } from 'src/types/ClubInfo';
import { getFilteredDataFromApi } from '../utils/apiDataHelpers';
import { getNextFiveDaysDates } from '../utils/dateHelpers';
import { ClubId } from '../types/ClubId';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async () => {
    const nextFiveDaysDates = getNextFiveDaysDates();
    const slots = await getFilteredDataFromApi(ClubId.Rainha, nextFiveDaysDates);

    const clubInfo = slots.map((slotsListByDate, index): ClubInfo => {
        const slotDate = nextFiveDaysDates[index];

        return {
            ...slotDate,
            clubId: ClubId.Rainha,
            slots: slotsListByDate,
        };
    });

    return {
        // TODO: será clubInfo o melhor nome? Rever o nome do componente também
        clubInfo,
        teste: `${new Date().getHours()}h${new Date().getMinutes()} - ${new Date().getSeconds()}`,
    };
};
