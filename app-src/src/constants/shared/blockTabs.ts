import FRRatings from 'components/companyAdmin/pinOptions/frRatings/FRRatings';
import InstallationTypeSets from 'components/companyAdmin/pinOptions/installationTypes/InstallationTypeSets';
import ItemTypeSets from 'components/companyAdmin/pinOptions/itemTypes/ItemTypeSets';
import Prelims from 'components/companyAdmin/pinOptions/prelims/Prelims';

export const PIN_OPTIONS_TABS = [
    {
        id: 1,
        name: 'Installation Types',
        component: InstallationTypeSets,
    },
    {
        id: 2,
        name: 'Item Types',
        component: ItemTypeSets,
    },
    {
        id: 3,
        name: 'FR Ratings',
        component: FRRatings,
    },
    {
        id: 4,
        name: 'Prelims',
        component: Prelims,
    },
];
