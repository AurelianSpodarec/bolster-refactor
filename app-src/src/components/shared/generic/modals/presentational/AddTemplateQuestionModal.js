import React from 'react';

import ModalOuterContainer from '../containers/ModalOuterContainer';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Dropdown from 'components/shared/generic/form/presentational/Dropdown';
import Field from 'components/shared/generic/form/presentational/Field';

const AddTemplateQuestionModal = ({
    questionTypeOptions,
    questionType,
    name,
    isRequired,
    isHidden,
    handleInputChange
}) => (
    <ModalOuterContainer>
        <Form>
            <Field name="Question type">
                <Dropdown
                    name="questionType"
                    options={questionTypeOptions}
                    selectedOption={questionType}
                    handleChange={handleInputChange}
                />
            </Field>
        </Form>
    </ModalOuterContainer>
);

export default AddTemplateQuestionModal;
