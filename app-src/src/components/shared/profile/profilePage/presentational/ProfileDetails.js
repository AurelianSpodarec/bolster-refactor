import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import ProfileImageContainer from '../containers/ProfileImageContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const ProfileDetails = ({
    error,
    isFetching,
    profile,
    location,
    onMobile,
    handleDisableTwoFactor,
}) => {
    const {
        email,
        firstName,
        lastName,
        phoneNumber,
        isTwoFactorAuthEnabled,
        twoFactorPhoneNumber,
    } = profile;
    const pathName = location.pathname.endsWith('/')
        ? location.pathname.slice(0, -1)
        : location.pathname;
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

                    <FieldOutput fieldClass="no-h-padding" title="Email" description={email} />
                    <FieldOutput
                        fieldClass="no-h-padding"
                        title="Phone number"
                        description={phoneNumber}
                    />
                    <FieldOutput fieldClass="no-h-padding" title="Profile Picture">
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
                        <FieldOutput fieldClass="no-h-padding" title="Profile Picture">
                            <ProfileImageContainer />
                        </FieldOutput>
                    </div>
                    <div className="size-lg-4 size-md-12">
                        <FieldOutput fieldClass="no-h-padding" title="Email" description={email} />
                        <FieldOutput
                            fieldClass="no-h-padding"
                            title="Phone number"
                            description={phoneNumber}
                        />
                    </div>
                </>
            )}

            <BlockHeading title="Two Factor Authentication" />
            <FieldOutput
                fieldClass="no-h-padding"
                title="Two Factor Authentication enabled?"
                description={isTwoFactorAuthEnabled ? 'Yes' : 'No'}
            />

            {!!isTwoFactorAuthEnabled && (
                <FieldOutput
                    fieldClass="no-h-padding"
                    title="Phone number for Two Factor Auth"
                    description={twoFactorPhoneNumber || 'Not set'}
                />
            )}

            <BlockButtonWrapper>
                <Link className="button yellow" to={`${pathName}/edit`}>
                    <i className="far fa-pencil" /> Edit
                </Link>
                <Link className="button green" to={`${pathName}/change-password`}>
                    <i className="far fa-lock-alt fa-fw" />
                    Change Password
                </Link>
                <Link className="button green" to={`${pathName}/twofactor/setup`}>
                    <i className="far fa-lock" />
                    {isTwoFactorAuthEnabled
                        ? 'Change two factor authentication number'
                        : 'Set up two factor authentication'}
                </Link>
                {!!isTwoFactorAuthEnabled && (
                    <ButtonContainer className="button red" handleClick={handleDisableTwoFactor}>
                        <i className="far fa-lock" />
                        Disable Two Factor Auth
                    </ButtonContainer>
                )}
            </BlockButtonWrapper>
        </BlockContainer>
    );
};

export default withRouter(ProfileDetails);
