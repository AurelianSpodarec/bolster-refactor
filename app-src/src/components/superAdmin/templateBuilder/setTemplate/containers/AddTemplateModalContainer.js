import React from 'react';
import generateUuid from 'uuid/v1';

import TemplateFormModal from '../presentational/TemplateFormModal';
import {
    QUESTION_TYPE_NUMBERS,
    STANDARD_LABEL_FIELDS,
    LABEL_TYPES_NUMS,
    TRIM_LABEL_FIELDS
} from 'constants/shared/templateBuilder';
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
            setLabelFields,
            setTemplate,
            setQuestion,
            name,
            serviceID,
            labelType
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

        const labelFields =
            labelType + '' === LABEL_TYPES_NUMS.STANDARD + ''
                ? this.getStandardLabelFields(templateUUID)
                : this.getTrimLabelFields(templateUUID);

        setLabelFields(labelFields);
    };

    getStandardLabelFields = templateUUID => {
        const { 1: fieldOne, ...otherFields } = STANDARD_LABEL_FIELDS;
        const { company } = this.props;

        const prefilledFieldOne = {
            templateUUID,
            uuid: generateUuid(),
            key: fieldOne,
            config: {
                title: company.name,
                source: '',
                staticField: '',
                questionUUID: ''
            }
        };
        const otherFieldsArr = Object.values({ ...otherFields });
        return [
            prefilledFieldOne,
            ...this.generateLabelFields(otherFieldsArr, templateUUID)
        ];
    };

    getTrimLabelFields = templateUUID => {
        const { 1: fieldOne, ...otherFields } = TRIM_LABEL_FIELDS;
        const { company } = this.props;

        const prefilledFieldOne = {
            templateUUID,
            uuid: generateUuid(),
            key: fieldOne,
            config: {
                title: company.name,
                source: '',
                staticField: '',
                questionUUID: ''
            }
        };
        const otherFieldsArr = Object.values({ ...otherFields });
        return [
            prefilledFieldOne,
            ...this.generateLabelFields(otherFieldsArr, templateUUID)
        ];
    };

    generateLabelFields = (fields, templateUUID) => {
        return fields.map(field => ({
            templateUUID,
            uuid: generateUuid(),
            key: field,
            config: {
                title: '',
                source: '',
                staticField: '',
                questionUUID: ''
            }
        }));
    };
}

export default withTemplateFormLogic(TemplateFormModalContainer);
