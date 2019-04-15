import React from 'react';

import { FILE_STORAGE_URL } from 'config';

import NoProfilePic from '_content/images/layout/blank-profile.png';

const ProfileImage = ({ profile: { profileImageS3Key } }) => {
    return (
        <div className="profile-pic-field size-lg-12">
            {profileImageS3Key ? (
                <img
                    alt="avatar"
                    src={`${FILE_STORAGE_URL}/${profileImageS3Key}`}
                />
            ) : (
                <img src={NoProfilePic} alt="generic profile" />
            )}
        </div>
    );
};

export default ProfileImage;
