import React from 'react';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const AllCompanyAdminsListItem = ({
    option,
    handleEditOptionModal,
    handleDeleteOptionModal
}) => (
    <tr>
        <td>{option.name}</td>
        <td>
            <BlockButtonWrapper>
                <button
                    onClick={() => handleEditOptionModal(option)}
                    className="button yellow"
                >
                    <i className="far fa-pencil" />
                    Edit
                </button>
                <button
                    onClick={() => handleDeleteOptionModal(option)}
                    className="button red"
                >
                    <i className="far fa-trash-alt" />
                    Delete
                </button>
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default AllCompanyAdminsListItem;
