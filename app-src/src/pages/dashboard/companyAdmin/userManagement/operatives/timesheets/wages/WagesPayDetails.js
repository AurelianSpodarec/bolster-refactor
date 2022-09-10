import React from 'react';

import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';
import Select from 'components_DEPRECATED/shared/generic/form/presentational/Select';
import Field from 'components_DEPRECATED/shared/generic/form/presentational/Field';
import Form from 'components_DEPRECATED/shared/generic/form/containers/Form';

const WagesPayDetails = ({
    selectedUserIDs,
    getUserNameByID,
    selectedPayRate,
    setSelectedPayRate,
    companyPayRateOptions,
}) => {
    return (
        <>
            <BlockHeading
                title={
                    selectedUserIDs.length
                        ? selectedUserIDs.length === 1
                            ? getUserNameByID(selectedUserIDs[0])
                            : 'Multiple Users'
                        : 'All Users'
                }
            />

            <Form>
                <Field name="Pay Details" classes="no-padding">
                    <Select
                        options={companyPayRateOptions}
                        value={selectedPayRate}
                        onChange={(_, value) => setSelectedPayRate(value)}
                        optionListClasses="large"
                    />
                </Field>
            </Form>
        </>
    );
};

export default WagesPayDetails;
