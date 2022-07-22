import React from 'react';

import useWages from './hooks/useWages';

import WagesUserList from './WagesUserList';
import WagesPayDetails from './WagesPayDetails';
import WagesRegularHours from './WagesRegularHours';
import Field from '../../../../../shared/generic/form/presentational/Field';
import ActionButton from '../../../../../shared/generic/button/presentational/ActionButton';
import BlockContainer from '../../../../../shared/generic/block/containers/BlockContainer';

const Wages = () => {
    const {
        getUserNameByID,
        selectedUserIDs,
        handleToggleUserID,
        isFetching,
        fetchError,
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
    } = useWages();

    return (
        <div className={`width-12 wages-body ${!isBolsterPlusActivated ? 'blur' : ''}`}>
            <WagesUserList
                selectedUserIDs={selectedUserIDs}
                handleToggleUserID={handleToggleUserID}
                isFetching={isFetching}
                fetchError={fetchError}
            />

            <BlockContainer
                isFetching={isFetching}
                error={fetchError}
                contentClass="flex-column box"
            >
                <WagesPayDetails
                    selectedUserIDs={selectedUserIDs}
                    selectedPayRate={selectedPayRate}
                    setSelectedPayRate={setSelectedPayRate}
                    companyPayRateOptions={companyPayRateOptions}
                    getUserNameByID={getUserNameByID}
                />

                <WagesRegularHours
                    form={form}
                    handleDayChange={handleDayChange}
                    handleChange={handleChange}
                    days={days}
                    timeDifference={timeDifference}
                />

                <Field classes="border-top padding-top flex flex-row justify-end">
                    <ActionButton
                        text="Save"
                        icon="save"
                        ambient="positive"
                        onClick={handleSave}
                        size="large"
                        disabled={isPosting || !selectedUserIDs.length}
                    />
                </Field>
            </BlockContainer>
        </div>
    );
};

export default Wages;
