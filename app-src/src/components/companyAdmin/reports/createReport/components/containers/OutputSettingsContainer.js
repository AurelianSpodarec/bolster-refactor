import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import postReport from 'actions/companyAdmin/reports/async/postReport';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import {
    SUCCESS_MODAL,
    ERROR_MODAL,
    SELECT_PIN_SCALE,
    LOADING_DATA,
} from 'constants/shared/modalTypes';

import showFieldErrors from 'actions/shared/generic/fieldErrors/sync/showFieldErrors';
import { isEmpty, convertEnumToDropdownOptions } from 'helpers/generic';
import withUpdateOnChange from '../hocs/withUpdateOnChange';
import { SORT_BY_OPTIONS_TEXT } from 'constants/companyAdmin/enums';
import updateFilterOption from 'actions/companyAdmin/reports/sync/updateFilterOption';
import OutputSettings from '../presentational/OutputSettings';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import { POST_REPORT_SUCCESS } from 'constants/actionTypes/reports';
import { showOAndMTsAndCsModal } from 'actions/shared/generic/modals/sync/showOAndMTsAndCsModal';
import resetFilterOptions from 'actions/companyAdmin/reports/sync/resetFilterOptions';

class OutputSettingsContainer extends Component {
    render() {
        const {
            filters: {
                includePinLocation,
                isPDFGeneration,
                isCSVGeneration,
                isFloorplanGeneration,
                includeFloorplan,
                isOAndMManualGeneration,
            },
            options: { showHidden, sortBy },
        } = this.props;

        const sortByOptions = convertEnumToDropdownOptions(SORT_BY_OPTIONS_TEXT);

        return (
            <OutputSettings
                includePinLocation={includePinLocation}
                isCSVGeneration={isCSVGeneration}
                isFloorplanGeneration={isFloorplanGeneration}
                isPDFGeneration={isPDFGeneration}
                includeFloorplan={includeFloorplan}
                isOAndMManualGeneration={isOAndMManualGeneration}
                sortByOptions={Object.values(sortByOptions)}
                selectSortBy={sortByOptions[sortBy]}
                showHidden={showHidden}
                handleFilterChange={this.handleFilterChange}
                handleOptionChange={this.handleOptionChange}
                handleSubmit={this.handleSubmit}
                handleShowOandMModal={this.handleShowOandMModal}
            />
        );
    }

    componentDidMount = () => {
        const {
            filters: {
                isPDFGeneration,
                isCSVGeneration,
                isFloorplanGeneration,
                isOAndMManualGeneration,
            },
            addFieldError,
        } = this.props;
        if (
            !isPDFGeneration &&
            !isCSVGeneration &&
            !isFloorplanGeneration &&
            !isOAndMManualGeneration
        ) {
            addFieldError('isOAndMManualGeneration', 'Must select at least one option');
        }
    };

    componentDidUpdate = prevProps => {
        const {
            filters: {
                isPDFGeneration,
                isCSVGeneration,
                isFloorplanGeneration,
                isOAndMManualGeneration,
            },
            addFieldError,
            removeFieldError,
        } = this.props;

        // error handling for report type
        const modeSelected = !!(
            isPDFGeneration ||
            isCSVGeneration ||
            isFloorplanGeneration ||
            isOAndMManualGeneration
        );
        const prevModeSelected = !!(
            prevProps.filters.isPDFGeneration ||
            prevProps.filters.isCSVGeneration ||
            prevProps.filters.isFloorplanGeneration ||
            prevProps.filters.isOAndMManualGeneration
        );
        if (!modeSelected && prevModeSelected) {
            addFieldError('isOAndMManualGeneration', 'Must select at least one option');
        } else if (modeSelected && !prevModeSelected) {
            removeFieldError('isOAndMManualGeneration');
        }
    };

    handleFilterChange = (name, value) => {
        this.props.handleChange(name, value);
    };

    handleOptionChange = (name, value) => {
        this.props.updateFilterOption(name, value);
    };

    handleSubmit = () => {
        const {
            getPostBody,
            fieldErrors,
            showFieldErrors,
            filters: { isFloorplanGeneration, includeFloorplan, isPDFGeneration },
            showModal,
        } = this.props;

        if (!isEmpty(fieldErrors)) showFieldErrors();
        else if (isFloorplanGeneration || (isPDFGeneration && includeFloorplan)) {
            const drawingForPinScale = this._getDrawingForPinScale();

            if (!drawingForPinScale) {
                showModal(ERROR_MODAL, {
                    title: 'No drawings',
                    message: 'No drawings were found for your selection. Please edit your filters.',
                });

                return;
            }

            showModal(SELECT_PIN_SCALE, {
                drawing: drawingForPinScale,
                getPostBody,
                postReport: this._postReport,
            });
        } else {
            this._postReport(getPostBody());
        }
    };

    _postReport = postBody => {
        const { postReport, showModal, history, error, resetFilterOptions } = this.props;

        showModal(LOADING_DATA, { message: 'Generating report...' });
        postReport(postBody).then((action = {}) => {
            if (action.type === POST_REPORT_SUCCESS) {
                showModal(SUCCESS_MODAL, {
                    message: 'Your report is now being generated',
                });

                resetFilterOptions();

                history.push('/company/tools/company-reports');
                return;
            }
            showModal(ERROR_MODAL, {
                title: 'Error',
                message:
                    error ||
                    action.error ||
                    'There was an error with your request. Please try again later.',
            });
        });
    };

    _getDrawingForPinScale = () => {
        const {
            drawings,
            filters: { siteID, buildingID, floorID, drawingID },
        } = this.props;

        let availableDrawings = Object.values(drawings);

        // uses the url to figure out which hierarchy the report is being generated on
        // and find an appropriate drawing for the pin scale modal
        if (siteID) {
            availableDrawings = availableDrawings.filter(drawing => +drawing.siteID === +siteID);
        }
        if (buildingID) {
            availableDrawings = availableDrawings.filter(
                drawing => +drawing.buildingID === +buildingID,
            );
        }
        if (floorID) {
            availableDrawings = availableDrawings.filter(drawing => +drawing.floorID === +floorID);
        }
        if (drawingID) {
            availableDrawings = availableDrawings.filter(drawing => +drawing.id === +drawingID);
        }

        return availableDrawings[0];
    };

    handleShowOandMModal = () => this.props.showOAndMTsAndCsModal('create report');
}

const mapStateToProps = ({
    companyAdmin: {
        drawingsReducer: { drawings },
        reportsReducer: { filters, options, error },
    },
    shared: {
        fieldErrorsReducer: { fieldErrors },
    },
}) => ({
    fieldErrors,
    filters,
    options,
    drawings,
    error,
});

const mapDispatchToProps = {
    updateFilterOption,
    postReport,
    showModal,
    showFieldErrors,
    addFieldError,
    removeFieldError,
    showOAndMTsAndCsModal,
    resetFilterOptions,
};
const WithConnect = connect(mapStateToProps, mapDispatchToProps)(OutputSettingsContainer);

const WithUpdateOnChange = withUpdateOnChange(WithConnect);

export default withRouter(WithUpdateOnChange);
