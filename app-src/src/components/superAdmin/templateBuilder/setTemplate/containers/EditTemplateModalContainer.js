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
            selectedLabelType,
            handleCancel,
            handleChange
        } = this.props;
        return (
            <TemplateFormModal
                action="Edit"
                name={name}
                selectedLabelType={selectedLabelType}
                labelTypeOptions={labelTypeOptions}
                labelType={labelType}
                serviceOptions={serviceOptions}
                selectedService={selectedService}
                handleChange={handleChange}
                handleCancel={handleCancel}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    componentDidMount = () => {
        const {
            updateState,
            template: { name, serviceID, labelType },
            fetchData
        } = this.props;
        fetchData();
        updateState({ name, serviceID, labelType });
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
            labelType
        } = this.props;

        const updatedTemplate = {
            ...template,
            name,
            serviceID,
            labelType
        };

        setTemplate(updatedTemplate);

        if (labelType !== template.labelType) {
            const newLabelFields = generateLabelFields(
                labelType,
                updatedTemplate.uuid
            );
            setLabelFields(newLabelFields, updatedTemplate.uuid);
        }

        hideModal();
    };
}
export default withTemplateFormLogic(EditTemplateModalContainer);
