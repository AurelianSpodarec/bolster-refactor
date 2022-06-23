import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePrevious } from '../../../../../../../helpers/hooks';
import useGetCompanyPayRates from './useGetCompanyPayRates';
import useBolsterPlus from 'components/companyAdmin/subscription/addOns/hooks/useBolsterPlus';

import {
    selectCompanyUsers,
    selectCompanyUsersFetchError,
    selectCompanyUsersIsFetching,
} from 'selectors/companyAdmin/companyUsers';
import {
    selectPayRatesIsPosting,
    selectPayRatesPostSuccess,
} from '../../../../../../../selectors/companyAdmin/payRates';
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

const useWages = () => {
    const dispatch = useDispatch();

    const { companyPayRates, isFetching: isFetchingPayRates, error } = useGetCompanyPayRates();

    const [userFilter, setUserFilter] = useState('');
    const [selectedUserIDs, setSelectedUserIDs] = useState([]);
    const [selectedPayRate, setSelectedPayRate] = useState(null);

    const selectedTab = useSelector(selectHierarchySelectedTab);

    const companyUsers = useSelector(selectCompanyUsers) || [];
    const isFetching = useSelector(selectCompanyUsersIsFetching);
    const fetchError = useSelector(selectCompanyUsersFetchError);

    const isPosting = useSelector(selectPayRatesIsPosting);
    const postSuccess = useSelector(selectPayRatesPostSuccess);
    const prevPostSuccess = usePrevious(postSuccess);

    const { isBolsterPlusActivated } = useBolsterPlus();

    useEffect(() => {
        if (postSuccess && !prevPostSuccess) {
            dispatch(
                showModal(SUCCESS_MODAL, {
                    title: 'Success',
                    message: 'Pay rates successfully assigned.',
                }),
            );
            setSelectedUserIDs([]);
            setSelectedPayRate(null);
        }
    }, [postSuccess, prevPostSuccess]);

    useEffect(() => {
        if (selectedTab === TIMESHEETS_TABS.WAGES && !isBolsterPlusActivated) {
            dispatch(
                showModal(BOLSTER_PLUS_UPGRADE_MODAL, {
                    handleClose: () => dispatch(selectTab(TIMESHEETS_TABS.GENERAL_OVERVIEW)),
                }),
            );
        }
    }, [dispatch, isBolsterPlusActivated, selectedTab]);

    const filteredUsers = useMemo(() => {
        const users = Object.values(companyUsers);
        return users.filter(({ userFirstName, userLastName }) =>
            `${userFirstName} ${userLastName}`
                .toLowerCase()
                .includes(userFilter.trim().toLowerCase()),
        );
    }, [companyUsers, userFilter]);

    function handleToggleUserID(id) {
        if (selectedUserIDs.includes(id)) {
            setSelectedUserIDs(sids => sids.filter(sid => sid !== id));
        } else setSelectedUserIDs(sids => [...sids, id]);
    }

    function getUserNameByID(id) {
        const thisUser = companyUsers[id];
        if (!thisUser) return '';
        return `${thisUser.userFirstName} ${thisUser.userLastName}`;
    }

    useEffect(() => {
        dispatch(fetchCompanyUsers);
    }, []);

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

    const handleSave = () => {
        const postBody = { payRateID: selectedPayRate, companyUserIDs: selectedUserIDs };

        dispatch(postAssignPayRates(postBody));
    };

    return {
        getUserNameByID,
        selectedUserIDs,
        handleToggleUserID,
        userFilter,
        setUserFilter,
        users: filteredUsers,
        isFetching: isFetching || isFetchingPayRates,
        fetchError: fetchError || error,
        selectedPayRate,
        setSelectedPayRate,
        handleSave,
        isPosting,
        companyPayRateOptions,
        isBolsterPlusActivated,
    };
};

export default useWages;
