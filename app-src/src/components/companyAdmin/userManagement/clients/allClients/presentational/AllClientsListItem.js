import React from 'react';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import FlexWrapper from '../../../../../../components/shared/generic/flexWrapper/FlexWrapper';

const AllClientsListItem = ({
    client,
    goToEdit,
    goToEditEmail,
    onMobile,
    headers,
    disableClient,
    deleteClient,
}) => {
    return (
        <tr key={client.id} className={`${client.isDisabled ? 'grey-row' : ''}`}>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[0]}</span>}
                {`${client.firstName} ${client.lastName}`} <br />
                <span className="email">{client.email}</span>
                {client.isDisabled && <span>(DISABLED)</span>}
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[1]}</span>}
                {client.companyName}
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[2]}</span>}
                {client.phoneNumber}
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[3]}</span>}
                {client.lastLoginOn ? <DateTimeContainer date={client.lastLoginOn} /> : 'N/A'}
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[4]}</span>}
                {client.lastReportCreatedOn ? (
                    <DateTimeContainer date={client.lastReportCreatedOn} />
                ) : (
                    'N/A'
                )}
            </td>
            <td>
                {onMobile && <span className="mobile-table-heading">{headers[6]}</span>}
                <FlexWrapper justify="between" align="center">
                    <ButtonContainer to={`/company/users-management/clients/${client.id}`}>
                        View
                    </ButtonContainer>

                    <ActionMenu ellipsisPosition="fully-right">
                        <ActionMenuActionButton text="Edit" onClick={goToEdit} />
                        <ActionMenuActionButton text="Edit Email" onClick={goToEditEmail} />
                        <ActionMenuActionButton
                            onClick={disableClient}
                            text={client.isDisabled ? 'Enable' : 'Disable'}
                        />
                        <ActionMenuActionButton text="Delete" onClick={deleteClient} />
                    </ActionMenu>
                </FlexWrapper>
            </td>
        </tr>
    );
};

export default AllClientsListItem;
