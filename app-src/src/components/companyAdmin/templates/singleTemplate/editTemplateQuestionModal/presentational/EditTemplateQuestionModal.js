import React from 'react';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';

const EditTemplateQuestionModal = ({
    options,
    handleChange,
    handleNewOptionChange,
    handleRemoveOption,
    hideModal,
    handleSubmit,
    newOption,
    handleShowAddOption,
    handleAddOption,
    addingOption
}) => (
    <ModalOuterContainer>
        <p>Hello</p>
        <Form onSubmit={handleSubmit}>
            {options.map(([id, text], i) => (
                <Field key={id} name={`Option ${i + 1}`}>
                    <TextInputContainer
                        name={id}
                        value={text}
                        handleChange={handleChange}
                    />
                    <button
                        className="button red"
                        value={id}
                        onClick={handleRemoveOption}
                    >
                        <i className="fa fa-times" />
                        Delete Option
                    </button>
                </Field>
            ))}
            {addingOption && (
                <Field name="New Option">
                    <TextInputContainer
                        name="newOption"
                        value={newOption}
                        handleChange={handleNewOptionChange}
                    />
                    <button className="button" onClick={handleAddOption}>
                        Set option
                    </button>
                </Field>
            )}
            <BlockButtonWrapper>
                {!addingOption && (
                    <button className="button" onClick={handleShowAddOption}>
                        <i className="fa fa-plus" />
                        Add Option
                    </button>
                )}
                <button type="submit" className="button">
                    Save
                </button>
                <button className="button" onClick={hideModal}>
                    Cancel
                </button>
            </BlockButtonWrapper>
        </Form>
    </ModalOuterContainer>
);

export default EditTemplateQuestionModal;
