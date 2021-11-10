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
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import LoadingIcon from 'components/shared/generic/misc/presentational/LoadingIcon';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';

const BugReportForm = () => {
    const { form, handleChange, handleSubmit, isPosting } = useBugReport();
    return (
        <Form className="generic-form" onSubmit={handleSubmit}>
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
                    <Field name="Manufacturer and model of phone/tablet? " sizeClasses="size-lg-6">
                        <TextInputContainer
                            name="deviceDetails"
                            value={form.deviceDetails}
                            handleChange={handleChange}
                        />
                    </Field>

                    <Field
                        name="Screenshot of the 'About device' page. This can be found through the devices settings."
                        sizeClasses="size-lg-6"
                    >
                        <p>Please upload your screenshot in .jpg or .png format.</p>
                        <br />
                        <FileUploadContainer
                            value={form.aboutDeviceScreenshot}
                            name="aboutDeviceScreenshot"
                            acceptedTypes={['image/jpg', 'image/png', 'image/jpeg']}
                            handleChange={handleChange}
                        />
                    </Field>

                    <Field
                        name="App version number? This can be found in the top right corner of the app."
                        sizeClasses="size-lg-6"
                    >
                        <TextInputContainer
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
                        name="Where in the system is the issue (What page)?"
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
                            name="dateIssueOccurred"
                            selected={form.dateIssueOccurred}
                            onChange={val => handleChange('dateIssueOccurred', val)}
                            placeholderText="Select Date"
                        />
                    </Field>
                </div>

                <div className="size-lg-12 margin-bottom">
                    <Field name="Full Description" sizeClasses="size-lg-6" required>
                        <TextAreaContainer
                            name="fullDescription"
                            value={form.fullDescription}
                            handleChange={handleChange}
                            required
                        />
                    </Field>

                    <Field name="Could you replicate the issue?" sizeClasses="size-lg-6" required>
                        <CheckboxContainer
                            name="isReplicable"
                            checked={form.isReplicable}
                            handleChange={handleChange}
                        />
                    </Field>
                </div>

                <div className="size-lg-12 margin-bottom">
                    <Field
                        name="Screen recording/screenshot of issue and any error messages received"
                        sizeClasses="size-lg-6"
                        required
                    >
                        <p>
                            Please upload a screenshot or screen recording in .jpg, .png or mp4
                            format.
                        </p>
                        <br />
                        <FileUploadContainer
                            value={form.evidenceFile}
                            name="evidenceFile"
                            acceptedTypes={['image/jpg', 'image/png', 'image/jpeg', , 'video/mp4']}
                            handleChange={handleChange}
                        />
                    </Field>
                </div>
            </div>
            <BlockButtonWrapper>
                <button className="button green" type="submit" disabled={isPosting}>
                    {isPosting ? (
                        <LoadingIcon />
                    ) : (
                        <>
                            <i className="fa fa-plus" />
                            Submit
                        </>
                    )}
                </button>
            </BlockButtonWrapper>
        </Form>
    );
};

export default BugReportForm;
