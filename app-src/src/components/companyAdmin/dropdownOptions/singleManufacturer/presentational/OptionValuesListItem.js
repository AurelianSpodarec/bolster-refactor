import React from 'react';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { Link } from 'react-router-dom';
import withDrag from 'components/shared/dragDrop/hocs/withDrag';

const OptionValuesListItem = ({
    optionValue,
    handleEditOptionValueModal,
    onMobile,
    headers,
    url,
    selectedServiceNames,
    handleToggleEnable,
    forwardRef,
    isDragging,
    connectDropTarget,
    isSorting,
}) => {
    let rowClass = 'draggable';
    if (isDragging) rowClass += ' dragging';

    return connectDropTarget(
        <tr ref={isSorting ? forwardRef : null} className={rowClass}>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[0]}</span>}
                {optionValue.name}
            </td>

            <td>
                {onMobile && <span className="mobile-table-heading">{headers[1]}</span>}
                {selectedServiceNames}
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">Actions</span>}
                <BlockButtonWrapper>
                    {!optionValue.isDefault && (
                        <button
                            onClick={() => handleEditOptionValueModal(optionValue)}
                            className="button yellow"
                        >
                            <i className="far fa-pencil" />
                            Edit
                        </button>
                    )}
                    <button
                        onClick={handleToggleEnable}
                        className={`button ${optionValue.isEnabled ? 'red' : 'green'}`}
                    >
                        {optionValue.isEnabled ? (
                            <>
                                <i className="fa fa-minus fa-fw" />
                                Disable
                            </>
                        ) : (
                            <>
                                <i className="fa fa-plus fa-fw" />
                                Enable
                            </>
                        )}
                    </button>
                    <Link to={`${url}/${optionValue.id}/documents`} className="button">
                        <i className="fa fa-eye fa-fw" />
                        Documents
                    </Link>
                </BlockButtonWrapper>
            </td>
        </tr>,
    );
};

export default withDrag(OptionValuesListItem, 'MANUFACTURER_OPTION_VALUES');
