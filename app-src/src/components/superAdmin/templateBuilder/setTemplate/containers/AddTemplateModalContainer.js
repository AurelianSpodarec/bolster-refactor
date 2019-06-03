import React from 'react';
import generateUuid from 'uuid/v1';

import TemplateFormModal from '../presentational/TemplateFormModal';
import { QUESTION_TYPE_NUMBERS } from 'constants/shared/templateBuilder';
import withTemplateFormLogic from '../hocs/withTemplateFormLogic';

class TemplateFormModalContainer extends React.Component {
    render() {
        const {
            name,
            labelType,
            labelTypeOptions,
            serviceOptions,
            selectedService,
            handleCancel,
            handleChange,
            statusDropdownOptions,
            statusOptions
        } = this.props;

        return (
            <TemplateFormModal
                action="Add"
                name={name}
                labelTypeOptions={labelTypeOptions}
                labelType={labelType}
                serviceOptions={serviceOptions}
                selectedService={selectedService}
                statusDropdownOptions={statusDropdownOptions}
                statusOptions={statusOptions}
                handleChange={handleChange}
                handleCancel={handleCancel}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    componentDidMount = () => {
        const { fetchData } = this.props;
        fetchData();
    };

    handleSubmit = e => {
        e.preventDefault();
        const {
            generateLabelFields,
            companyID,
            uuid: templateUUID,
            hideModal,
            setTemplate,
            setSection,
            setQuestion,
            setLabelFields,
            setStatusOptions,
            name,
            serviceID,
            labelType,
            statusOptions
        } = this.props;

        const template = {
            companyID,
            serviceID,
            labelType,
            uuid: templateUUID,
            name
        };
        const sectionUUID = generateUuid();
        const section1 = {
            uuid: sectionUUID,
            templateUUID,
            name: 'Section 1',
            sort: 1
        };

        const statusQuestion = {
            // STATUS
            uuid: generateUuid(),
            fields: {},
            name: 'Status',
            questionType: QUESTION_TYPE_NUMBERS.STATUS,
            sectionUUID,
            templateUUID,
            sort: 1
        };

        const labelFields = generateLabelFields(labelType, templateUUID);

        setStatusOptions(statusOptions);
        setTemplate(template, section1);
        setSection(section1);
        setQuestion(statusQuestion);
        setLabelFields(labelFields, templateUUID);
        hideModal();
    };
}

export default withTemplateFormLogic(TemplateFormModalContainer);
