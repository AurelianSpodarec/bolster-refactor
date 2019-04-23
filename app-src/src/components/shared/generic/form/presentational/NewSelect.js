import React from 'react';
import MultiSelect from '@khanacademy/react-multi-select';

const NewSelect = ({ options, value, onChange, name, singleSelect }) => (
    <MultiSelect
        name
        options={options}
        selected={singleSelect ? [value] : value}
        onSelectedChanged={onChange}
        selectAll={null}
    />
);

export default NewSelect;
