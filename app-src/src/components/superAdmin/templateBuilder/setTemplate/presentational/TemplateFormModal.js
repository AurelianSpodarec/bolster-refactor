import React from 'react';

import ModalOuter from 'components/shared/generic/modals/presentational/ModalOuter';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import LabelTypeRadioButtonsContainer from '../containers/LabelTypeRadioButtonsContainer';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';
import Select from 'components/shared/generic/form/presentational/Select';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import ButtonWrapper from '../../../../shared/generic/button/presentational/ButtonWrapper';
import ActionButton from '../../../../shared/generic/button/presentational/ActionButton';

const TemplateformModal = ({
    action,
    name,
    serviceOptions,
    selectedService,
    labelTypeOptions,
    labelType,
    statusDropdownOptions,
    statusOptions,
    reportLayout,
    reportLayoutOptions,
    handleChange,
    handleSubmit,
    handleCancel,
    pinImageS3Key,
}) => (
    <ModalOuter hideModal={handleCancel}>
        <BlockHeading title={`${action} template`} />
        <Form className="generic-form" onSubmit={handleSubmit}>
            <Field name="name" required>
                <TextInputContainer name="name" handleChange={handleChange} value={name} required />
            </Field>
            <Field name="Service" required>
                <DropdownContainer
                    name="serviceID"
                    placeholder="-- select a service --"
                    handleChange={handleChange}
                    options={serviceOptions}
                    selectedOption={selectedService}
                    required
                />
            </Field>
            <Field name="Status options" required>
                <MultiSelect
                    name="statusOptions"
                    placeholder="-- select status options --"
                    onChange={handleChange}
                    options={statusDropdownOptions}
                    value={statusOptions}
                    required
                />
            </Field>
            <Field name="Report layout" required>
                <Select
                    name="reportLayout"
                    placeholder="-- select layout option --"
                    onChange={handleChange}
                    options={reportLayoutOptions}
                    value={reportLayout}
                    required
                />
            </Field>
            <Field name="Label type" required>
                <LabelTypeRadioButtonsContainer
                    name="labelType"
                    options={labelTypeOptions}
                    value={labelType}
                    handleChange={handleChange}
                />
            </Field>
            <Field name="Pin Display Icon">
                <p>Please upload your icon in .png format with a maximum size of 128x128.</p>
                <br />
                <FileUploadContainer
                    name="pinImageS3Key"
                    value={pinImageS3Key}
                    acceptedTypes={['image/png']}
                    handleChange={(name, value) => {
                        handleChange(name, value);
                    }}
                    maxHeight={128}
                    maxWidth={128}
                    isSquare
                />
            </Field>
            <div className="size-lg-12">
                <ButtonWrapper alignment="right">
                    <ActionButton
                        text="Cancel"
                        onClick={handleCancel}
                        source="secondary"
                        size="small"
                    />
                    <ActionButton text="Confirm" type="submit" icon="check" size="small" />
                </ButtonWrapper>
            </div>
        </Form>
    </ModalOuter>
);

export default TemplateformModal;
