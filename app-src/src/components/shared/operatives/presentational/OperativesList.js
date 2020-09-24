import React from 'react';
import { Link } from 'react-router-dom';

import TooltipContainer from 'components/shared/generic/tooltip/containers/TooltipContainer';

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
                <td>
                    {canEditUser && (
                        <>
                            <Link
                                to={`/company/drawings/${documentID}/edit-operative/${id}`}
                                className="button yellow icon-only"
                            >
                                <i className="far fa-pencil fa-fw" />
                            </Link>
                            <button
                                onClick={() => handleDeleteOperativeModal(operative)}
                                to="#"
                                className="button red icon-only"
                            >
                                <i className="far fa-trash-alt fa-fw" />
                            </button>
                        </>
                    )}
                </td>
            </tr>
        );
    });

export default OperativesList;
