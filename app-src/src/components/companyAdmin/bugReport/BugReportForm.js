import React from 'react';

import Form from 'components/shared/generic/form/containers/Form';
import useBugReport from './hooks/useBugReport';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';
import NumberInputContainer from 'components/shared/generic/form/containers/NumberInputContainer';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import DatePickerContainer from 'components/shared/generic/form/containers/DatePickerContainer';
import TextArea from 'components/shared/generic/form/presentational/TextArea';

const BugReportForm = () => {
    const { form, handleChange, handleSubmit } = useBugReport();
    return (
        <Form className="generic-form">
            <div className="size-lg-12 margin-bottom">
                <Field
                    name="Access Credentials (affected user(s) login details)"
                    required
                    sizeClasses="size-lg-6"
                >
                    <TextAreaContainer
                        name="accessCredentials"
                        value={form.accessCredentials}
                        handleChange={handleChange}
                        required
                    />
                </Field>

                <Field name="Number of users affected?" required sizeClasses="size-lg-6">
                    <NumberInputContainer
                        name="affectedUserCount"
                        value={form.affectedUserCount}
                        handleChange={handleChange}
                        required
                    />
                </Field>
            </div>

            <div className="margin-bottom">
                <FieldOutput
                    title="1. App Only"
                    description="Skip to section 2 if your bug isn't on the Bolster Systems mobile app"
                    fieldClass="form-padding"
                />

                <div className="size-lg-12 margin-bottom">
                    <Field name="Manufacturer of phone/tablet? " sizeClasses="size-lg-6">
                        <TextInputContainer
                            name="deviceManufacturer"
                            value={form.deviceManufacturer}
                            handleChange={handleChange}
                        />
                    </Field>

                    <Field name="Manufacturer model of phone/tablet? " sizeClasses="size-lg-6">
                        <TextInputContainer
                            name="deviceModel"
                            value={form.deviceModel}
                            handleChange={handleChange}
                        />
                    </Field>
                </div>

                <div className="size-lg-12 margin-bottom">
                    <Field
                        name="Screenshot of the 'About device' page. This can be found through the devices settings."
                        sizeClasses="size-lg-6"
                    >
                        <p>Please upload your screenshot in .pdf, .jpg or .png format.</p>
                        <br />
                        <FileUploadContainer
                            value={form.aboutDeviceScreenshot}
                            name="aboutDeviceScreenshot"
                            acceptedTypes={['application/pdf', 'image/*']}
                            handleChange={handleChange}
                        />
                    </Field>

                    <Field
                        name="App version number? This can be found in the top right corner of the app."
                        sizeClasses="size-lg-6"
                    >
                        <NumberInputContainer
                            name="appVersion"
                            value={form.appVersion}
                            handleChange={handleChange}
                        />
                    </Field>
                </div>
            </div>

            <div className="size-lg-12 margin-bottom">
                <FieldOutput
                    title="2. Desktop Only"
                    description="Skip to section 3 your bug isn't on the Bolster Systems desktop app"
                    fieldClass="form-padding"
                />
                <div className="size-lg-12 margin-bottom">
                    <Field name="Web browser used" sizeClasses="size-lg-6">
                        <TextInputContainer
                            name="browserUsed"
                            value={form.browserUsed}
                            handleChange={handleChange}
                        />
                    </Field>
                </div>
            </div>

            <div className="size-lg-12 margin-bottom">
                <FieldOutput title="3. Details" fieldClass="form-padding" />

                <div className="size-lg-12 margin-bottom">
                    <Field
                        name="Where in the system is the issue (what page)?"
                        sizeClasses="size-lg-6"
                        required
                    >
                        <TextInputContainer
                            name="systemPage"
                            value={form.systemPage}
                            handleChange={handleChange}
                            required
                        />
                    </Field>

                    <Field name="When did the issue occur?" sizeClasses="size-lg-6" required>
                        <DatePickerContainer
                            name="dateIssueOccured"
                            value={form.dateIssueOccured}
                            placeholderText="Select Date"
                            handleChange={handleChange}
                            required
                        />
                    </Field>
                </div>

                <div className="size-lg-12 margin-bottom">
                    <Field name="Full Description" sizeClasses="size-lg-6" required>
                        <TextArea
                            name="fullDescription"
                            value={form.fullDescription}
                            handleChange={handleChange}
                            required
                        />
                    </Field>

                    <Field
                        name="Screen recording/screenshot of issue and any error messages received"
                        sizeClasses="size-lg-6"
                        required
                    >
                        <p>
                            Please upload a screenshot or screen recording in .pdf, .jpg, .png or
                            mp4 format.
                        </p>
                        <br />
                        <FileUploadContainer
                            value={form.evidenceFile}
                            name="evidenceFile"
                            acceptedTypes={['application/pdf', 'image/*', 'video/mp4']}
                            handleChange={handleChange}
                        />
                    </Field>
                </div>
            </div>
        </Form>
    );
};

export default BugReportForm;
