import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import generateUuid from 'uuid/v1';

import fetchAllServices from 'actions/superAdmin/services/async/fetchAllServices';
import setTemplate from 'actions/superAdmin/templateBuilder/sync/setTemplate';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';

import TemplateFormModal from '../presentational/TemplateFormModal';
import { convertArrToObj, convertEnumToDropdownOptions } from 'helpers/generic';
import { LABEL_TYPES } from 'constants/companyAdmin/enums';
import setSection from 'actions/superAdmin/templateBuilder/sync/setSection';
import fetchCompanySubscription from 'actions/superAdmin/companies/async/fetchCompanySubscription';
import setQuestion from 'actions/superAdmin/templateBuilder/sync/setQuestion';
import { QUESTION_TYPE_NUMBERS } from 'constants/shared/templateBuilder';

class TemplateFormModalContainer extends React.Component {
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
                {...otherFields}
                selectedLabelType={labelTypeOptions[labelType]}
                labelTypeOptions={Object.values(labelTypeOptions)}
                serviceOptions={Object.values(serviceOptions)}
                selectedService={serviceOptions[serviceID]}
                action="Add"
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleCancel={this.handleCancel}
            />
        );
    }

    componentDidMount = () => {
        const { fetchData } = this.props;
        fetchData();
    };

    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    };

    handleCancel = e => {
        e.preventDefault();
        const { history, hideModal } = this.props;
        history.goBack();
        hideModal();
    };

    handleSubmit = e => {
        e.preventDefault();
        const { companyID, uuid, setTemplate, setQuestion } = this.props;
        const { name, serviceID, labelType } = this.state;
        const template = {
            companyID,
            serviceID,
            labelType,
            uuid,
            name
        };
        const sectionUUID = generateUuid();
        const section1 = {
            uuid: sectionUUID,
            templateUUID: uuid,
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
            sectionUUID
        });
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

const mapStateToProps = (
    {
        superAdmin: {
            servicesReducer: { services },
            companySubscriptionReducer: { subscriptions }
        }
    },
    { companyID }
) => {
    const subscription = subscriptions[companyID] || {};
    const { serviceIDs = [] } = subscription;
    return {
        services: Object.values(services).filter(({ id }) =>
            serviceIDs.includes(id)
        ),
        subscription: subscriptions[companyID] || {}
    };
};

const mapDispatchToProps = (dispatch, { companyID }) => ({
    hideModal: () => dispatch(hideModal()),

    setTemplate: (template, section1) => {
        dispatch(setTemplate(template));
        dispatch(setSection(section1));
        dispatch(hideModal());
    },
    setQuestion: question => dispatch(setQuestion(question)),

    fetchData: () => {
        dispatch(fetchAllServices());
        dispatch(fetchCompanySubscription(companyID));
    }
});

const WithConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateFormModalContainer);

export default withRouter(WithConnect);
