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
            handleChange
        } = this.props;

        return (
            <TemplateFormModal
                action="Edit"
                name={name}
                labelType={labelType}
                labelTypeOptions={labelTypeOptions}
                serviceOptions={serviceOptions}
                selectedService={selectedService}
                handleChange={handleChange}
                handleCancel={hideModal}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    componentDidMount = () => {
        const {
            updateState,
            template: { name, serviceID, labelType, statusOptions },
            fetchData
        } = this.props;
        fetchData();
        updateState({ name, serviceID, labelType, statusOptions });
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
