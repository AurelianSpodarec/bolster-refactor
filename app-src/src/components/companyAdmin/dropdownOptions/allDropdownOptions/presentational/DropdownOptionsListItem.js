import React from 'react';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const DropdownOptionsListItem = ({
    option,
    handleEditOptionModal,
    handleToggleEnable,
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

                <button
                    onClick={handleToggleEnable}
                    className={`button ${option.isDisabled ? 'green' : 'red'}`}
                >
                    {option.isDisabled ? (
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
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default DropdownOptionsListItem;
