import { PIN_OPTION_TYPES_VALS } from './enums';

import Prelims from 'components/companyAdmin/pinOptions/prelims/Prelims';
import OptionSets from 'components/companyAdmin/pinOptions/optionSets/OptionSets';

const { installationTypes, itemTypes, frRatings } = PIN_OPTION_TYPES_VALS;

export const PIN_OPTIONS_TABS = [
    {
        id: installationTypes,
        name: 'Installation Types',
        component: OptionSets,
    },
    {
        id: itemTypes,
        name: 'Item Types',
        component: OptionSets,
    },
    {
        id: frRatings,
        name: 'FR Ratings',
        component: OptionSets,
    },
    {
        id: 4,
        name: 'Prelims',
        component: Prelims,
    },
];
