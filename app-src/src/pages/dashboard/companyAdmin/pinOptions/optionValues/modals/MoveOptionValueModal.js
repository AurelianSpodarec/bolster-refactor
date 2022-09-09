import React from 'react';

import useMoveOptionValue from '../hooks/useMoveOptionValue';

import FlexModalOuter from '../../../../../../components/shared/generic/modals/presentational/FlexModalOuter';
import Form from '../../../../../../components/shared/generic/form/containers/Form';
import ButtonWrapper from '../../../../../../components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from '../../../../../../components/shared/generic/button/presentational/ActionButton';
import Field from '../../../../../../components/shared/generic/form/presentational/Field';
import DropdownContainer from '../../../../../../components/shared/generic/form/containers/DropdownContainer';
import TextInputContainer from '../../../../../../components/shared/generic/form/containers/TextInputContainer';

const MoveOptionValueModal = ({ option, hideModal }) => {
    const { optionSetOptionsObj, setID, setSetID, name, setName, handleSubmit, isPosting } =
        useMoveOptionValue(option);
    return (
        <FlexModalOuter title="Move pin option value to a different set">
            <Form onSubmit={handleSubmit} className="generic-form flex-content-wrapper size-lg-12">
                <div className="flex-content">
                    <div className="form-fields-container">
                        <Field name="Select set" required>
                            <DropdownContainer
                                name="setID"
                                options={Object.values(optionSetOptionsObj)}
                                value={optionSetOptionsObj[setID]}
                                selectedOption={optionSetOptionsObj[setID]}
                                handleChange={(_, value) => setSetID(value)}
                                required
                            />
                        </Field>
                        <Field name="Option name" required>
                            <TextInputContainer
                                name="name"
                                value={name}
                                handleChange={(_, value) => setName(value)}
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

export default MoveOptionValueModal;
