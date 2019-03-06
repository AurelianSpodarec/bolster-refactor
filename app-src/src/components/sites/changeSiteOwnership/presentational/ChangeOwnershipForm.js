import React from 'react';
import { Link } from 'react-router-dom';

const ChangeOwnershipForm = () => (
    <div className="content-container size-lg-12">
        <div className="content-area size-lg-12">
            <h3 className="heading heading-3">Change ownership form</h3>
            <Link className="button" to="/sites/1">
                Cancel
            </Link>
            <Link className="button" to="/sites/1">
                Save
            </Link>
        </div>
    </div>
);

export default ChangeOwnershipForm;
