import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import TemplatesTableContainer from '../containers/TemplatesTableContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import PinOptionsTableContainer from '../containers/PinOptionsTableContainer';

const Templates = () => {
    return (
        <>
            <PageHeading title="My Templates" withBackButton />
            <BlockContainer>
                <BlockHeading title="Templates" />
                <p className="size-lg-12 page-heading">
                    Below are the current templates your company has set up and access to. If you
                    would like to make any amendments to an existing template or create a bespoke
                    template please download our template creation documents{' '}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`/Template-guide-and-template-creation.zip`}
                        className="links"
                        download={true}
                    >
                        here.
                    </a>
                </p>
            </BlockContainer>
            <BlockContainer>
                <TemplatesTableContainer />
            </BlockContainer>
            <PinOptionsTableContainer />
        </>
    );
};

export default Templates;
