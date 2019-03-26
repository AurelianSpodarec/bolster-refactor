import React from 'react';
import { ROLE_TYPES } from 'constants/enums';

const Roles = ({ roles }) => {
    const rolesToRender = roles.length ? (
        roles.map((role, i) => (
            <p key={i}>
                {ROLE_TYPES[role.type]}
                <span> ({role.companyName})</span>
            </p>
        ))
    ) : (
        <p>No assigned roles</p>
    );

    return <td>{rolesToRender}</td>;
};

export default Roles;
