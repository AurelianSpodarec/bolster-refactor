import React from 'react';

const Field = ({ children, name }) => (
    <div className="field size-lg-12">
        {name && name.length && <label>{name}</label>}

        {children}
    </div>
);

export default Field;
