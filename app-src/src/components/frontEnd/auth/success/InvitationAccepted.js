import FrontEndFormHeading from 'components/frontEnd/shared/forms/presentational/FrontEndFormHeading';
import Field from 'components/shared/generic/form/presentational/Field';
import React from 'react';

const InvitationAccepted = () => {
    return (
        <div
            className="auth-form-wrapper"
            style={{ textAlign: 'center', display: 'flex', width: '100%', height: '80vh' }}
        >
            <FrontEndFormHeading title="Invitation accepted" classes="smaller" />
            <Field classes="auth-form-field">
                <p>Your invitation has been accepted successfully</p>
            </Field>
        </div>
    );
};
export default InvitationAccepted;
