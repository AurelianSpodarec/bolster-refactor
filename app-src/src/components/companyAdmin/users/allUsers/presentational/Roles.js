import React from 'react';
import { ROLE_TYPES } from 'constants/companyAdmin/enums';

const Roles = ({ roles }) => {
    const rolesToRender = roles.length ? (
        roles.map((role, i) => (
            <span key={i}>
                {ROLE_TYPES[role.type]}
                <span> ({role.companyName})</span>
            </span>
        ))
    ) : (
        <span>No assigned roles</span>
    );

    return <td>{rolesToRender}</td>;
};

export default Roles;
