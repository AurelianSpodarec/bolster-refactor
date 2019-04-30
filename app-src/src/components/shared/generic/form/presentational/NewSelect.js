import React from 'react';
import MultiSelect from '@khanacademy/react-multi-select';
import withFieldValidation from '../hocs/withFieldValidation';

const NewSelect = ({ options, value, onChange, name, singleSelect }) => {
    return (
        <div className={singleSelect ? 'single-select' : ''}>
            <MultiSelect
                overrideStrings={getOverrides()}
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

    function getOverrides() {
        let selectAll;
        if (singleSelect) {
            selectAll = value ? '-- Deselect --' : '-- Select an item --';
        } else {
            selectAll =
                value.length === options.length
                    ? '-- Deselect All --'
                    : '-- Select All --';
        }

        return {
            selectAll
        };
    }

    function renderSelected(selected, options) {
        if (!options.length) {
            return <span>No items available</span>;
        }

        if (!selected[0]) {
            if (singleSelect) {
                return <span>--- Select Option ---</span>;
            }

            return <span>--- Select Options ---</span>;
        }
    }
};

export default withFieldValidation(NewSelect);
