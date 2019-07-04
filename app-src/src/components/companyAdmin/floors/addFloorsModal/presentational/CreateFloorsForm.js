import React from 'react';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import BolsterLabelExample from 'components/shared/generic/form/presentational/BolsterLabelExample';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';
import DatePickerPresentational from 'components/shared/generic/form/presentational/DatePicker';

// * .*. in names is used for splitting up field validations without risking overlap with real names

const CreateFloorsForm = ({
    handleSubmit,
    floors,
    updateFloor,
    addFloor,
    removeFloor,
    handleClose,
    isUsingBolsterLabels
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            {floors.map((floor, i) => (
                <>
                    <div
                        className={`size-lg-${
                            isUsingBolsterLabels ? '6' : '12'
                        } size-md-12`}
                        key={floor.id}
                    >
                        <Field name="Floor name" required>
                            <TextInputContainer
                                name={`${floor.id}.*.name`}
                                value={floor.name}
                                handleChange={(name, value) =>
                                    updateFloor(name, value, floor.id)
                                }
                                required
                            />
                        </Field>

                        <div className="size-lg-12">
                            <div className="size-lg-6 size-md-12">
                                <Field name="Send an alert?">
                                    <CheckboxContainer
                                        checked={floor.isAlertShowing}
                                        name={`${floor.id}.*.isAlertShowing`}
                                        text=""
                                        handleChange={(name, value) =>
                                            updateFloor(name, value, floor.id)
                                        }
                                    />
                                </Field>
                            </div>
                        </div>

                        {floor.isAlertShowing && (
                            <div className="size-lg-12">
                                <div className="size-lg-12">
                                    <Field name="Alert Message">
                                        <TextAreaContainer
                                            value={floor.message}
                                            name={`${floor.id}.*.message`}
                                            handleChange={(name, value) =>
                                                updateFloor(
                                                    name,
                                                    value,
                                                    floor.id
                                                )
                                            }
                                        />
                                    </Field>
                                </div>

                                <div className="size-lg-12">
                                    <Field name="Date to send">
                                        <DatePickerPresentational
                                            name={`${floor.id}.*.dateToSend`}
                                            selected={floor.dateToSend}
                                            onChange={value =>
                                                updateFloor(
                                                    `${floor.id}.*.dateToSend`,
                                                    value,
                                                    floor.id
                                                )
                                            }
                                            placeholderText="Date"
                                            showTimeSelect
                                        />
                                    </Field>
                                </div>
                            </div>
                        )}
                    </div>
                    {isUsingBolsterLabels && (
                        <div className="size-lg-6 size-md-12">
                            <BolsterLabelExample
                                name={floor.name}
                                hierarchy="Floor"
                            />
                        </div>
                    )}
                    {floors.length > 1 && (
                        <BlockButtonWrapper>
                            <button
                                className="button red icon-only"
                                type="button"
                                onClick={() => removeFloor(floor.id)}
                            >
                                <i className="fa fa-trash" />
                            </button>
                        </BlockButtonWrapper>
                    )}
                </>
            ))}
        </div>
        <BlockButtonWrapper>
            <button
                className="button blue left"
                type="button"
                onClick={addFloor}
            >
                <i className="fa fa-plus" /> Add another floor
            </button>
            <button className="button green" type="submit">
                <i className="fa fa-plus" />
                Submit
            </button>
            <ButtonContainer handleClick={handleClose}>Cancel</ButtonContainer>
        </BlockButtonWrapper>
    </Form>
);

export default CreateFloorsForm;
