import React from 'react';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import SwitchContainer from 'components/shared/generic/form/containers/SwitchContainer';
import ServiceListCheckboxContainer from 'components/shared/services/containers/ServiceListCheckboxContainer';
import DatePicker from 'react-datepicker';
import { Link, withRouter } from 'react-router-dom';

import 'react-datepicker/dist/react-datepicker.css';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import RadioButton from 'components/shared/generic/form/presentational/RadioButton';

const AttachDocumentForm = ({
    handleInputChange,
    handleFileChange,
    handleMultiselect,
    handleCheckboxChange,
    handleSubmit,
    handleDateChange,
    requiresAgreement,
    documentName,
    requiresPhoto,
    requiresFileView,
    requiresSignature,
    forceUpsyncToContinue,
    checkedServices,
    agreeanceFrequency,
    startDate,
    endDate,
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
                handleInputChange={handleInputChange}
            />
            <RadioButton
                name="requiresAgreement"
                requiresAgreement={requiresAgreement}
                value="Requires agreement (once)"
                handleInputChange={handleInputChange}
            />
            <RadioButton
                name="requiresAgreement"
                requiresAgreement={requiresAgreement}
                value="Requires agreement (periodically)"
                handleInputChange={handleInputChange}
            />
        </div>
        <Field name="Name of document" sizeClasses="size-lg-4">
            <TextInputContainer
                value={documentName}
                name="documentName"
                type="text"
                handleChange={handleInputChange}
                required
                placeholder="document name..."
            />
        </Field>

        {/* is this the right way of styling this? */}
        <div className="size-lg-12">
            <div className="size-lg-6">
                <label className="title">Upload PDF or image</label>
                <FileUploadContainer
                    name="file"
                    allowedTypes={['pdf', 'image']}
                    handleChange={handleFileChange}
                    required
                />
            </div>
        </div>
        {requiresAgreement !== 'View only' && (
            <>
                <div className="size-lg-6">
                    <SwitchContainer
                        checked={requiresPhoto}
                        handleChange={handleCheckboxChange}
                        name="requiresPhoto"
                        text="Requires photo"
                    />
                    <SwitchContainer
                        checked={requiresFileView}
                        handleChange={handleCheckboxChange}
                        name="requiresFileView"
                        text="Requires file view"
                    />
                    <SwitchContainer
                        checked={requiresSignature}
                        handleChange={handleCheckboxChange}
                        name="requiresSignature"
                        text="Requires signature"
                    />
                    <SwitchContainer
                        checked={forceUpsyncToContinue}
                        handleChange={handleCheckboxChange}
                        name="forceUpsyncToContinue"
                        text="Force upsync to continue"
                    />
                </div>
                <div className="size-lg-12">
                    <Field name="Service type">
                        <ServiceListCheckboxContainer
                            checkedServices={checkedServices}
                            handleMultiselect={handleMultiselect}
                        />
                    </Field>
                </div>
                {requiresAgreement === 'Requires agreement (periodically)' && (
                    <div className="size-lg-12">
                        <div className="size-lg-6">
                            <Field name="Agreeance frequency (days)">
                                <TextInputContainer
                                    name="agreeanceFrequency"
                                    type="number"
                                    value={agreeanceFrequency}
                                    handleChange={handleInputChange}
                                />
                            </Field>
                        </div>
                    </div>
                )}
                <div className="size-lg-6">
                    <Field sizeClasses="size-lg-6" name="Start date">
                        <DatePicker
                            selected={startDate}
                            onChange={e => handleDateChange(e, 'startDate')}
                        />
                    </Field>
                    <Field sizeClasses="size-lg-6" name="End date">
                        <DatePicker
                            selected={endDate}
                            onChange={e => handleDateChange(e, 'endDate')}
                        />
                    </Field>
                </div>
            </>
        )}
        <BlockButtonWrapper>
            <button className="button green">
                <i className="fa fa-plus" />
                Add Service
            </button>
            <Link to={backUrl || '/'} className="button">
                <i className="fa fa-times" /> Cancel
            </Link>
        </BlockButtonWrapper>
    </Form>
);

export default withRouter(AttachDocumentForm);
