import React from 'react';

import ModalOuter from '../../../../shared/generic/modals/presentational/ModalOuter';
import Form from '../../../../shared/generic/form/containers/Form';
import Field from '../../../../shared/generic/form/presentational/Field';
import TextInputContainer from '../../../../shared/generic/form/containers/TextInputContainer';
import BlockHeadingWControls from '../../../../shared/generic/blockHeadingWControls/presentational/BlockHeadingWControls';
import BlockButtonWrapper from '../../../../shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';

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
        <BlockHeadingWControls title={`${action} template`} />
        <Form className="generic-form" onSubmit={handleSubmit}>
            <div className="size-lg-6">
                <Field name="name">
                    <TextInputContainer
                        name="name"
                        handleChange={handleChange}
                        value={name}
                        required
                    />
                </Field>
                <Field name="Service">
                    <DropdownContainer
                        name="serviceID"
                        placeholder="-- select a service --"
                        handleChange={handleChange}
                        options={serviceOptions}
                        selectedOption={selectedService}
                        required
                    />
                </Field>
                <Field name="Label type">
                    <DropdownContainer
                        name="labelType"
                        placeholder="-- select a label type --"
                        handleChange={handleChange}
                        options={labelTypeOptions}
                        selectedOption={selectedLabelType}
                        required
                    />
                </Field>
            </div>
            <BlockButtonWrapper>
                <button className="button ">
                    <i className="fa fa-plus" />
                    Set
                </button>
                <button className="button" onClick={handleCancel}>
                    <i className="fa fa-times" /> Cancel
                </button>
            </BlockButtonWrapper>
        </Form>
    </ModalOuter>
);

export default TemplateformModal;
