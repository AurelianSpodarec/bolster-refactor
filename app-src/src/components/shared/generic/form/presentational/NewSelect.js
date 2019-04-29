import React from 'react';
import MultiSelect from '@khanacademy/react-multi-select';
import withFieldValidation from '../hocs/withFieldValidation';

const NewSelect = ({ options, value, onChange, name, singleSelect }) => {
    return (
        <div className={singleSelect ? 'single-select' : ''}>
            <MultiSelect
                overrideStrings={{
                    selectAll: singleSelect ? '--- select single ---' : ''
                }}
                name
                options={options}
                selected={singleSelect ? [value] : value}
                onSelectedChanged={handleSelectChange}
                valueRenderer={renderSelected}
                autoBlur={true}
            />
        </div>
    );

    function handleSelectChange(selected) {
        let val;

        if (singleSelect && selected && selected.length > 2) val = null;
        else if (singleSelect) val = selected[1];
        else val = selected;

        onChange(name, val);
    }

    function renderSelected(selected, options) {
        if (!options.length) {
            return <span>No items available</span>;
        }
    }
};

export default withFieldValidation(NewSelect);
