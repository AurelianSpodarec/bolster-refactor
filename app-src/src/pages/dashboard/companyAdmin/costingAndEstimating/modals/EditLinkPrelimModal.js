import React from 'react';

import useEditCostingAndEstimatingPrelim from '../_hooks/useEditCostingAndEstimatingPrelim';

import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';

const EditLinkPrelimModal = prelim => {
    const { form, handleChange, handleSubmit, isPosting, prelimsOptions } =
        useEditCostingAndEstimatingPrelim(prelim);

    return (
        <FlexModalOuter title={`Edit ${form.name}`}>
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
                        disabled={isPosting}
                        type="submit"
                    />
                </ButtonWrapper>
            </Form>
        </FlexModalOuter>
    );
};

export default EditLinkPrelimModal;
