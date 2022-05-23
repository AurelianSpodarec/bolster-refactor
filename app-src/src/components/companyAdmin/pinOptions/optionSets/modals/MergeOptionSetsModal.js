import React from 'react';

import useMergeOptionSets from '../hooks/useMergeOptionSets';

import FlexModalOuter from '../../../../shared/generic/modals/presentational/FlexModalOuter';
import Form from '../../../../shared/generic/form/containers/Form';
import ButtonWrapper from '../../../../shared/generic/button/presentational/ButtonWrapper';
import ActionButton from '../../../../shared/generic/button/presentational/ActionButton';
import Field from '../../../../shared/generic/form/presentational/Field';
import DropdownContainer from '../../../../shared/generic/form/containers/DropdownContainer';

const MergeOptionSetsModal = ({ set, hideModal }) => {
    const { setOptions, form, handleChange, handleSubmit, isPosting } = useMergeOptionSets(set);
    return (
        <FlexModalOuter title={`Merge ${set.name}`}>
            <Form onSubmit={handleSubmit} className="generic-form flex-content-wrapper size-lg-12">
                <div className="flex-content">
                    <div className="form-fields-container">
                        <Field name="Select set" required>
                            <DropdownContainer
                                name="setID"
                                options={Object.values(setOptions)}
                                value={setOptions[form.setID]}
                                selectedOption={setOptions[form.setID]}
                                handleChange={handleChange}
                                required
                            />
                        </Field>
                    </div>
                </div>

                <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                    <ActionButton text="Cancel" source="secondary" onClick={hideModal} />
                    <ActionButton
                        text="Confirm"
                        icon={isPosting ? 'spinner' : 'check'}
                        iconSpin={isPosting}
                        disabled={isPosting}
                        type="submit"
                    />
                </ButtonWrapper>
            </Form>
        </FlexModalOuter>
    );
};

export default MergeOptionSetsModal;
