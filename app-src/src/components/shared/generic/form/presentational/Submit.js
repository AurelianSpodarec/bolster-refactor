import React from 'react';

import ActionButton from '../../button/presentational/ActionButton';

const Submit = ({ icon = 'check', text = 'Submit', filesUploading }) => {
    return (
        <ActionButton
            type="submit"
            icon={icon}
            disabled={filesUploading}
            text={filesUploading ? 'Please wait...' : text}
        />
    );
};

export default Submit;
