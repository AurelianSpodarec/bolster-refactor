import React from 'react';
import { Link } from 'react-router-dom';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';

const TextEditor = () => {
    return (
        <>
            <PageHeading title="Frontend Text Settings" withBackButton>
                <Link className="button yellow" to="/admin/text-settings/edit-settings">
                    <i className="far fa-pencil" />
                    Edit Settings
                </Link>
            </PageHeading>
            <BlockContainer>
                <BlockHeading title="Frontend Text Settings" />
                <FieldOutput title="Login page copy" description="Text goes in here" />
            </BlockContainer>
        </>
    );
};

export default TextEditor;
