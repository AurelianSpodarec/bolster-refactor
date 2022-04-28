import AccordionButton from 'components/shared/generic/button/presentational/AccordionButton';
import Tickbox from 'components/shared/generic/form/presentational/Tickbox';
import React from 'react';

const ListItemControls = ({
    isSelected = false,
    handleToggleItem = () => {},
    isExpanded = false,
    setIsExpanded = () => {},
    hideExpandButton = false,
    item,
}) => {
    const _handleToggleItem = () => {
        handleToggleItem(item);
    };

    return (
        <div className="table-cell-controls">
            <div>
                <Tickbox name="" checked={isSelected} handleChange={_handleToggleItem} />
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
