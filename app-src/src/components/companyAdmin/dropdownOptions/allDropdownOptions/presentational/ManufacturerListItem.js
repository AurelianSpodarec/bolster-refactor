import React from 'react';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { Link } from 'react-router-dom';
import withDrag from 'components/shared/dragDrop/hocs/withDrag';

const ManufacturerListItem = ({
    manufacturer,
    handleEditManufacturerModal,
    handleToggleEnable,
    onMobile,
    headers,
    url,
    forwardRef,
    isDragging,
    isSorting,
    connectDropTarget,
}) => {
    let rowClass = 'draggable';
    if (isDragging) rowClass += ' dragging';

    return connectDropTarget(
        <tr ref={isSorting ? forwardRef : null} className={rowClass}>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[0]}</span>}
                {manufacturer.name}
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">Actions</span>}
                <BlockButtonWrapper>
                    {!manufacturer.isDefault && (
                        <button
                            onClick={() => handleEditManufacturerModal(manufacturer)}
                            className="button yellow"
                        >
                            <i className="far fa-pencil" />
                            Edit
                        </button>
                    )}

                    <button
                        onClick={handleToggleEnable}
                        className={`button ${manufacturer.isEnabled ? 'red' : 'green'}`}
                    >
                        {manufacturer.isEnabled ? (
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

                    <Link to={`${url}/${manufacturer.id}`} className="button">
                        <i className="fa fa-eye fa-fw" />
                        Values
                    </Link>
                </BlockButtonWrapper>
            </td>
        </tr>,
    );
};

export default withDrag(ManufacturerListItem, 'MANUFACTURERS');
