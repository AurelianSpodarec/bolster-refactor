import React from 'react';

const AppVersionMessage = ({ version, isFetching, error }) => {
    if (error) return <span>Failed to retrieve latest app version</span>;
    if (isFetching) return <span>Retrieving latest app version...</span>;

    return <span>{`Latest app version: ${version}`}</span>;
};

export default AppVersionMessage;
