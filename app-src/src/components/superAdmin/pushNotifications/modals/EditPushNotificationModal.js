import React from 'react';

import {
    PUSH_NOTIFICATION_FREQUENCY_VALUES,
    PUSH_NOTIFICATION_FREQUENCY_NAMES,
    RECURRENCE_DAYS_SHORT_NAMES,
} from 'constants/shared/enums';
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
import PickListContainer from 'components/shared/generic/form/containers/PickListContainer';

import useEditPushNotification from '../hooks/useEditPushNotification';

const CreatePushNotificationModal = ({ notification }) => {
    const { form, handleChange, handleSubmit, isPosting } = useEditPushNotification(notification);

    const frequencyOptions = enumFormat(PUSH_NOTIFICATION_FREQUENCY_NAMES);
    const dayOptions = enumFormat(RECURRENCE_DAYS_SHORT_NAMES, 'text');

    return (
        <FlexModalOuter title={`Edit ${notification.title}`} extraClasses="push-notification-modal">
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

                        <Field name="Date &amp; Time" required>
                            <DatePickerContainer
                                selected={form.date}
                                onChange={val => handleChange('date', val)}
                                name="date"
                                showTimeSelect
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

                        {form.frequency === PUSH_NOTIFICATION_FREQUENCY_VALUES.WEEKLY && (
                            <div className="size-lg-6">
                                <Field name="Days" required>
                                    <PickListContainer
                                        name="recurrenceDays"
                                        value={form.recurrenceDays}
                                        handleChange={handleChange}
                                        options={dayOptions}
                                        required
                                    />
                                </Field>
                            </div>
                        )}
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
