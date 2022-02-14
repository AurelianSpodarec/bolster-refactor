import React from 'react';
import { Link } from 'react-router-dom';
import {
    COMPANY_USER_ROLE_IDS,
    COMPANY_USER_ROLE_STATUS_VALUES,
} from 'constants/companyAdmin/enums';

const Roles = ({
    user: { isDeleted, deletedByUserEmail, deletedByCompanyName, deletedByCompanyID },
    roles,
}) => {
    if (isDeleted)
        return (
            <td>
                Deleted&nbsp;
                {!!deletedByUserEmail && `by ${deletedByUserEmail} `}
                {!!deletedByCompanyName && (
                    <span>
                        (
                        <Link className="link" to={`/admin/companies/${deletedByCompanyID}`}>
                            {deletedByCompanyName}
                        </Link>
                        )
                    </span>
                )}
            </td>
        );

    const rolesToRender = roles.length ? (
        roles.map((role, i, arr) => {
            const isTheLastCompany = arr.length - 1 === i;
            return (
                <>
                    <span key={i}>
                        {COMPANY_USER_ROLE_IDS[role.type]} -{' '}
                        <span>
                            <Link className="link" to={`/admin/companies/${role.companyID}`}>
                                {role.companyName}
                            </Link>{' '}
                            ({COMPANY_USER_ROLE_STATUS_VALUES[role.status]})
                        </span>
                    </span>
                    {!isTheLastCompany && (
                        <>
                            <br />
                            <br />
                        </>
                    )}
                </>
            );
        })
    ) : (
        <span>No assigned roles</span>
    );

    return <td>{rolesToRender}</td>;
};

export default Roles;
