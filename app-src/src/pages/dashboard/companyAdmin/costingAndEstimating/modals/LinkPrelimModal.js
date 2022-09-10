import React from 'react';

import useLinkPrelim from '../_hooks/useLinkPrelim';

import Form from 'components_DEPRECATED/shared/generic/form/containers/Form';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';
import Field from 'components_DEPRECATED/shared/generic/form/presentational/Field';
import DropdownContainer from 'components_DEPRECATED/shared/generic/form/containers/DropdownContainer';
import FlexModalOuter from 'components_DEPRECATED/shared/generic/modals/presentational/FlexModalOuter';

const LinkPrelimModal = () => {
    const { form, handleChange, handleSubmit, isPosting, prelimsOptions, closeModal } =
        useLinkPrelim();

    return (
        <FlexModalOuter title="Add existing prelim">
            <Form onSubmit={handleSubmit} className="generic-form flex-content-wrapper size-lg-12">
                <div className="flex-content">
                    <div className="form-fields-container">
                        <Field name="Select prelim" required>
                            <DropdownContainer
                                name="prelimID"
                                options={Object.values(prelimsOptions)}
                                value={prelimsOptions[form.prelimID]}
                                selectedOption={prelimsOptions[form.prelimID]}
                                handleChange={handleChange}
                                required
                            />
                        </Field>
                    </div>
                </div>

                <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                    <ActionButton text="Cancel" onClick={closeModal} source="secondary" />
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

export default LinkPrelimModal;
