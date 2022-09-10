import React from 'react';

import SitesTableContainer from '../containers/SitesTableContainer';
import SitesFiltersContainer from '../containers/SitesFiltersContainer';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { ADD_SITE } from 'constants/shared/modalTypes';
import { useDispatch } from 'react-redux';

const AllSites = () => {
    const dispatch = useDispatch();

    const handleAddSite = () => {
        dispatch(showModal(ADD_SITE));
    };

    return (
        <>
            <PageHeading title="Sites">
                <ButtonWrapper alignment="right">
                    <ActionButton
                        onClick={handleAddSite}
                        icon="fa fa-plus"
                        text="Add new"
                        ambient="primary"
                        source="primary"
                        size="medium"
                    />
                </ButtonWrapper>
            </PageHeading>

            <BlockContainer contentClass="content-stroke">
                <SitesFiltersContainer />
            </BlockContainer>

            <SitesTableContainer />
        </>
    );
};

export default AllSites;
