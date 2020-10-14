import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import fetchFrontendTrustedBy from 'actions/superAdmin/frontendSite/trustedBySettings/async/fetchAllTrustedBy';
import { orderTrustedByArr } from 'helpers/generic';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Block from 'components/shared/generic/block/presentational/Block';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import TrustedBy from '../presentational/TrustedBy';

const TrustedByContainer = () => {
    const dispatch = useDispatch();
    const { error, isFetching, trustedBy } = useSelector(
        ({ superAdmin: { frontendTrustedBySettingsReducer } }) => frontendTrustedBySettingsReducer,
    );

    useEffect(() => {
        dispatch(fetchFrontendTrustedBy());
    }, []);

    return (
        <>
            <PageHeading title="Frontend Trusted By Settings" withBackButton>
                <Link className="button yellow" to="/admin/trusted-by-settings/edit-settings">
                    <i className="far fa-pencil" />
                    Edit Settings
                </Link>
            </PageHeading>
            <Block>
                <BlockContainer isFetching={isFetching} error={error}>
                    {trustedBy && <TrustedBy data={orderTrustedByArr(trustedBy)} />}
                </BlockContainer>
            </Block>
        </>
    );
};

export default TrustedByContainer;
