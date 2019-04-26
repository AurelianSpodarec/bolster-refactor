import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { FURTHER_FILTRATION } from 'constants/companyAdmin/enums';
import { convertEnumToDropdownOptions } from 'helpers/generic';
import PinFiltersForm from '../presentational/PinFiltersForm';

import postReport from 'actions/companyAdmin/reports/async/postReport';
import postCustomFilters from 'actions/companyAdmin/reports/async/postCustomFilters';
import removeFilterQuestions from 'actions/companyAdmin/reports/sync/removeFilterQuestions';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { SUCCESS_MODAL, ERROR_MODAL } from 'constants/shared/modalTypes';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

export class PinFiltersFormContainer extends Component {
    state = {
        filterOption: 0
    };

    render() {
        const { filterOption } = this.state;
        const { drawingID } = this.props.filters;

        const furtherFiltrationOptions = convertEnumToDropdownOptions(
            FURTHER_FILTRATION
        );

        const furtherFiltrationOptionsArr = Object.values(
            furtherFiltrationOptions
        ).filter(({ text }) => drawingID || text !== 'Pin Selection');

        return (
            <PinFiltersForm
                furtherFiltrationOptions={furtherFiltrationOptionsArr}
                selectedfurtherFiltration={
                    furtherFiltrationOptions[filterOption]
                }
                handleFurtherFiltrationChange={
                    this.handleFurtherFiltrationChange
                }
                filterOption={filterOption}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const {
            filters: { siteID, buildingID, floorID, drawingID },
            removeFilterQuestions,
            postSuccess,
            error,
            showModal,
            match: { history }
        } = this.props;

        // reset further filters if site info changes
        if (
            siteID !== prevProps.filters.siteID ||
            buildingID !== prevProps.filters.buildingID ||
            floorID !== prevProps.filters.floorID ||
            drawingID !== prevProps.filters.drawingID
        ) {
            this.setState({ filterOption: 0 });
            removeFilterQuestions();
        }

        if (postSuccess && !prevProps.postSuccess) {
            showModal(SUCCESS_MODAL, {
                hideModal: () => {
                    hideModal();
                    history.push('/company/tools/company-reports');
                },
                message: '##Your report is now being generated##'
            });
            if (error && !prevProps.error) {
                showModal(ERROR_MODAL, {
                    hideModal,
                    title: 'Error',
                    message:
                        error.message ||
                        '##There was an error processing your request, please try again later.##'
                });
            }
        }
    };

    handleFurtherFiltrationChange = ({ target: { value, name } }) => {
        this.setState({ [name]: value });
    };

    handleSubmit = () => {
        const {
            filters: {
                siteID,
                buildingID,
                floorID,
                drawingID,
                serviceID,
                statusID,
                numberOfHistoriesID,
                reportFormatID,
                includeLocationDrawing,
                startDate,
                endDate,
                operativeIDs
            },
            fields,
            options: { showHidden, layout, sortBy },
            postReport
        } = this.props;
        const hierarchyType = drawingID
            ? 'drawing'
            : floorID
            ? 'floor'
            : buildingID
            ? 'building'
            : 'site';
        const hierarchyID = drawingID
            ? drawingID
            : floorID
            ? floorID
            : buildingID
            ? buildingID
            : siteID;

        const questionFilters = fields.map(
            ({ selectedQuestions, questionValues }) => ({
                questionGroupKeys: selectedQuestions,
                values: Object.values(questionValues).map(({ value }) => value)
            })
        );

        const postBody = {
            hierarchyType,
            hierarchyID,
            reportHistories: numberOfHistoriesID,
            fileType: reportFormatID,
            includePinLocation: includeLocationDrawing,
            fromDateInclusive: startDate,
            ToDateInclusive: endDate,
            companyUserIDs: operativeIDs,
            serviceID,
            status: statusID || null,
            questionFilters,
            showHidden,
            layout,
            sortBy
        };

        postReport(postBody);
    };
}

const mapStateToProps = ({
    companyAdmin: {
        sitesReducer,
        buildingsReducer,
        floorsReducer,
        drawingsReducer,
        reportsReducer: { filters, fields, options, postSuccess, error }
    }
}) => ({
    fields: Object.values(fields),
    sites: Object.values(sitesReducer.sites),
    sitesFilter: sitesReducer.filters,
    buildings: Object.values(buildingsReducer.buildings),
    floors: Object.values(floorsReducer.floors),
    drawings: Object.values(drawingsReducer),
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
    hideModal: () => dispatch(hideModal())
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(PinFiltersFormContainer)
);
