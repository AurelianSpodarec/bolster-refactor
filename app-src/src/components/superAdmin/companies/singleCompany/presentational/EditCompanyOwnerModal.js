import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import Select from 'components/shared/generic/form/presentational/Select';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import LoadingIcon from 'components/shared/generic/misc/presentational/LoadingIcon';

const EditCompanyOwnerModal = ({
    handleChange,
    handleSubmit,
    hideModal,
    form,
    userOptions,
    isPosting,
}) => {
    return (
        <ModalOuterContainer>
            <Form onSubmit={handleSubmit}>
                <Field name="Select the new owner" required>
                    <Select
                        singleSelect
                        name="companyUserID"
                        options={userOptions}
                        value={form.companyUserID}
                        onChange={handleChange}
                        omitPlaceholder
                        required
                        optionListClasses='large-list'
                    />
                </Field>
                <BlockButtonWrapper additionalClasses="margin-top-lg">
                    <button type="submit" className="button green" disabled={isPosting}>
                        <i className="fa fa-plus" />
                        {isPosting ? <LoadingIcon /> : 'Submit'}
                    </button>
                    <button type="button" className="button red" onClick={hideModal}>
                        <i className="fa fa-times" />
                        Cancel
                    </button>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default EditCompanyOwnerModal;
