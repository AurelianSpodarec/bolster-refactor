import AccordionButton from 'components/shared/generic/button/presentational/AccordionButton';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import Tickbox from 'components/shared/generic/form/presentational/Tickbox';
import React from 'react';

const ListItemControls = ({
    isSelected = false,
    onChange = () => {},
    isExpanded = false,
    setIsExpanded = () => {},
}) => {
    return (
        <div className="table-cell-controls">
            <div>
                <Tickbox name="" value={isSelected} handleChange={onChange} />
            </div>
            <div>
                <AccordionButton
                    name=""
                    active={isExpanded}
                    onClick={() => setIsExpanded(!isExpanded)}
                />
            </div>
        </div>
    );
};

export default ListItemControls;
