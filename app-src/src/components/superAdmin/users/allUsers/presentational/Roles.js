import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_USER_ROLE_IDS } from 'constants/companyAdmin/enums';

const Roles = ({ roles }) => {
    const rolesToRender = roles.length ? (
        roles.map((role, i) => (
            <span key={i}>
                {COMPANY_USER_ROLE_IDS[role.type]}
                <span>
                    (
                    <Link to={`/admin/companies/${role.companyID}`}>
                        {role.companyName})
                    </Link>
                </span>
            </span>
        ))
    ) : (
        <span>No assigned roles</span>
    );

    return <td>{rolesToRender}</td>;
};

export default Roles;
