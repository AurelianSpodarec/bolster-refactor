import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import generateUuid from 'uuid/v1';

import fetchAllServices from 'actions/superAdmin/services/async/fetchAllServices';
import setTemplate from 'actions/superAdmin/templateBuilder/sync/setTemplate';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';

import {
    STANDARD_LABEL_FIELDS,
    TRIM_LABEL_FIELDS,
    LABEL_STATIC_FIELDS_NUMS
} from 'constants/shared/templateBuilder';
import { convertArrToObj, convertEnumToDropdownOptions } from 'helpers/generic';
import {
    LABEL_TYPES,
    LABEL_TYPES_NUMS,
    LABEL_QUES_TYPES_NUMS
} from 'constants/companyAdmin/enums';
import setSection from 'actions/superAdmin/templateBuilder/sync/setSection';
import fetchCompanySubscription from 'actions/superAdmin/companies/async/fetchCompanySubscription';
import setQuestion from 'actions/superAdmin/templateBuilder/sync/setQuestion';
import setLabelFields from 'actions/superAdmin/templateBuilder/sync/setLabelFields';

export default function(WrappedComponent) {
    class WithTemplateFromLogic extends React.Component {
        state = {
            name: '',
            serviceID: '',
            labelType: '',
            labelTypeOptions: convertEnumToDropdownOptions(LABEL_TYPES),
            labelFields: {}
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
                    generateLabelFields={this.generateLabelFields}
                    setState={this.setState}
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

        generateLabelFields = (labelType, templateUUID) => {
            return labelType + '' === LABEL_TYPES_NUMS.STANDARD + ''
                ? this._getStandardLabelFields(templateUUID)
                : this._getTrimLabelFields(templateUUID);
        };

        _getStandardLabelFields = templateUUID => {
            const { 1: fieldOne, ...otherFields } = STANDARD_LABEL_FIELDS;
            const { STATIC } = LABEL_QUES_TYPES_NUMS;
            const { LOCATION_OWNER_COMPANY_NAME } = LABEL_STATIC_FIELDS_NUMS;

            const prefilledFieldOne = {
                templateUUID,
                uuid: generateUuid(),
                key: fieldOne,
                config: {
                    title: '',
                    source: STATIC,
                    staticField: LOCATION_OWNER_COMPANY_NAME,
                    questionUUID: ''
                }
            };
            const otherFieldsArr = Object.values({ ...otherFields });
            return [
                prefilledFieldOne,
                ...this._generateLabelFields(otherFieldsArr, templateUUID)
            ];
        };

        _getTrimLabelFields = templateUUID => {
            const { 1: fieldOne, ...otherFields } = TRIM_LABEL_FIELDS;

            const prefilledFieldOne = {
                templateUUID,
                uuid: generateUuid(),
                key: fieldOne,
                config: {
                    title: '',
                    source:
                        LABEL_STATIC_FIELDS_NUMS.LOCATION_OWNER_COMPANY_NAME,
                    staticField: '',
                    questionUUID: ''
                }
            };
            const otherFieldsArr = Object.values({ ...otherFields });
            return [
                prefilledFieldOne,
                ...this._generateLabelFields(otherFieldsArr, templateUUID)
            ];
        };

        _generateLabelFields = (fields, templateUUID) => {
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

    const mapStateToProps = (
        {
            superAdmin: {
                adminServicesReducer: { adminServices: services },
                companySubscriptionReducer: { subscriptions },
                companiesReducer: { companies }
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
            subscription: subscriptions[companyID] || {},
            company: companies[companyID] || {}
        };
    };

    const mapDispatchToProps = (dispatch, { companyID }) => ({
        hideModal: () => {
            dispatch(hideModal());
        },
        setTemplate: template => {
            dispatch(setTemplate(template));
        },
        setSection: section => {
            dispatch(setSection(section));
        },
        setQuestion: question => {
            dispatch(setQuestion(question));
        },
        setLabelFields: (labelFields, templateUUID) => {
            dispatch(setLabelFields(labelFields, templateUUID));
        },

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
