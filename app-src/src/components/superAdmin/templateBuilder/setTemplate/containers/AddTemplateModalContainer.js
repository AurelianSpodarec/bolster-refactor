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
            selectedLabelType,
            handleCancel,
            handleChange
        } = this.props;

        return (
            <TemplateFormModal
                name={name}
                selectedLabelType={selectedLabelType}
                labelTypeOptions={labelTypeOptions}
                labelType={labelType}
                serviceOptions={serviceOptions}
                selectedService={selectedService}
                action="Add"
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
            companyID,
            uuid: templateUUID,
            setTemplate,
            setQuestion,
            name,
            serviceID,
            labelType
        } = this.props;
        console.log(this.props);
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

        setTemplate(template, section1);
        setQuestion({
            // STATUS
            uuid: generateUuid(),
            fields: {},
            name: 'Status',
            questionType: QUESTION_TYPE_NUMBERS.STATUS,
            sectionUUID,
            templateUUID,
            sort: 1
        });
    };
}

export default withTemplateFormLogic(TemplateFormModalContainer);
