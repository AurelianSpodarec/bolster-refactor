import React from 'react';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { Link, withRouter } from 'react-router-dom';

const OptionValueListItem = ({
    optionValue,
    handleEditOptionValueModal,
    onMobile,
    headers,
    match: { url },
}) => (
    <tr>
        <td>
            {onMobile && <span className="mobile-table-heading">{headers[0]}</span>}
            {optionValue.name}
        </td>
        <td>
            {onMobile && <span className="mobile-table-heading">Actions</span>}
            <BlockButtonWrapper>
                <button
                    onClick={() => handleEditOptionValueModal(optionValue)}
                    className="button yellow"
                >
                    <i className="far fa-pencil" />
                    Edit
                </button>
                <Link to={`${url}/${optionValue.id}`} className="button">
                    Manage Option Value Documents
                </Link>
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default withRouter(OptionValueListItem);
