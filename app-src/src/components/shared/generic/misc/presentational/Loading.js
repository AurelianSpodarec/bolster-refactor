import React from 'react';
import LoadingIcon from './LoadingIcon';

const Loading = ({ message = 'Loading', withIcon = true }) => (
    <div className="loading-text size-lg-12">
        {message && <p>{message}</p>}
        {withIcon && <LoadingIcon />}
    </div>
);

export default Loading;
