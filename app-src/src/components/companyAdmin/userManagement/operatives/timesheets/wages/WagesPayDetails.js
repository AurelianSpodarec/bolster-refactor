import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import useGetCompanyPayRates from './hooks/useGetCompanyPayRates';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';

import BlockContainer from '../../../../../shared/generic/block/containers/BlockContainer';
import BlockHeading from '../../../../../shared/generic/blockHeading/presentational/BlockHeading';
import Select from '../../../../../shared/generic/form/presentational/Select';
import Field from '../../../../../shared/generic/form/presentational/Field';
import { isEmpty } from 'helpers/generic';

import { PAY_RATES_MODAL } from 'constants/shared/modalTypes';

const WagesPayDetails = ({
    selectedUserIDs,
    getUserNameByID,
    selectedPayRate,
    setSelectedPayRate,
}) => {
    const dispatch = useDispatch();
    const { companyPayRates, isFetching, error } = useGetCompanyPayRates();

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

    return (
        <BlockContainer
            className="content-container size-lg-7"
            isFetching={isFetching}
            error={error}
        >
            <BlockHeading
                title={
                    selectedUserIDs.length
                        ? selectedUserIDs.length === 1
                            ? getUserNameByID(selectedUserIDs[0])
                            : 'Multiple Users'
                        : 'All Users'
                }
            />

            <Field name="Pay Details" classes="no-padding">
                <Select
                    options={companyPayRateOptions}
                    value={selectedPayRate}
                    onChange={(_, value) => setSelectedPayRate(value)}
                    optionListClasses="large"
                />
            </Field>
        </BlockContainer>
    );
};

export default WagesPayDetails;
