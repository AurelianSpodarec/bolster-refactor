import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import pdf from '_content/pdf/CompleteUserGuide-June2020.pdf';
const UserGuides = () => (
    <>
        <PageHeading leftChildren={true} title="User Guides">
            <BackButtonContainer />
        </PageHeading>
        <BlockContainer>
            <BlockHeading title="Bolster Video User Guides" />
            <p className="generic-text intro-text">
                Click <a href="https://vimeo.com/bolstersystems">here</a>, to visit our Vimeo and
                find all our video user guides.
            </p>
            <BlockHeading title="Bolster User Guide Document"></BlockHeading>
            <p className="generic-text intro-text">
                Alternatively, download and read our "Complete User Guide" document{' '}
                <a target="_blank" href={pdf}>
                    here
                </a>
                . This outlines the system functionality in easy to follow step-by-step processes.
            </p>
            <p className="generic-text intro-text">
                The password for this guide is <strong>BSUserGuidev1</strong>.
            </p>
        </BlockContainer>
    </>
);

export default UserGuides;
