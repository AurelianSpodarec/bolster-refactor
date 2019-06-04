import React from 'react';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Field from 'components/shared/generic/form/presentational/Field';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';

const FilterFieldsModal = ({
    questionOptions,
    selectedQuestions,
    handleChange,
    addOption,
    removeOption,
    updateOption,
    questionValues
}) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title="Add Field" />
            {/* ? multiple fields in modal? */}
            {/* multi checkboxes for field name */}
            <Field name="Questions">
                <CheckboxListContainer
                    options={questionOptions}
                    selectedOptions={selectedQuestions}
                    name={'Options'}
                    handleChange={handleChange}
                />
            </Field>
            {/* textboxes for field value options */}
        </ModalOuterContainer>
    );
};

export default FilterFieldsModal;
