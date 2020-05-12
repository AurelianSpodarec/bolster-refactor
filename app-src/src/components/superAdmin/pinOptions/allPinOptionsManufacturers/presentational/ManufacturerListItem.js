import React from 'react';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const ManufacturerListItem = ({ manufacturer, handleEditManufacturerModal, onMobile, headers }) => (
    <tr>
        <td>
            {onMobile && <span className="mobile-table-heading">{headers[0]}</span>}
            {manufacturer.name}
        </td>
        <td>
            {onMobile && <span className="mobile-table-heading">Actions</span>}
            <BlockButtonWrapper>
                <button
                    onClick={() => handleEditManufacturerModal(manufacturer)}
                    className="button yellow"
                >
                    <i className="far fa-pencil" />
                    Edit
                </button>
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default ManufacturerListItem;
