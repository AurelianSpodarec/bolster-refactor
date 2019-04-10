import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const ProfileDetails = ({ error, isFetching, profile }) => {
    const { email, firstName, lastName, phoneNumber } = profile;
    return (
        <BlockContainer
            heading="Details"
            error={error}
            isFetching={isFetching}
            isEmpty={!email}
        >
            <p>{`first name: ${firstName}`}</p>
            <p>{`last name: ${lastName}`}</p>
            <p>{`email: ${email}`}</p>
            <p>{`phone number: ${phoneNumber}`}</p>
        </BlockContainer>
    );
};

export default ProfileDetails;
