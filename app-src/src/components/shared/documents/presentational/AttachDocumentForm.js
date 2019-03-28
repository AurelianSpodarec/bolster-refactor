import React from 'react';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import Switch from 'components/shared/generic/form/presentational/Switch';
import SwitchContainer from 'components/shared/generic/form/containers/SwitchContainer';

const AttachDocumentForm = ({
    handleInputChange,
    handleFileChange,
    handleSubmit,
    requiresAgreement,
    documentName,
    requiresPhoto,
    requiresFileView,
    requiresSignature,
    forceUpsyncToContinue,
    file,
    serviceType,
    aggreeancePerDay,
    startDate,
    endDate
}) => (
    <Form className="content-area size-lg-12" handleSubmit={handleSubmit}>
        <h1 className="heading heading-3">Attach Form</h1>
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
        <div className="size-lg-6">
            <SwitchContainer
                checked={requiresPhoto}
                handleChange={handleInputChange}
                value={requiresPhoto}
                name="requiresPhoto"
            />
            <SwitchContainer checked={requiresFileView} />
            <SwitchContainer checked={requiresSignature} />
            <SwitchContainer checked={forceUpsyncToContinue} />
        </div>
    </Form>
);

export default AttachDocumentForm;
