import React from 'react';
import { Link } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

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
            <BlockButtonWrapper>
                <Link className="button" to="profile/edit">
                    Edit
                </Link>
            </BlockButtonWrapper>
        </BlockContainer>
    );
};

export default ProfileDetails;
