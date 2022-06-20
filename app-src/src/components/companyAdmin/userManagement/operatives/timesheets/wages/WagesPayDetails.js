import React from 'react';

import useGetCompanyPayRates from './hooks/useGetCompanyPayRates';

import BlockContainer from '../../../../../shared/generic/block/containers/BlockContainer';
import BlockHeading from '../../../../../shared/generic/blockHeading/presentational/BlockHeading';
import Select from '../../../../../shared/generic/form/presentational/Select';
import Field from '../../../../../shared/generic/form/presentational/Field';

const WagesPayDetails = ({
    selectedUserIDs,
    getUserNameByID,
    selectedPayRate,
    setSelectedPayRate,
}) => {
    const { companyPayRateOptions } = useGetCompanyPayRates();

    return (
        <BlockContainer className="content-container size-lg-7">
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
