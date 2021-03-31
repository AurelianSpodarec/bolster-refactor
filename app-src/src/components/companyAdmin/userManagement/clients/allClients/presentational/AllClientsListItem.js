import React from 'react';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const AllClientsListItem = ({
    client,
    goToEdit,
    onMobile,
    headers,
    disableClient,
    deleteClient,
}) => (
    <tr key={client.id} style={{ opacity: client.isDisabled ? 0.5 : 1 }}>
        <td>
            {onMobile && <span className="mobile-table-heading">{headers[0]}</span>}
            {`${client.firstName} ${client.lastName}`}
        </td>
        <td>
            {onMobile && <span className="mobile-table-heading">{headers[1]}</span>}
            {client.companyName}
        </td>
        <td>
            {onMobile && <span className="mobile-table-heading">{headers[2]}</span>}
            {client.email}
        </td>
        <td>
            {onMobile && <span className="mobile-table-heading">{headers[3]}</span>}
            {client.phoneNumber}
        </td>
        <td>
            {onMobile && <span className="mobile-table-heading">{headers[4]}</span>}
            {client.lastLoginOn ? <DateTimeContainer date={client.lastLoginOn} /> : 'N/A'}
        </td>
        <td>
            {onMobile && <span className="mobile-table-heading">{headers[5]}</span>}
            {client.lastReportCreatedOn ? (
                <DateTimeContainer date={client.lastReportCreatedOn} />
            ) : (
                'N/A'
            )}
        </td>
        <td>
            {onMobile && <span className="mobile-table-heading">{headers[6]}</span>}
            <BlockButtonWrapper>
                <ButtonContainer to={`/company/users-management/clients/${client.id}`}>
                    View
                </ButtonContainer>
                <button className="button yellow" onClick={goToEdit}>
                    <i className="fal fa-pencil" /> Edit
                </button>
                <button
                    className={`button ${client.isDisabled ? 'green' : 'red'}`}
                    onClick={disableClient}
                >
                    <i className="fal fa-ban" /> {client.isDisabled ? 'Enable' : 'Disable'}
                </button>
                <button className="button red" onClick={deleteClient}>
                    <i className="fal fa-ban" /> Delete
                </button>
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default AllClientsListItem;
