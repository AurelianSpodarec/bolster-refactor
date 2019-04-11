import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const ProfileDetails = ({ error, isFetching, profile, location }) => {
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
                <Link
                    className="button"
                    to={`${location.pathname}/edit-password`}
                >
                    Change Password
                </Link>
                <Link className="button" to={`${location.pathname}/edit`}>
                    Edit
                </Link>
            </BlockButtonWrapper>
        </BlockContainer>
    );
};

export default withRouter(ProfileDetails);
