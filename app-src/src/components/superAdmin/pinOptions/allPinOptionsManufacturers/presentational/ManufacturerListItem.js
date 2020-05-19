import React from 'react';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { Link, withRouter } from 'react-router-dom';

const ManufacturerListItem = ({
    manufacturer,
    handleEditManufacturerModal,
    onMobile,
    headers,
    match: { url },
}) => (
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
                <Link to={`${url}/${manufacturer.id}`} className="button">
                    <i className="fa fa-eye fa-fw" />
                    Values
                </Link>
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default withRouter(ManufacturerListItem);
