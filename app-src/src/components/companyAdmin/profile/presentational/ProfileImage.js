import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

import NoProfilePic from '_content/images/layout/blank-profile.png';

const ProfileImage = ({
    error,
    isFetching,
    profile: { email, profileImageS3Key }
}) => {
    return (
        <BlockContainer error={error} isFetching={isFetching} isEmpty={!email}>
            {profileImageS3Key ? (
                <img alt="profile" src={profileImageS3Key} />
            ) : (
                <img src={NoProfilePic} alt="generic profile" />
            )}
        </BlockContainer>
    );
};

export default ProfileImage;
