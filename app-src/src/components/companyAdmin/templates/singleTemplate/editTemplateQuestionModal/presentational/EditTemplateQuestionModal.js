import React from 'react';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const EditTemplateQuestionModal = ({
    options,
    handleChange,
    handleRemoveOption,
    hideModal,
    handleSubmit,
    handleAddOption,
    questionName,
    optionConfigurations,
    handleQuestionToggle,
}) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title={`Edit question options - ${questionName}`} />
            <Form className="generic-form size-lg-12" onSubmit={handleSubmit}>
                <div className="dropdown-create size-lg-12">
                    {[...options]
                        .sort((a, b) => {
                            const sortA = a[1].sort;
                            const sortB = b[1].sort;
                            return sortA - sortB;
                        })
                        .map(([id, { value }], i) => (
                            <Field key={id} name={`Option ${i + 1}`} required>
                                <div className="size-lg-12 template-options-inputs-container">
                                    <div className="size-lg-10">
                                        <TextInputContainer
                                            name={id}
                                            value={value}
                                            handleChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="size-lg-2 buttons-box">
                                        {id in optionConfigurations ? (
                                            <div className="container-button checking">
                                                {optionConfigurations[id] ? (
                                                    <button
                                                        onClick={() => handleQuestionToggle(id)}
                                                        className="button red"
                                                        type="button"
                                                    >
                                                        <i className="fa fa-minus" /> Disabled
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleQuestionToggle(id)}
                                                        className="button green"
                                                        type="button"
                                                    >
                                                        <i className="fa fa-plus" /> Enabled
                                                    </button>
                                                )}
                                            </div>
                                        ) : (
                                            <button
                                                className="button red"
                                                onClick={() => handleRemoveOption(id)}
                                                type="button"
                                            >
                                                <i className="far fa-trash-alt" /> Delete
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </Field>
                        ))}
                    <div className="size-lg-12">
                        <button
                            className="button add-option green"
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
                    <ButtonContainer handleClick={hideModal}>Cancel</ButtonContainer>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default EditTemplateQuestionModal;
