import AccordionButton from 'components/shared/generic/button/presentational/AccordionButton';
import Tickbox from 'components/shared/generic/form/presentational/Tickbox';
import React from 'react';

const ListItemControls = ({
    isSelected = false,
    onChange = () => {},
    isExpanded = false,
    setIsExpanded = () => {},
    hideExpandButton = false,
}) => {
    return (
        <div className="table-cell-controls">
            <div>
                <Tickbox name="" value={isSelected} handleChange={onChange} />
            </div>
            <div>
                {!hideExpandButton && (
                    <AccordionButton
                        name=""
                        active={isExpanded}
                        onClick={() => setIsExpanded(!isExpanded)}
                    />
                )}
            </div>
        </div>
    );
};

export default ListItemControls;
