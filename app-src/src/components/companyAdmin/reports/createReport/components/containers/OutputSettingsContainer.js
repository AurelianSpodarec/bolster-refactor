import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import postReport from 'actions/companyAdmin/reports/async/postReport';
import postCustomFilters from 'actions/companyAdmin/reports/async/postCustomFilters';
import removeFilterQuestions from 'actions/companyAdmin/reports/sync/removeFilterQuestions';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { SUCCESS_MODAL, ERROR_MODAL } from 'constants/shared/modalTypes';

import OutputSettings from '../presentational/OutputSettings';
import showFieldErrors from 'actions/shared/generic/fieldErrors/sync/showFieldErrors';
import { isEmpty } from 'helpers/generic';
import withUpdateOnChange from '../hocs/withUpdateOnChange';
// import { REPORT_FORMATS } from 'constants/companyAdmin/enums';

class OutputSettingsContainer extends Component {
    render() {
        // const {
        //     filters: { includePinLocation, fileType }
        // } = this.props;

        // const reportFormatOptions = convertEnumToDropdownOptions(
        //     REPORT_FORMATS
        // );

        return (
            <OutputSettings
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const { postSuccess, error, showModal, history } = this.props;

        if (postSuccess && !prevProps.postSuccess) {
            showModal(SUCCESS_MODAL, {
                message: 'Your report is now being generated'
            });

            return history.push('/company/tools/company-reports');
        }
        if (error && !prevProps.error) {
            showModal(ERROR_MODAL, {
                title: 'Error',
                message: error.message
            });
        }
    };

    handleChange = ({ target: { value, name, checked, type } }) => {
        const { handleChange } = this.props;

        handleChange(name, type === 'checkbox' ? checked : value);
    };

    handleSubmit = () => {
        const {
            getPostBody,
            postReport,
            fieldErrors,
            showFieldErrors
        } = this.props;

        if (!isEmpty(fieldErrors)) {
            showFieldErrors();
            return;
        }

        postReport(getPostBody());
    };
}

const mapStateToProps = ({
    companyAdmin: {
        reportsReducer: { filters, fields, options, postSuccess, error, pinIDs }
    },
    shared: {
        fieldErrorsReducer: { fieldErrors }
    }
}) => ({
    fieldErrors,
    fields: Object.values(fields),
    pinIDs,
    filters,
    options,
    postSuccess,
    error
});

const mapDispatchToProps = dispatch => ({
    postReport: postBody => dispatch(postReport(postBody)),
    postCustomFilters: postBody => dispatch(postCustomFilters(postBody)),
    removeFilterQuestions: () => dispatch(removeFilterQuestions()),
    showModal: (type, props) => dispatch(showModal(type, props)),
    showFieldErrors: () => dispatch(showFieldErrors())
});

const WithConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(OutputSettingsContainer);

const WithUpdateOnChange = withUpdateOnChange(WithConnect);

export default withRouter(WithUpdateOnChange);
