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
                    {options.map(([id, text], i) => (
                        <Field key={id} name={`Option ${i + 1}`} required>
                            <TextInputContainer
                                name={id}
                                value={text}
                                handleChange={handleChange}
                                required
                            />
                            {id in optionConfigurations ? (
                                <div className="container-button delete-question checking">
                                    <div className="checkbox">
                                        <input
                                            id={id}
                                            onChange={handleQuestionToggle}
                                            type="checkbox"
                                            checked={optionConfigurations[id]}
                                            name={id}
                                        />
                                        <label htmlFor={id}>
                                            {text.length && <span className="text">{text}</span>}
                                            <span className="outer">
                                                <span className="inner" />
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    className="button red delete-question icon-only"
                                    onClick={() => handleRemoveOption(id)}
                                >
                                    <i className="far fa-trash-alt" />
                                </button>
                            )}
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
