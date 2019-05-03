import React from 'react';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const AllCompanyAdminsListItem = ({ option, showModal }) => (
    <tr>
        <td>{option.name}</td>
        <td>
            <BlockButtonWrapper>
                <button className="button red">
                    <i className="far fa-trash-alt" />
                    Delete
                </button>
                <button className="button yellow">
                    <i className="far fa-pencil" />
                    Edit
                </button>
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default AllCompanyAdminsListItem;
