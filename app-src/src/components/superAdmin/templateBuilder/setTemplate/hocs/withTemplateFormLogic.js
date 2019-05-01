import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchAllServices from 'actions/superAdmin/services/async/fetchAllServices';
import setTemplate from 'actions/superAdmin/templateBuilder/sync/setTemplate';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';

import { convertArrToObj, convertEnumToDropdownOptions } from 'helpers/generic';
import { LABEL_TYPES } from 'constants/companyAdmin/enums';
import setSection from 'actions/superAdmin/templateBuilder/sync/setSection';
import fetchCompanySubscription from 'actions/superAdmin/companies/async/fetchCompanySubscription';
import setQuestion from 'actions/superAdmin/templateBuilder/sync/setQuestion';

export default function(WrappedComponent) {
    class WithTemplateFromLogic extends React.Component {
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
                <WrappedComponent
                    {...this.props}
                    {...otherFields}
                    labelType={labelType}
                    serviceID={serviceID}
                    selectedLabelType={labelTypeOptions[labelType]}
                    labelTypeOptions={Object.values(labelTypeOptions)}
                    serviceOptions={Object.values(serviceOptions)}
                    selectedService={serviceOptions[serviceID]}
                    handleChange={this.handleChange}
                    handleCancel={this.handleCancel}
                />
            );
        }

        handleChange = ({ target: { name, value } }) => {
            this.setState({ [name]: value });
        };

        handleCancel = e => {
            e.preventDefault();
            const { history, hideModal } = this.props;
            history.goBack();
            hideModal();
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
                adminServicesReducer: { adminServices: services },
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
    )(WithTemplateFromLogic);

    return withRouter(WithConnect);
}
