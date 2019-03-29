import React from 'react';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import SwitchContainer from 'components/shared/generic/form/containers/SwitchContainer';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';

const AttachDocumentForm = ({
    handleInputChange,
    handleFileChange,
    handleCheckboxChange,
    handleSubmit,
    requiresAgreement,
    documentName,
    requiresPhoto,
    requiresFileView,
    requiresSignature,
    forceUpsyncToContinue,
    serviceType,
    agreeancePerDay,
    startDate,
    endDate
}) => (
    <Form className="content-area size-lg-12" handleSubmit={handleSubmit}>
        <h1 className="heading heading-3">Attach Form</h1>
        {/* radio button here */}
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
        <Field name="Service type" sizeClasses="size-lg-2">
            <DropdownContainer
                placeholder="[ services ]" 
                name={'serviceType'} 
                options={['##fire##', '##water##', '##earth##', '##air##', '##heart##'].map(val => ({text: val, value: val}))} 
                handleChange={handleInputChange}/>
        </Field>
    </Form>
);

export default AttachDocumentForm;
