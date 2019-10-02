import React from 'react';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const DropdownOptionsListItem = ({
    option,
    handleEditOptionModal,
    handleDeleteOptionModal,
    onMobile,
    headers
}) => (
    <tr>
        <td>
            {onMobile && <span className="mobile-table-heading">{headers[0]}</span>}
            {option.name}
        </td>
        <td>
            {onMobile && <span className="mobile-table-heading">Actions</span>}
            <BlockButtonWrapper>
                <button onClick={() => handleEditOptionModal(option)} className="button yellow">
                    <i className="far fa-pencil" />
                    Edit
                </button>
                <button onClick={() => handleDeleteOptionModal(option)} className="button red">
                    <i className="far fa-trash-alt" />
                    Delete
                </button>
                {option.isDisabled ? (
                    <button className="button red">
                        <i className="far fa-times fa-fw" />
                        Disable
                    </button>
                ) : (
                    <button className="button green">
                        <i className="far fa-check fa-fw" />
                        Enable
                    </button>
                )}
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default DropdownOptionsListItem;
