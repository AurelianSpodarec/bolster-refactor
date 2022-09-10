import AccordionButton from 'components_DEPRECATED/shared/generic/button/presentational/AccordionButton';
import Tickbox from 'components_DEPRECATED/shared/generic/form/presentational/Tickbox';
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
            <div className="tickbox-cell">
                <Tickbox name="" checked={isSelected} handleChange={_handleToggleItem} />
            </div>
            <div className="tickbox-cell">
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
