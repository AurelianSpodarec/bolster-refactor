import React from 'react';
import { Link } from 'react-router-dom';

const OperativesTable = () => (
    <div className="size-lg-12">
        <h2 className="heading heading-3 size-lg-12">Operatives with access</h2>
        <Link to="3/attach-operative" className="button">
            <i className="fal fa-plus" /> Invite operative
        </Link>
    </div>
);

export default OperativesTable;
