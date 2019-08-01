import React from 'react';
import { Link } from 'react-router-dom';

const OperativesList = ({
    operatives,
    documentID,
    handleDeleteOperativeModal
}) =>
    operatives.map(operative => {
        const {
            id,
            userFirstName: firstName,
            userLastName: lastName,
            email,
            userOperativeCode: operativeCode,
            canEditUser,
            companyName
        } = operative;

        const stringOperativeCode = operativeCode + '';

        return (
            <tr key={id}>
                <td>
                    {`${firstName} ${lastName} - ${stringOperativeCode.padStart(
                        2,
                        '0'
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
                                onClick={() =>
                                    handleDeleteOperativeModal(operative)
                                }
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
