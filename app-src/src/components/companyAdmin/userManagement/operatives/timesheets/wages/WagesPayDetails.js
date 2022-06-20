import React from 'react';

import useGetCompanyPayRates from './hooks/useGetCompanyPayRates';

import BlockContainer from '../../../../../shared/generic/block/containers/BlockContainer';
import BlockHeading from '../../../../../shared/generic/blockHeading/presentational/BlockHeading';
import FunctionalMultiSelect from '../../../../../shared/generic/form/presentational/FunctionalMultiSelect';

const WagesPayDetails = ({ selectedUserIDs, getUserNameByID }) => {
    const { companyPayRates } = useGetCompanyPayRates();

    const options = [
        { value: 1, label: 'opt 1' },
        { value: 2, label: 'opt 2' },
    ];
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

            <h4 className="heading heading-4">Pay Details</h4>

            <FunctionalMultiSelect options={options} />
        </BlockContainer>
    );
};

export default WagesPayDetails;
