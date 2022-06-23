import React from 'react';

import BlockContainer from '../../../../../shared/generic/block/containers/BlockContainer';
import BlockHeading from '../../../../../shared/generic/blockHeading/presentational/BlockHeading';
import Select from '../../../../../shared/generic/form/presentational/Select';
import Field from '../../../../../shared/generic/form/presentational/Field';
import ActionButton from '../../../../../shared/generic/button/presentational/ActionButton';
import Form from '../../../../../shared/generic/form/containers/Form';

const WagesPayDetails = ({
    selectedUserIDs,
    getUserNameByID,
    selectedPayRate,
    setSelectedPayRate,
    isFetching,
    error,
    companyPayRateOptions,
    handleSave,
    isPosting,
}) => {
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

            <Form>
                <Field name="Pay Details" classes="no-padding">
                    <Select
                        options={companyPayRateOptions}
                        value={selectedPayRate}
                        onChange={(_, value) => setSelectedPayRate(value)}
                        optionListClasses="large"
                    />
                </Field>

                <Field classes="border-top padding-top flex flex-row justify-end">
                    <ActionButton
                        text="Save"
                        icon="save"
                        ambient="positive"
                        onClick={handleSave}
                        size="large"
                        disabled={isPosting || !selectedUserIDs.length || !selectedPayRate}
                    />
                </Field>
            </Form>
        </BlockContainer>
    );
};

export default WagesPayDetails;
