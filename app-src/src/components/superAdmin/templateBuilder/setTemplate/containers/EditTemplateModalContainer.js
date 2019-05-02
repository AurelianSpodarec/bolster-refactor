import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import setTemplate from 'actions/superAdmin/templateBuilder/sync/setTemplate';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import fetchAllServices from 'actions/superAdmin/services/async/fetchAllServices';
import { convertEnumToDropdownOptions, convertArrToObj } from 'helpers/generic';
import { LABEL_TYPES } from 'constants/companyAdmin/enums';

import TemplateFormModal from '../presentational/TemplateFormModal';
import fetchCompanySubscription from 'actions/superAdmin/companies/async/fetchCompanySubscription';
import withTemplateFormLogic from '../hocs/withTemplateFormLogic';

class EditTemplateModalContainer extends React.Component {
    state = {
        name: '',
        serviceID: '',
        labelType: '',
        labelTypeOptions: convertEnumToDropdownOptions(LABEL_TYPES)
    };

    render() {
        const {
            serviceID,
            labelType,
            labelTypeOptions,
            ...otherFields
        } = this.state;
        const serviceOptions = this._getSeviceOptions();

        return (
            <TemplateFormModal
                action="Edit"
                {...otherFields}
                selectedLabelType={labelTypeOptions[labelType]}
                labelTypeOptions={Object.values(labelTypeOptions)}
                serviceOptions={Object.values(serviceOptions)}
                selectedService={serviceOptions[serviceID]}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleCancel={this.handleCancel}
            />
        );
    }

    componentDidMount = () => {
        const {
            template: { name, serviceID, labelType },
            fetchData
        } = this.props;
        fetchData();
        this.setState({ name, serviceID, labelType });
    };

    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    };

    handleCancel = e => {
        e.preventDefault();
        const { hideModal } = this.props;
        hideModal();
    };

    handleSubmit = e => {
        e.preventDefault();
        const { template, setTemplate } = this.props;
        const { name, serviceID, labelType } = this.state;
        const updatedTemplate = {
            ...template,
            name,
            serviceID,
            labelType
        };

        setTemplate(updatedTemplate);
    };

    _getSeviceOptions = () => {
        const { services } = this.props;
        const options = services.map(({ id, name }) => ({
            value: id,
            text: name
        }));

        return convertArrToObj(options, 'value');
    };
}
export default withTemplateFormLogic(EditTemplateModalContainer);
