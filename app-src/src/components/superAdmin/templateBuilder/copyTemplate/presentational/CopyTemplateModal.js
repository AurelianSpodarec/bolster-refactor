import React from 'react';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Select from 'components/shared/generic/form/presentational/Select';
import Field from 'components/shared/generic/form/presentational/Field';

const CopyTemplateModal = ({
    hideModal,
    handleSubmit,
    companyOptions,
    companyID,
    templateOptions,
    templateUUID,
    handleChange
}) => (
    <ModalOuterContainer extraClasses="w-form">
        <BlockHeading title="Create template from existing" />
        <Form onSubmit={handleSubmit} className="generic-form">
            <Field name="Select a company" styles={{ minHeight: '133px' }}>
                <Select
                    search
                    name="companyID"
                    placeholder="-- select a company --"
                    options={companyOptions}
                    value={companyID}
                    onChange={handleChange}
                    required
                />
            </Field>
            <Field styles={{ minHeight: '133px' }}>
                {!!templateOptions && (
                    <Select
                        search
                        name="templateUUID"
                        placeholder="-- select a template --"
                        options={templateOptions}
                        value={templateUUID}
                        onChange={handleChange}
                        required
                    />
                )}
            </Field>
            <BlockButtonWrapper>
                <button className="button green">
                    <i className="fa fa-plus" /> Clone template
                </button>
                <button className="button" type="button" onClick={hideModal}>
                    Cancel
                </button>
            </BlockButtonWrapper>
        </Form>
    </ModalOuterContainer>
);

export default CopyTemplateModal;
