import React from 'react';
import { useSelector } from 'react-redux';

import {
    PUSH_NOTIFICATION_FREQUENCY_VALUES,
    PUSH_NOTIFICATION_FREQUENCY_NAMES,
    RECURRENCE_DAYS_SHORT_NAMES,
    PUSH_NOTIFICATION_TARGET_VALUES,
    PUSH_NOTIFICATION_TARGET_NAMES,
} from 'constants/shared/enums';
import { enumFormat } from 'helpers/generic';
import { formatSitesForDropdownOptions, formatUsersForDropdownOptions } from 'helpers/general';

import { selectSites } from 'selectors/companyAdmin/sites';
import { selectCompanyUsers } from 'selectors/companyAdmin/companyUsers';

import useCreatePushNotification from '../hooks/useCreatePushNotification';

import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import Select from 'components/shared/generic/form/presentational/Select';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';
import PickListContainer from 'components/shared/generic/form/containers/PickListContainer';
import DateTimePickerContainer from 'components/shared/generic/form/containers/DateTimePickerContainer';

const CreatePushNotificationModal = () => {
    const { form, handleChange, handleSubmit, isPosting } = useCreatePushNotification();

    const sites = useSelector(selectSites);
    const users = useSelector(selectCompanyUsers);

    const targetOptions = enumFormat(PUSH_NOTIFICATION_TARGET_NAMES);
    const siteOptions = formatSitesForDropdownOptions(Object.values(sites));
    const userOptions = formatUsersForDropdownOptions(Object.values(users));
    const frequencyOptions = enumFormat(PUSH_NOTIFICATION_FREQUENCY_NAMES);
    const dayOptions = enumFormat(RECURRENCE_DAYS_SHORT_NAMES, 'text');

    return (
        <FlexModalOuter title="Create Push Notification" extraClasses="push-notification-modal">
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

                        <Field name="Send to" required>
                            <Select
                                value={form.target}
                                onChange={handleChange}
                                name="target"
                                options={Object.values(targetOptions)}
                                omitPlaceholder
                                required
                            />
                        </Field>

                        {form.target === PUSH_NOTIFICATION_TARGET_VALUES.SITE && (
                            <Field name="Site" required>
                                <Select
                                    value={form.siteID}
                                    onChange={handleChange}
                                    name="siteID"
                                    options={Object.values(siteOptions)}
                                    required
                                />
                            </Field>
                        )}

                        {form.target === PUSH_NOTIFICATION_TARGET_VALUES.USERS && (
                            <Field name="Users" required>
                                <MultiSelect
                                    value={form.userIDs}
                                    onChange={handleChange}
                                    name="userIDs"
                                    options={Object.values(userOptions)}
                                    required
                                />
                            </Field>
                        )}

                        <Field name="Date &amp; Time" required>
                            <DateTimePickerContainer
                                value={form.date}
                                name="date"
                                onChange={val => handleChange('date', val)}
                                fixPickerToTop
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
