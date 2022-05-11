import React from 'react';

import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import LinkButton from 'components/shared/generic/button/presentational/LinkButton';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';

const ClientsList = ({ location, clients, handleDeleteClientModal }) =>
    clients.map(client => (
        <tr key={`${client.id} ${client.userFirstName}`}>
            <td>{`${client.userFirstName} ${client.userLastName} - (${client.companyName})`}</td>
            <td>
                <FlexWrapper>
                    <ButtonWrapper>
                        <LinkButton
                            href={`${location.pathname}/edit-client/${client.id}`}
                            icon="far fa-pencil fa-fw"
                            source="secondary"
                            ambient="positive"
                            extraClasses="icon-only"
                        />
                    </ButtonWrapper>
                    <ButtonWrapper>
                        <ActionButton
                            href="#"
                            onClick={() => handleDeleteClientModal(client.id)}
                            icon="far fa-trash-alt fa-fw"
                            source="secondary"
                            ambient="positive"
                            extraClasses="icon-only"
                        />
                    </ButtonWrapper>
                </FlexWrapper>
            </td>
        </tr>
    ));

export default ClientsList;
