import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import ModalHeading from 'components/shared/generic/modals/presentational/ModalHeading';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import useCreateCostingAndEstimatingPrelim from '../_hooks/useCreateCostingAndEstimatingPrelim';

const CreateCostingAndEstimatingPrelimModal = () => {
    const { form, handleChange, handleSubmit, isPosting, prelimsOptions } =
        useCreateCostingAndEstimatingPrelim();
    return (
        <ModalOuterContainer hideCloseButton>
            <ModalHeading title="Create prelim" />

            <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
                <Field name="Name" required>
                    <TextInputContainer
                        name="name"
                        value={form.name}
                        handleChange={handleChange}
                        placeholder="Type name"
                        required
                    />
                </Field>

                <Field name="Type" required>
                    <DropdownContainer
                        name="type"
                        options={Object.values(prelimsOptions)}
                        value={prelimsOptions[form.type]}
                        selectedOption={prelimsOptions[form.type]}
                        handleChange={handleChange}
                        required
                    />
                </Field>

                <Field name="Amount" required>
                    <TextInputContainer
                        name="value"
                        value={form.value}
                        handleChange={handleChange}
                        placeholder="Type amount"
                        type="number"
                        required
                    />
                </Field>

                <BlockButtonWrapper>
                    <ButtonWrapper alignment="right">
                        <ActionButton
                            text="Save"
                            icon={isPosting ? 'spinner' : 'save'}
                            iconSpin={isPosting}
                            size="medium"
                            disabled={isPosting}
                            type="submit"
                        />
                    </ButtonWrapper>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default CreateCostingAndEstimatingPrelimModal;
