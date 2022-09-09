import React from 'react';

import useEditPrelim from '../hooks/useEditPrelim';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';

const EditPrelimModal = ({ set }) => {
    const { form, handleChange, isPosting, handleSubmit, prelimsOptions } = useEditPrelim(set);

    return (
        <FlexModalOuter title={`Edit ${set.name}`}>
            <Form onSubmit={handleSubmit} className="generic-form flex-content-wrapper size-lg-12">
                <div className="flex-content">
                    <div className="form-fields-container">
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
                                placeholder="Choose prelim type"
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
                    </div>
                </div>

                <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                    <ActionButton
                        text="Save"
                        icon={isPosting ? 'spinner' : 'save'}
                        iconSpin={isPosting}
                        ambient="positive"
                        disabled={isPosting}
                        type="submit"
                    />
                </ButtonWrapper>
            </Form>
        </FlexModalOuter>
    );
};

export default EditPrelimModal;
