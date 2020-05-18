import React from 'react';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { Link, withRouter } from 'react-router-dom';

const OptionValuesListItem = ({
    optionValue,
    handleEditOptionValueModal,
    onMobile,
    headers,
    match: { url },
    selectedServiceNames,
    handleToggleEnable,
}) => (
    <tr>
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
                    className={`button ${optionValue.isDisabled ? 'green' : 'red'}`}
                >
                    {optionValue.isDisabled ? (
                        <>
                            <i className="fa fa-plus fa-fw" />
                            Enable
                        </>
                    ) : (
                        <>
                            <i className="fa fa-minus fa-fw" />
                            Disable
                        </>
                    )}
                </button>
                <Link to={`${url}/${optionValue.id}/documents`} className="button">
                    Manage Option Value Documents
                </Link>
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default withRouter(OptionValuesListItem);
