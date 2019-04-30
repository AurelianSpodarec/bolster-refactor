import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import postReport from 'actions/companyAdmin/reports/async/postReport';
import postCustomFilters from 'actions/companyAdmin/reports/async/postCustomFilters';
import removeFilterQuestions from 'actions/companyAdmin/reports/sync/removeFilterQuestions';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { SUCCESS_MODAL, ERROR_MODAL } from 'constants/shared/modalTypes';

import OutputSettings from '../presentational/OutputSettings';

class OutputSettingsContainer extends Component {
    render() {
        return <OutputSettings />;
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
                operativeIDs,
                pinIDs
            },
            fields,
            options: { showHidden, layout, sortBy },
            postReport
        } = this.props;

        let hierarchyType;
        let hierarchyID;

        if (siteID) {
            hierarchyType = 'site';
            hierarchyID = siteID;
        }
        if (buildingID) {
            hierarchyType = 'building';
            hierarchyID = buildingID;
        }
        if (floorID) {
            hierarchyType = 'floor';
            hierarchyID = floorID;
        }
        if (drawingID) {
            hierarchyType = 'drawing';
            hierarchyID = drawingID;
        }

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
            toDateInclusive: endDate,
            companyUserIDs: operativeIDs,
            serviceID,
            status: statusID || null,
            questionFilters,
            showHidden,
            layout,
            sortBy,
            pinIDs
        };

        postReport(postBody);
    };
}

const mapStateToProps = ({
    companyAdmin: {
        reportsReducer: { filters, fields, options, postSuccess, error, pinIDs }
    }
}) => ({
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
    showModal: (type, props) => dispatch(showModal(type, props))
});

const WithConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(OutputSettingsContainer);

export default withRouter(WithConnect);
