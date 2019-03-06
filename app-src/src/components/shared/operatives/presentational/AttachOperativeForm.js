import React from 'react';
import { withRouter } from 'react-router-dom';

const AttachOperativeForm = ({ history }) => (
    <div className="content-container size-lg-12">
        <div className="content-area size-lg-12">
            <h3 className="heading heading-3">Attach operative form</h3>
            <a
                className="button"
                href="#/"
                onClick={e => {
                    e.preventDefault();
                    history.goBack();
                }}
            >
                Cancel
            </a>
            <a
                className="button"
                href="#/"
                onClick={e => {
                    e.preventDefault();
                    history.goBack();
                }}
            >
                Save
            </a>
        </div>
    </div>
);

export default withRouter(AttachOperativeForm);
