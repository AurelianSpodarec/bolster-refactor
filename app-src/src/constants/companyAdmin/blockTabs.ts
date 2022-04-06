import { DROPDOWN_OPTION_VALS } from './enums';

import FRRatings from 'components/companyAdmin/pinOptions/frRatings/FRRatings';
import InstallationTypeSets from 'components/companyAdmin/pinOptions/installationTypeSets/InstallationTypeSets';
import ItemTypeSets from 'components/companyAdmin/pinOptions/itemTypeSets/ItemTypeSets';
import Prelims from 'components/companyAdmin/pinOptions/prelims/Prelims';

const { installationTypes, itemTypes, frRatings } = DROPDOWN_OPTION_VALS;

export const PIN_OPTIONS_TABS = [
    {
        id: installationTypes,
        name: 'Installation Types',
        component: InstallationTypeSets,
    },
    {
        id: itemTypes,
        name: 'Item Types',
        component: ItemTypeSets,
    },
    {
        id: frRatings,
        name: 'FR Ratings',
        component: FRRatings,
    },
    {
        id: 4,
        name: 'Prelims',
        component: Prelims,
    },
];
