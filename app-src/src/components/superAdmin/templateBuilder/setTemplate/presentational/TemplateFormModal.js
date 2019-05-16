import React from 'react';

import ModalOuter from 'components/shared/generic/modals/presentational/ModalOuter';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import LabelTypeRadioButtonsContainer from '../containers/LabelTypeRadioButtonsContainer';

const TemplateformModal = ({
    action,
    name,
    serviceOptions,
    selectedService,
    labelTypeOptions,
    selectedLabelType,
    handleChange,
    handleSubmit,
    handleCancel
}) => (
    <ModalOuter hideModal={handleCancel}>
        <BlockHeading title={`${action} template`} />
        <Form className="generic-form" onSubmit={handleSubmit}>
            <Field name="name" required>
                <TextInputContainer
                    name="name"
                    handleChange={handleChange}
                    value={name}
                    required
                />
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
            <Field name="Label type" required>
                <LabelTypeRadioButtonsContainer
                    name="labelType"
                    options={labelTypeOptions}
                    value={selectedLabelType}
                    handleChange={handleChange}
                />
            </Field>
            <BlockButtonWrapper>
                <button className="button green">
                    <i className="fa fa-plus" />
                    Set
                </button>
                <button className="button" onClick={handleCancel}>
                    Cancel
                </button>
            </BlockButtonWrapper>
        </Form>
    </ModalOuter>
);

export default TemplateformModal;
