import React from 'react';

import Dropdown from './Dropdown';

const Filter = ({ title, options, selectedOption, handleInputChange }) => (
    <div className="filter">
        <div className="form-field size-lg-12">
            <label className="title">{title}</label>
            <Dropdown
                options={options}
                selectedOption={selectedOption}
                handleChange={handleInputChange}
            />
        </div>
    </div>
);

export default Filter;
