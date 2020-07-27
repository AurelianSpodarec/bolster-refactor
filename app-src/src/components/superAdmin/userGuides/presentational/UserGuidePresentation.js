import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Block from 'components/shared/generic/block/presentational/Block';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const UserGuidesPresentational = ({ showUploadUserGuideModal }) => (
    <>
        <PageHeading title="User Guides" withBackButton />
        <Block>
            <BlockHeading title="Current Guide"></BlockHeading>
            <p className="generic-text intro-text">
                Set the user guide for company admins, download the current user guide{' '}
                <a className="red" href="#">
                    here
                </a>
                .
            </p>
            <button className="button green" onClick={() => showUploadUserGuideModal()}>
                <i className="fa fa-plus"></i> Upload new user guide
            </button>
        </Block>
    </>
);

export default UserGuidesPresentational;
