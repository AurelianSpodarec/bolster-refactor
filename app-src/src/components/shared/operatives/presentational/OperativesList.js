import React from 'react';

import TooltipContainer from 'components/shared/generic/tooltip/containers/TooltipContainer';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import LinkButton from 'components/shared/generic/button/presentational/LinkButton';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import { ReactComponent as TrashIcon } from '../../../../_content/images/icons/trash.svg';

const OperativesList = ({ operatives, documentID, handleDeleteOperativeModal }) =>
    operatives.map(operative => {
        const {
            id,
            userFirstName: firstName,
            userLastName: lastName,
            email,
            userOperativeCode: operativeCode,
            canEditUser,
            companyName,
            notUpsyncedRecently = true,
        } = operative;

        const stringOperativeCode = operativeCode + '';

        return (
            <tr key={id} className={`${notUpsyncedRecently ? 'red-row' : ''}`}>
                <td>
                    {notUpsyncedRecently && (
                        <TooltipContainer
                            text={
                                operative.notUpSyncedInXDays
                                    ? `This operative has not upsynced in ${operative.notUpSyncedInXDays}  days`
                                    : 'This operative has never upsynced'
                            }
                            containerSide="left"
                        >
                            <i className="far fa-exclamation-triangle red-icon" />
                        </TooltipContainer>
                    )}
                    {`${firstName} ${lastName} - ${stringOperativeCode.padStart(
                        2,
                        '0',
                    )} (${companyName})`}
                    <br />
                    {email}
                </td>
                <td className="pull-right">
                    {canEditUser && (
                        <FlexWrapper>
                            <ButtonWrapper>
                                <LinkButton
                                    href={`/company/drawings/${documentID}/edit-operative/${id}`}
                                    icon="far fa-pencil fa-fw"
                                    extraClasses="icon-only typography-default-colour"
                                />
                            </ButtonWrapper>
                            <ButtonWrapper>
                                <ActionButton
                                    href="#"
                                    onClick={() => handleDeleteOperativeModal(operative)}
                                    svgIconComponent={TrashIcon}
                                    source="secondary"
                                    ambient="positive"
                                    extraClasses="icon-only typography-default-colour"
                                />
                            </ButtonWrapper>
                        </FlexWrapper>
                    )}
                </td>
            </tr>
        );
    });

export default OperativesList;
