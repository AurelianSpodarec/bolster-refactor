import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import useCreateHierarchyAlert from '../hooks/useCreateHierarchyAlert';

const CreateHierarchyAlertModal = ({ hierarchy, hideModal }) => {
    const {
        fields: { name, description, deliveryMethod, date, recurrence },
        handleChange,
        handleSubmit,
    } = useCreateHierarchyAlert();

    return (
        <ModalOuterContainer>
            <BlockHeading title={`Create ${hierarchy} Alert`} />

            <Form className="generic-form" onSubmit={handleSubmit}>
                <div className="size-lg-12">
                    <Field name="Name" required>
                        <TextInputContainer
                            handleChange={handleChange}
                            name="name"
                            value={name}
                            required
                        />
                    </Field>
                    <Field name="Description">
                        <TextInputContainer
                            handleChange={handleChange}
                            name="description"
                            value={description}
                        />
                    </Field>
                </div>
                <BlockButtonWrapper>
                    <button className="button blue">
                        <i className="fa fa-plus" /> Create Alert
                    </button>
                    <button className="button" onClick={hideModal}>
                        Cancel
                    </button>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default CreateHierarchyAlertModal;
