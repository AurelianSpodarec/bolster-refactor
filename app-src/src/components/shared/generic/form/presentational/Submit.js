import React from 'react';

const Submit = ({ withPlus, text = 'Submit', filesUploading }) => {
    return (
        <button
            className="button green"
            type="submit"
            disabled={filesUploading}
        >
            {withPlus && <i className="fa fa-plus" />}
            {filesUploading ? 'Please wait...' : text}
        </button>
    );
};

export default Submit;
