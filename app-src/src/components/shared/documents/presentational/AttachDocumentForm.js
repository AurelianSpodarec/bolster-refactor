import React from 'react';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import SwitchContainer from 'components/shared/generic/form/containers/SwitchContainer';
import ServiceListCheckboxContainer from 'components/shared/services/containers/ServiceListCheckboxContainer';
import { Link, withRouter } from 'react-router-dom';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import RadioButton from 'components/shared/generic/form/presentational/RadioButton';
import DatePickerContainer from 'components/shared/documents/containers/AttachDocumentDatePickerContainer';

const AttachDocumentForm = ({
    handleInputChange,
    handleFileChange,
    handleRadioChange,
    handleMultiselect,
    handleSubmit,
    handleDateChange,
    requiresAgreement,
    name,
    isPhotoRequired,
    isFileViewRequired,
    isSignatureRequired,
    isUpsyncForced,
    checkedServices,
    agreeanceEveryXDays,
    startOn,
    endOn,
    backUrl
}) => (
    <Form className="content-area size-lg-12" handleSubmit={handleSubmit}>
        <h1 className="heading heading-3">Attach Document</h1>
        <p>
            Instructions: ##Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Expedita sit quas, aliquam explicabo laboriosam illo. Beatae
            architecto, laudantium iusto iure atque quas ea at possimus alias
            iste eaque, fuga tenetur non vero repellat nostrum adipisci? Veniam,
            aspernatur quidem sed voluptas hic quis doloremque tempora
            dignissimos, incidunt natus perferendis, placeat possimus.##
        </p>
        <div className="size-lg-12">
            <RadioButton
                name="requiresAgreement"
                requiresAgreement={requiresAgreement}
                value="View only"
                handleInputChange={handleRadioChange}
            />
            <RadioButton
                name="requiresAgreement"
                requiresAgreement={requiresAgreement}
                value="Requires agreement (once)"
                handleInputChange={handleRadioChange}
            />
            <RadioButton
                name="requiresAgreement"
                requiresAgreement={requiresAgreement}
                value="Requires agreement (periodically)"
                handleInputChange={handleRadioChange}
            />
        </div>
        <Field name="Name of document" sizeClasses="size-lg-4">
            <TextInputContainer
                value={name}
                name="name"
                type="text"
                handleChange={handleInputChange}
                required
                placeholder="document name..."
            />
        </Field>

        {/* is this the right way of styling this? */}
        <div className="size-lg-12">
            <div className="size-lg-6">
                <Field name="Upload PDF or image">
                    <FileUploadContainer
                        name="file"
                        allowedTypes={['pdf', 'image']}
                        handleChange={handleFileChange}
                        required
                    />
                </Field>
            </div>
        </div>
        <div className="size-lg-12">
            <Field sizeClasses="size-lg-6" name="Select dates">
                <DatePickerContainer
                    startOn={startOn}
                    endOn={endOn}
                    name="DatePicker"
                    onChange={handleDateChange}
                />
            </Field>
        </div>
        <div className="size-lg-12">
            <Field name="Service type">
                <ServiceListCheckboxContainer
                    checkedServices={checkedServices}
                    handleChange={handleMultiselect}
                />
            </Field>
        </div>
        {requiresAgreement !== 'View only' && (
            <>
                <Field name="Options">
                    <SwitchContainer
                        checked={isPhotoRequired}
                        handleChange={handleInputChange}
                        name="isPhotoRequired"
                        text="Requires photo"
                    />
                    <SwitchContainer
                        checked={isFileViewRequired}
                        handleChange={handleInputChange}
                        name="isFileViewRequired"
                        text="Requires file view"
                    />
                    <SwitchContainer
                        checked={isSignatureRequired}
                        handleChange={handleInputChange}
                        name="isSignatureRequired"
                        text="Requires signature"
                    />
                    <SwitchContainer
                        checked={isUpsyncForced}
                        handleChange={handleInputChange}
                        name="isUpsyncForced"
                        text="Force upsync to continue"
                    />
                </Field>
                {requiresAgreement === 'Requires agreement (periodically)' && (
                    <div className="size-lg-12">
                        <div className="size-lg-6">
                            <Field name="Agreeance frequency (days)">
                                <TextInputContainer
                                    name="agreeanceEveryXDays"
                                    type="number"
                                    value={agreeanceEveryXDays}
                                    handleChange={handleInputChange}
                                />
                            </Field>
                        </div>
                    </div>
                )}
            </>
        )}
        <BlockButtonWrapper>
            <button className="button green">
                <i className="fa fa-plus" />
                Attach Document
            </button>
            <Link to={backUrl || '/'} className="button">
                <i className="fa fa-times" /> Cancel
            </Link>
        </BlockButtonWrapper>
    </Form>
);

export default withRouter(AttachDocumentForm);
