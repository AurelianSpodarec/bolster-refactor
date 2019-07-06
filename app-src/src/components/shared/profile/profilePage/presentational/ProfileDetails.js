import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import ProfileImageContainer from '../containers/ProfileImageContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const ProfileDetails = ({ error, isFetching, profile, location, onMobile }) => {
    const { email, firstName, lastName, phoneNumber } = profile;
    return (
        <BlockContainer error={error} isFetching={isFetching} isEmpty={!email}>
            <BlockHeading title="Your Details" />
            {onMobile ? (
                <>
                    <FieldOutput
                        fieldClass="no-h-padding"
                        title="First Name"
                        description={firstName}
                    />
                    <FieldOutput
                        fieldClass="no-h-padding"
                        title="Last Name"
                        description={lastName}
                    />

                    <FieldOutput
                        fieldClass="no-h-padding"
                        title="Email"
                        description={email}
                    />
                    <FieldOutput
                        fieldClass="no-h-padding"
                        title="Phone number"
                        description={phoneNumber}
                    />
                    <FieldOutput
                        fieldClass="no-h-padding"
                        title="Profile Picture"
                    >
                        <ProfileImageContainer />
                    </FieldOutput>
                </>
            ) : (
                <>
                    {' '}
                    <div className="size-lg-4 size-md-12">
                        <FieldOutput
                            fieldClass="no-h-padding"
                            title="First Name"
                            description={firstName}
                        />
                        <FieldOutput
                            fieldClass="no-h-padding"
                            title="Last Name"
                            description={lastName}
                        />
                        <FieldOutput
                            fieldClass="no-h-padding"
                            title="Profile Picture"
                        >
                            <ProfileImageContainer />
                        </FieldOutput>
                    </div>
                    <div className="size-lg-4 size-md-12">
                        <FieldOutput
                            fieldClass="no-h-padding"
                            title="Email"
                            description={email}
                        />
                        <FieldOutput
                            fieldClass="no-h-padding"
                            title="Phone number"
                            description={phoneNumber}
                        />
                    </div>
                </>
            )}

            <BlockButtonWrapper>
                <Link
                    className="button yellow"
                    to={`${location.pathname}/edit`}
                >
                    <i className="far fa-pencil" /> Edit
                </Link>
                <Link
                    className="button green"
                    to={`${location.pathname}/change-password`}
                >
                    <i className="far fa-lock-alt fa-fw" />
                    Change Password
                </Link>
            </BlockButtonWrapper>
        </BlockContainer>
    );
};

export default withRouter(ProfileDetails);
