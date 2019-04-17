import React from 'react';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const EditTemplateQuestionModal = ({
    options,
    handleChange,
    handleRemoveOption,
    hideModal,
    handleSubmit,
    handleAddOption,
    questionName
}) => (
    <ModalOuterContainer>
        <BlockHeading title={`Edit question options - ${questionName}`} />
        <Form className="generic-form size-lg-12" onSubmit={handleSubmit}>
            <div className="dropdown-create size-lg-12">
                {options.map(([id, text], i) => (
                    <Field key={id} name={`Option ${i + 1}`}>
                        <TextInputContainer
                            name={id}
                            value={text}
                            handleChange={handleChange}
                            required
                        />
                        <button
                            className="button red delete-question icon-only"
                            value={id}
                            onClick={handleRemoveOption}
                        >
                            <i className="far fa-trash-alt" />
                        </button>
                    </Field>
                ))}
                <div className="size-lg-12">
                    <button
                        className="button add-option"
                        type="button"
                        onClick={handleAddOption}
                    >
                        <i className="fa fa-plus" />
                        Add Option
                    </button>
                </div>
            </div>

            <BlockButtonWrapper>
                <button type="submit" className="button green">
                    <i className="fa fa-save" />
                    Save
                </button>

                <button className="button" type="button" onClick={hideModal}>
                    Cancel
                </button>
            </BlockButtonWrapper>
        </Form>
    </ModalOuterContainer>
);

export default EditTemplateQuestionModal;
