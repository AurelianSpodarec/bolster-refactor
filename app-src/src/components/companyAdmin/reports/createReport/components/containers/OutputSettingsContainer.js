import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import postReport from 'actions/companyAdmin/reports/async/postReport';
import postCustomFilters from 'actions/companyAdmin/reports/async/postCustomFilters';
import removeFilterQuestions from 'actions/companyAdmin/reports/sync/removeFilterQuestions';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { SUCCESS_MODAL, ERROR_MODAL } from 'constants/shared/modalTypes';

import showFieldErrors from 'actions/shared/generic/fieldErrors/sync/showFieldErrors';
import { isEmpty, convertEnumToDropdownOptions } from 'helpers/generic';
import withUpdateOnChange from '../hocs/withUpdateOnChange';
import {
    SORT_BY_OPTIONS_TEXT,
    LAYOUT_OPTIONS_TEXT
} from 'constants/companyAdmin/enums';
import updateFilterOption from 'actions/companyAdmin/reports/sync/updateFilterOption';
import OutputSettings from '../presentational/OutputSettings';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';

class OutputSettingsContainer extends Component {
    render() {
        const {
            filters: {
                includePinLocation,
                isPDFGeneration,
                isCSVGeneration,
                isFloorplanGeneration
            },
            options: { showHidden, sortBy, layout }
        } = this.props;

        const sortByOptions = convertEnumToDropdownOptions(
            SORT_BY_OPTIONS_TEXT
        );
        const layoutOptions = convertEnumToDropdownOptions(LAYOUT_OPTIONS_TEXT);

        return (
            <OutputSettings
                includePinLocation={includePinLocation}
                isCSVGeneration={isCSVGeneration}
                isFloorplanGeneration={isFloorplanGeneration}
                isPDFGeneration={isPDFGeneration}
                sortByOptions={Object.values(sortByOptions)}
                selectSortBy={sortByOptions[sortBy]}
                layoutOptions={Object.values(layoutOptions)}
                selectedLayout={layoutOptions[layout]}
                showHidden={showHidden}
                handleFilterChange={this.handleFilterChange}
                handleOptionChange={this.handleOptionChange}
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

    handleFilterChange = (name, value) => {
        const { handleChange } = this.props;

        handleChange(name, value);
    };

    handleOptionChange = (name, value) => {
        const { updateFilterOption } = this.props;

        updateFilterOption(name, value);
    };

    handleSubmit = () => {
        const {
            getPostBody,
            postReport,
            fieldErrors,
            showFieldErrors,
            addFieldError,
            removeFieldError
        } = this.props;

        const body = getPostBody();
        const {
            isPDFGeneration,
            isCSVGeneration,
            isFloorplanGeneration
        } = body;
        if (!isPDFGeneration && !isCSVGeneration && !isFloorplanGeneration) {
            addFieldError(
                'isFloorplanGeneration',
                'Must select at least one option'
            );
            showFieldErrors();
            return;
        } else {
            removeFieldError('isFloorplanGeneration');
        }
        if (!isEmpty(fieldErrors)) {
            showFieldErrors();
        } else {
            postReport(getPostBody());
        }
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
    updateFilterOption: (key, value) =>
        dispatch(updateFilterOption(key, value)),
    postReport: postBody => dispatch(postReport(postBody)),
    postCustomFilters: postBody => dispatch(postCustomFilters(postBody)),
    removeFilterQuestions: () => dispatch(removeFilterQuestions()),
    showModal: (type, props) => dispatch(showModal(type, props)),
    showFieldErrors: () => dispatch(showFieldErrors()),
    addFieldError: (name, err) => dispatch(addFieldError(name, err)),
    removeFieldError: name => dispatch(removeFieldError(name))
});

const WithConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(OutputSettingsContainer);

const WithUpdateOnChange = withUpdateOnChange(WithConnect);

export default withRouter(WithUpdateOnChange);
