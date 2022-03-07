import React from 'react';
import BlockButtonWrapper from '../../blockButtonWrappers/presentational/BlockButtonWrapper';
import BlockHeading from '../../blockHeading/presentational/BlockHeading';
import CheckboxContainer from '../../form/containers/CheckboxContainer';
import Form from '../../form/containers/Form';
import Field from '../../form/presentational/Field';

import ModalOuterContainer from '../containers/ModalOuterContainer';

const EditJobRefDropdownModal = ({
    company,
    isJobReferenceDropdownEnabled,
    handleChange,
    handleSubmit,
    closeModal,
}) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title={`Edit ${company.name}'s job reference dropdown access`} />

            <Form className="generic-form" onSubmit={handleSubmit}>
                <Field name="Should have access to job reference dropdowns?">
                    <CheckboxContainer
                        checked={isJobReferenceDropdownEnabled}
                        handleChange={() => handleChange(!isJobReferenceDropdownEnabled)}
                        name="isJobReferenceDropdownEnabled"
                    />
                </Field>

                <BlockButtonWrapper>
                    <button className="button green" type="submit">
                        <i className="fa fa-save fa-fw" />
                        Save
                    </button>
                    <button className="button " onClick={closeModal}>
                        <i className="fa fa-times" />
                        Cancel
                    </button>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default EditJobRefDropdownModal;
