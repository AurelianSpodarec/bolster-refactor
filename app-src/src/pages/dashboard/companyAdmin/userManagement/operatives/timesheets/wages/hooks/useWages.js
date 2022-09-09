import { useEffect, useMemo, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { usePrevious } from 'helpers/hooks';
import useGetCompanyPayRates from './useGetCompanyPayRates';
import useBolsterPlus from 'pages/dashboard/companyAdmin/subscription/addOns/hooks/useBolsterPlus';

import {
    selectCompanyUsers,
    selectCompanyUsersFetchError,
    selectCompanyUsersIsFetching,
} from 'selectors/companyAdmin/companyUsers';
import {
    selectPayRatesIsPosting,
    selectPayRatesPostSuccess,
} from 'selectors/companyAdmin/payRates';
import { selectHierarchySelectedTab } from 'selectors/shared/tabs';

import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import postAssignPayRates from 'actions/companyAdmin/payRates/postAssignPayRates';
import selectTab from 'actions/shared/generic/tabs/sync/selectTab';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

import { isEmpty } from 'helpers/generic';

import {
    BOLSTER_PLUS_UPGRADE_MODAL,
    PAY_RATES_MODAL,
    SUCCESS_MODAL,
} from 'constants/shared/modalTypes';
import { TIMESHEETS_TABS } from 'constants/shared/tabNames';
import useWagesRegularHours from './useWagesRegularHours';
import { selectSubscriptionsPostSuccess } from 'selectors/companyAdmin/subscriptions';
import fetchAllSubscriptions from 'actions/companyAdmin/subscriptions/async/fetchAllSubscriptions';

const useWages = () => {
    const dispatch = useDispatch();

    const [selectedUserIDs, setSelectedUserIDs] = useState([]);
    const [selectedPayRate, setSelectedPayRate] = useState(null);

    const { companyPayRates, isFetching: isFetchingPayRates, error } = useGetCompanyPayRates();

    const { form, handleDayChange, handleChange, days, timeDifference } =
        useWagesRegularHours(selectedUserIDs);

    const selectedTab = useSelector(selectHierarchySelectedTab);

    const companyUsers = useSelector(selectCompanyUsers) || [];
    const isFetching = useSelector(selectCompanyUsersIsFetching);
    const fetchError = useSelector(selectCompanyUsersFetchError);

    const isPosting = useSelector(selectPayRatesIsPosting);
    const postSuccess = useSelector(selectPayRatesPostSuccess);
    const prevPostSuccess = usePrevious(postSuccess);
    const subscriptionsPostSuccess = useSelector(selectSubscriptionsPostSuccess);
    const prevData = usePrevious({
        subscriptionsPostSuccess,
    });

    const { isBolsterPlusActivated } = useBolsterPlus();

    useEffect(() => {
        dispatch(fetchCompanyUsers);
    }, []);

    useEffect(() => {
        if (postSuccess && !prevPostSuccess) {
            batch(() => {
                dispatch(fetchCompanyUsers());
                dispatch(
                    showModal(SUCCESS_MODAL, {
                        title: 'Success',
                        message: 'Pay rates successfully assigned.',
                    }),
                );
            });

            setSelectedUserIDs([]);
            setSelectedPayRate(null);
        }
    }, [postSuccess, prevPostSuccess]);

    useEffect(() => {
        if (selectedTab === TIMESHEETS_TABS.WAGES && !isBolsterPlusActivated) {
            dispatch(
                showModal(BOLSTER_PLUS_UPGRADE_MODAL, {
                    handleClose: () => {
                        dispatch(
                            showModal(BOLSTER_PLUS_UPGRADE_MODAL, {
                                handleSwitchTab: () =>
                                    dispatch(selectTab(TIMESHEETS_TABS.GENERAL_OVERVIEW)),
                                handleClose: () => {},
                            }),
                        );
                    },
                    handleSwitchTab: () => dispatch(selectTab(TIMESHEETS_TABS.GENERAL_OVERVIEW)),
                }),
            );
        }
    }, [dispatch, isBolsterPlusActivated, selectedTab]);

    useEffect(() => {
        if (subscriptionsPostSuccess && !prevData.subscriptionsPostSuccess) {
            dispatch(fetchCompanyUsers);
            dispatch(fetchAllSubscriptions());
        }
    }, [subscriptionsPostSuccess, prevData.subscriptionsPostSuccess]); // Re-fetch results data on buying subscriptions post success

    const companyPayRateOptions = useMemo(() => {
        if (isEmpty(companyPayRates)) return [];

        const options = companyPayRates?.map(payRate => ({
            value: payRate.id,
            label: payRate.name,
        }));

        return [
            ...options,
            { value: 0, label: 'Create New', onClick: () => dispatch(showModal(PAY_RATES_MODAL)) },
        ];
    }, [companyPayRates]);

    function handleToggleUserID(id) {
        if (selectedUserIDs.includes(id)) {
            setSelectedUserIDs(sids => sids.filter(sid => sid !== id));
            setSelectedPayRate(null);
        } else {
            setSelectedUserIDs(sids => [...sids, id]);
        }
    }

    useEffect(() => {
        if (selectedUserIDs.length === 1) {
            setSelectedPayRate(companyUsers[selectedUserIDs[0]].companyPayRateID);
        } else {
            setSelectedPayRate(null);
        }
    }, [selectedUserIDs]);

    function getUserNameByID(id) {
        const thisUser = companyUsers[id];
        if (!thisUser) return '';
        return `${thisUser.userFirstName} ${thisUser.userLastName}`;
    }

    const handleSave = () => {
        const postBody = {
            ...form,
            payRateID: selectedPayRate,
            companyUserIDs: selectedUserIDs,
        };

        dispatch(postAssignPayRates(postBody));
    };

    return {
        getUserNameByID,
        selectedUserIDs,
        handleToggleUserID,
        isFetching: isFetching || isFetchingPayRates,
        fetchError: fetchError || error,
        selectedPayRate,
        setSelectedPayRate,
        handleSave,
        isPosting,
        companyPayRateOptions,
        isBolsterPlusActivated,
        form,
        handleDayChange,
        handleChange,
        days,
        timeDifference,
    };
};

export default useWages;
