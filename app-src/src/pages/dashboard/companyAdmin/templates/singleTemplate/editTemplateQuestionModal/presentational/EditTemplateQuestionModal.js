import React from 'react';
import ModalOuterContainer from 'components_DEPRECATED/shared/generic/modals/containers/ModalOuterContainer';
import Field from 'components_DEPRECATED/shared/generic/form/presentational/Field';
import TextInputContainer from 'components_DEPRECATED/shared/generic/form/containers/TextInputContainer';
import Form from 'components_DEPRECATED/shared/generic/form/containers/Form';
import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';

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
                                            optionConfigurations[id] ? (
                                                <ActionButton
                                                    text="Disabled"
                                                    onClick={() => handleQuestionToggle(id)}
                                                    icon="minus"
                                                    size="small"
                                                    ambient="negative"
                                                />
                                            ) : (
                                                <ActionButton
                                                    text="Enabled"
                                                    onClick={() => handleQuestionToggle(id)}
                                                    icon="plus"
                                                    size="small"
                                                    ambient="positive"
                                                />
                                            )
                                        ) : (
                                            <ActionButton
                                                text="Confirm"
                                                onClick={() => handleRemoveOption(id)}
                                                icon="check"
                                            />
                                        )}
                                    </div>
                                </div>
                            </Field>
                        ))}
                    <div className="size-lg-12">
                        <ButtonWrapper alignment="right">
                            <ActionButton
                                text="Add Option"
                                onClick={handleAddOption}
                                icon="plus"
                                size="small"
                                ambient="positive"
                            />
                        </ButtonWrapper>
                    </div>
                </div>

                <div className="size-lg-12 margin-top">
                    <ButtonWrapper alignment="right">
                        <ActionButton
                            text="Cancel"
                            onClick={hideModal}
                            source="secondary"
                            size="small"
                        />
                        <ActionButton text="Confirm" type="submit" icon="check" size="small" />
                    </ButtonWrapper>
                </div>
            </Form>
        </ModalOuterContainer>
    );
};

export default EditTemplateQuestionModal;
