import React from 'react';
import { Link } from 'react-router-dom';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';

const TextSettings = ({ loginText, isFetching, error }) => {
    return (
        <>
            <PageHeading title="Frontend Text Settings">
                <Link className="button yellow" to="/admin/text-settings/edit-settings">
                    <i className="far fa-pencil" />
                    Edit Settings
                </Link>
            </PageHeading>
            <BlockContainer isFetching={isFetching} error={error}>
                <BlockHeading title="Frontend Text Settings" />
                <FieldOutput title="Login page text" description={loginText} />
            </BlockContainer>
        </>
    );
};

export default TextSettings;
