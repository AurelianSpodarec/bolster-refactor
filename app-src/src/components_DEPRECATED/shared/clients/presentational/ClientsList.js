import React from 'react';

import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';
import LinkButton from 'components_DEPRECATED/shared/generic/button/presentational/LinkButton';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';
import FlexWrapper from 'components_DEPRECATED/shared/generic/flexWrapper/FlexWrapper';
import { ReactComponent as TrashIcon } from 'assets/images/icons/trash.svg';

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
                            extraClasses="icon-only typography-default-colour"
                        />
                    </ButtonWrapper>
                    <ButtonWrapper>
                        <ActionButton
                            href="#"
                            onClick={() => handleDeleteClientModal(client.id)}
                            svgIconComponent={TrashIcon}
                            source="secondary"
                            ambient="positive"
                            extraClasses="icon-only typography-default-colour"
                        />
                    </ButtonWrapper>
                </FlexWrapper>
            </td>
        </tr>
    ));

export default ClientsList;
