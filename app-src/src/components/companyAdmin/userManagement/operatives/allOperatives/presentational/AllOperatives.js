import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { USERS_OPERATIVES_TABS } from 'constants/shared/tabNames';

import setTabs from 'actions/shared/generic/tabs/sync/setTabs';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import fetchInactiveCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchInactiveCompanyUsers';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import TabsContainer from 'components/shared/generic/tabs/containers/TabsContainer';
import OperativesRoutes from './OperativesRoutes';

const AllOperatives = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTabs(Object.values(USERS_OPERATIVES_TABS), USERS_OPERATIVES_TABS.ACTIVE));
        dispatch(fetchCompanyUsers());
        dispatch(fetchInactiveCompanyUsers());
    }, [dispatch]);

    return (
        <>
            <PageHeading title="All Operatives" withBackButton>
                <TabsContainer />
            </PageHeading>
            <OperativesRoutes />
        </>
    );
};

export default AllOperatives;
