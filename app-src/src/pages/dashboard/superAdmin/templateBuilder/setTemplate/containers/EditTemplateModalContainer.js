import React from 'react';

import TemplateFormModal from '../presentational/TemplateFormModal';
import withTemplateFormLogic from '../hocs/withTemplateFormLogic';

class EditTemplateModalContainer extends React.Component {
    render() {
        const {
            name,
            labelType,
            labelTypeOptions,
            serviceOptions,
            selectedService,
            hideModal,
            handleChange,
            statusDropdownOptions,
            statusOptions,
            reportLayout,
            reportLayoutOptions,
            pinImageS3Key,
        } = this.props;

        return (
            <TemplateFormModal
                action="Edit"
                name={name}
                labelType={labelType}
                labelTypeOptions={labelTypeOptions}
                serviceOptions={serviceOptions}
                selectedService={selectedService}
                statusDropdownOptions={statusDropdownOptions}
                statusOptions={statusOptions}
                reportLayout={reportLayout}
                reportLayoutOptions={reportLayoutOptions}
                handleChange={handleChange}
                handleCancel={hideModal}
                handleSubmit={this.handleSubmit}
                pinImageS3Key={pinImageS3Key}
            />
        );
    }

    componentDidMount = () => {
        const {
            updateState,
            template: { name, serviceID, labelType, statusOptions, reportLayout, pinImageS3Key },
            fetchData,
        } = this.props;
        fetchData();

        updateState({
            name,
            serviceID,
            labelType,
            statusOptions,
            reportLayout,
            pinImageS3Key,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const {
            generateLabelFields,
            setTemplate,
            setLabelFields,
            hideModal,
            template,
            name,
            serviceID,
            labelType,
            statusOptions,
            reportLayout,
            pinImageS3Key,
        } = this.props;

        const updatedTemplate = {
            ...template,
            name,
            serviceID,
            labelType,
            statusOptions,
            reportLayout,
            pinImageS3Key,
        };

        setTemplate(updatedTemplate);

        if (labelType !== template.labelType) {
            const newLabelFields = generateLabelFields(labelType, updatedTemplate.uuid);
            setLabelFields(newLabelFields, updatedTemplate.uuid);
        }

        hideModal();
    };
}

export default withTemplateFormLogic(EditTemplateModalContainer);
