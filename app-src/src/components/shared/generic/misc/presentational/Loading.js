import React from 'react';
import LoadingIcon from './LoadingIcon';

const Loading = ({ message = 'Loading' }) => (
    <div className="loading-text size-lg-12">
        <p>{message}</p>
        <LoadingIcon />
    </div>
);

export default Loading;
