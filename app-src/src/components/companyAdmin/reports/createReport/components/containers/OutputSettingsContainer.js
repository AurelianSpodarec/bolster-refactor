import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import postReport from 'actions/companyAdmin/reports/async/postReport';
import postCustomFilters from 'actions/companyAdmin/reports/async/postCustomFilters';
import removeFilterQuestions from 'actions/companyAdmin/reports/sync/removeFilterQuestions';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import {
    SUCCESS_MODAL,
    ERROR_MODAL,
    SELECT_PIN_SCALE
} from 'constants/shared/modalTypes';
import resetFilterOptions from 'actions/companyAdmin/reports/sync/resetFilterOptions';

import showFieldErrors from 'actions/shared/generic/fieldErrors/sync/showFieldErrors';
import { isEmpty, convertEnumToDropdownOptions } from 'helpers/generic';
import withUpdateOnChange from '../hocs/withUpdateOnChange';
import { SORT_BY_OPTIONS_TEXT } from 'constants/companyAdmin/enums';
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
                isFloorplanGeneration,
                includeFloorplan
            },
            options: { showHidden, sortBy }
        } = this.props;

        const sortByOptions = convertEnumToDropdownOptions(
            SORT_BY_OPTIONS_TEXT
        );

        return (
            <OutputSettings
                includePinLocation={includePinLocation}
                isCSVGeneration={isCSVGeneration}
                isFloorplanGeneration={isFloorplanGeneration}
                isPDFGeneration={isPDFGeneration}
                includeFloorplan={includeFloorplan}
                sortByOptions={Object.values(sortByOptions)}
                selectSortBy={sortByOptions[sortBy]}
                showHidden={showHidden}
                handleFilterChange={this.handleFilterChange}
                handleOptionChange={this.handleOptionChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    componentDidMount = () => {
        const {
            filters: {
                isPDFGeneration,
                isCSVGeneration,
                isFloorplanGeneration
            },
            addFieldError
        } = this.props;
        if (!isPDFGeneration && !isCSVGeneration && !isFloorplanGeneration) {
            addFieldError(
                'isFloorplanGeneration',
                'Must select at least one option'
            );
        }
    };
    componentWillUnmount = () => this.props.resetFilterOptions();

    componentDidUpdate = prevProps => {
        const {
            postSuccess,
            error,
            showModal,
            history,
            filters: {
                isPDFGeneration,
                isCSVGeneration,
                isFloorplanGeneration
            },
            addFieldError,
            removeFieldError
        } = this.props;

        // error handling for report type
        const modeSelected = !!(
            isPDFGeneration ||
            isCSVGeneration ||
            isFloorplanGeneration
        );
        const prevModeSelected = !!(
            prevProps.filters.isPDFGeneration ||
            prevProps.filters.isCSVGeneration ||
            prevProps.filters.isFloorplanGeneration
        );
        if (!modeSelected && prevModeSelected) {
            addFieldError(
                'isFloorplanGeneration',
                'Must select at least one option'
            );
        } else if (modeSelected && !prevModeSelected) {
            removeFieldError('isFloorplanGeneration');
        }

        if (postSuccess && !prevProps.postSuccess) {
            showModal(SUCCESS_MODAL, {
                message: 'Your report is now being generated'
            });

            return history.push('/company/tools/company-reports');
        }
        if (error && !prevProps.error) {
            showModal(ERROR_MODAL, {
                title: error.title || 'Error',
                message: error.message
            });
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
            postReport,
            fieldErrors,
            showFieldErrors,
            filters: {
                isFloorplanGeneration,
                includeFloorplan,
                isPDFGeneration,
                drawingID
            },
            showModal,
            drawings
        } = this.props;

        if (!isEmpty(fieldErrors)) showFieldErrors();
        else if (
            Object.values(drawings).filter(
                drawing => +drawing.id === +drawingID
            ).length < 1
        ) {
            showModal(ERROR_MODAL, {
                title: 'Error',
                message:
                    'No drawings available to report, please add at least one drawing.'
            });
        } else if (
            isFloorplanGeneration ||
            (isPDFGeneration && includeFloorplan)
        ) {
            const drawingForPinScale = this._getDrawingForPinScale();
            showModal(SELECT_PIN_SCALE, {
                drawing: drawingForPinScale,
                getPostBody,
                postReport
            });
        } else postReport(getPostBody());
    };

    _getDrawingForPinScale = () => {
        const {
            drawings,
            filters: { siteID, buildingID, floorID, drawingID }
        } = this.props;

        let availableDrawings = Object.values(drawings);

        // uses the url to figure out which hierarchy the report is being generated on and find an appropriate drawing for the pin scale modal
        if (siteID) {
            availableDrawings = availableDrawings.filter(
                drawing => +drawing.siteID === +siteID
            );
        }
        if (buildingID) {
            availableDrawings = availableDrawings.filter(
                drawing => +drawing.buildingID === +buildingID
            );
        }
        if (floorID) {
            availableDrawings = availableDrawings.filter(
                drawing => +drawing.floorID === +floorID
            );
        }
        if (drawingID) {
            availableDrawings = availableDrawings.filter(
                drawing => +drawing.id === +drawingID
            );
        }
        return availableDrawings[0];
    };
}

const mapStateToProps = ({
    companyAdmin: {
        sitesReducer: { sites },
        buildingsReducer: { buildings },
        floorsReducer: { floors },
        drawingsReducer: { drawings },

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
    sites,
    buildings,
    floors,
    drawings,
    error
});

const mapDispatchToProps = {
    updateFilterOption,
    postReport,
    postCustomFilters,
    removeFilterQuestions,
    showModal,
    showFieldErrors,
    addFieldError,
    removeFieldError,
    resetFilterOptions
};

const WithConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(OutputSettingsContainer);

const WithUpdateOnChange = withUpdateOnChange(WithConnect);

export default withRouter(WithUpdateOnChange);
