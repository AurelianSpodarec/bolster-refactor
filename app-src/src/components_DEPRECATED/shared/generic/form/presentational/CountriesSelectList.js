import React from 'react';

import { countriesListOptions } from 'constants/shared/countries';
import Select from './Select';

const CountriesSelectList = props => {
    const options = countriesListOptions.map(c => ({ value: c, label: c }));
    return <Select {...props} options={options} search />;
};

export default CountriesSelectList;
