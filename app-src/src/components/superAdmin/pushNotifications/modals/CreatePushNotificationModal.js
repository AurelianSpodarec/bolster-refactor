import React from 'react';

import { PUSH_NOTIFICATION_FREQUENCY_NAMES } from 'constants/shared/enums';
import { enumFormat } from 'helpers/generic';

import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import DatePickerContainer from 'components/shared/generic/form/containers/DatePickerContainer';
import Select from 'components/shared/generic/form/presentational/Select';

import useCreatePushNotification from '../hooks/useCreatePushNotification';

const CreatePushNotificationModal = () => {
    const { form, handleChange, handleSubmit, isPosting } = useCreatePushNotification();

    const frequencyOptions = enumFormat(PUSH_NOTIFICATION_FREQUENCY_NAMES);

    return (
        <FlexModalOuter title="Create Push Notification">
            <Form onSubmit={handleSubmit} className="generic-form flex-content-wrapper size-lg-12">
                <div className="flex-content">
                    <div className="form-fields-container">
                        <Field name="Title" required>
                            <TextInputContainer
                                name="title"
                                value={form.title}
                                handleChange={handleChange}
                                placeholder="Enter title"
                                required
                            />
                        </Field>

                        <Field name="Message" required>
                            <TextAreaContainer
                                name="message"
                                value={form.message}
                                handleChange={handleChange}
                                placeholder="Enter message"
                                required
                            />
                        </Field>

                        <Field name="Date" required>
                            <DatePickerContainer
                                selected={form.date}
                                onChange={val => handleChange('date', val)}
                                name="date"
                                required
                            />
                        </Field>

                        <div className="size-lg-6">
                            <Field name="Frequency" required>
                                <Select
                                    value={form.frequency}
                                    onChange={handleChange}
                                    name="frequency"
                                    options={Object.values(frequencyOptions)}
                                    omitPlaceholder
                                    required
                                    forceListAbove
                                />
                            </Field>
                        </div>
                    </div>
                </div>

                <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                    <ActionButton
                        text="Save"
                        icon={isPosting ? 'spinner' : 'save'}
                        iconSpin={isPosting}
                        ambient="positive"
                        disabled={isPosting}
                        type="submit"
                    />
                </ButtonWrapper>
            </Form>
        </FlexModalOuter>
    );
};

export default CreatePushNotificationModal;
