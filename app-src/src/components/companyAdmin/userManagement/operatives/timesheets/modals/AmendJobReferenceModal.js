import React from 'react';

import useAmendJobReference from '../hooks/useAmendJobReference';

import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import Select from 'components/shared/generic/form/presentational/Select';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';

const AmendJobReferenceModal = ({ hideModal, shiftID, oldJobRefID }) => {
    const { form, handleChange, handleSubmit, jobRefOptions, isPosting } = useAmendJobReference({
        shiftID,
        oldJobRefID,
    });

    return (
        <FlexModalOuter title="Edit Job Reference">
            <Form onSubmit={handleSubmit} className="generic-form flex-content-wrapper size-lg-12">
                <div className="flex-content">
                    <div className="form-fields-container size-lg-12">
                        <Field name="Job Reference">
                            <Select
                                value={form.newJobRefID}
                                onChange={handleChange}
                                name="newJobRefID"
                                options={Object.values(jobRefOptions)}
                                staticListPosition
                            />
                        </Field>
                    </div>
                </div>

                <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                    <ActionButton text="Cancel" source="secondary" onClick={hideModal} />
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

export default AmendJobReferenceModal;
