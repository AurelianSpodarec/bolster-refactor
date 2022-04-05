import FRRatings from 'components/companyAdmin/pinOptions/frRatings/FRRatings';
import InstallationTypes from 'components/companyAdmin/pinOptions/installationTypes/InstallationTypes';
import ItemTypes from 'components/companyAdmin/pinOptions/itemTypes/ItemTypes';
import Prelims from 'components/companyAdmin/pinOptions/prelims/Prelims';

export const PIN_OPTIONS_TABS = [
    {
        id: 1,
        name: 'Installation Types',
        component: InstallationTypes,
    },
    {
        id: 2,
        name: 'Item Types',
        component: ItemTypes,
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
