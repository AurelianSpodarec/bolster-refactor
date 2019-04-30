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

class OutputSettingsContainer extends Component {
    render() {
        return <OutputSettings handleSubmit={this.handleSubmit} />;
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
                status,
                reportHistories,
                fileType,
                includePinLocation,
                fromDateInclusive,
                toDateInclusive,
                companyUserIDs,
                pinIDs
            },
            fields,
            options: { showHidden, layout, sortBy },
            postReport,
            fieldErrors,
            showFieldErrors
        } = this.props;

        if (!isEmpty(fieldErrors)) {
            showFieldErrors();
            return;
        }

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
            reportHistories,
            fileType,
            includePinLocation,
            fromDateInclusive,
            toDateInclusive,
            companyUserIDs,
            serviceID,
            status: status || null,
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

export default withRouter(WithConnect);
