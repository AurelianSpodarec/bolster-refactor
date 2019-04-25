import React from 'react';
import MultiSelect from '@khanacademy/react-multi-select';
import withFieldValidation from '../hocs/withFieldValidation';

const NewSelect = ({ options, value, onChange, name, singleSelect }) => (
    <div className={singleSelect ? 'single-select' : ''}>
        <MultiSelect
            name
            options={options}
            selected={singleSelect ? [value] : value}
            onSelectedChanged={selected => {
                let val;

                if (singleSelect && selected && selected.length > 2) val = null;
                else if (singleSelect) val = selected[1];
                else val = selected;

                onChange(name, val);
            }}
            overrideStrings={{
                selectAll: singleSelect ? '--- select single ---' : ''
            }}
            autoBlur={true}
        />
    </div>
);

export default withFieldValidation(NewSelect);
