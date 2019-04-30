import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import postReport from 'actions/companyAdmin/reports/async/postReport';
import postCustomFilters from 'actions/companyAdmin/reports/async/postCustomFilters';
import removeFilterQuestions from 'actions/companyAdmin/reports/sync/removeFilterQuestions';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import OutputSettings from '../presentational/OutputSettings';
import { SUCCESS_MODAL, ERROR_MODAL } from 'constants/shared/modalTypes';

class OutputSettingsContainer extends Component {
    render() {
        return <OutputSettings />;
    }

    componentDidUpdate = prevProps => {
        const {
            filters: { siteID, buildingID, floorID, drawingID },
            removeFilterQuestions,
            postSuccess,
            error,
            showModal,
            hideModal,
            history
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
}

const mapStateToProps = ({
    companyAdmin: {
        sitesReducer,
        buildingsReducer,
        floorsReducer,
        drawingsReducer,
        reportsReducer: {
            filters,
            fields,
            options,
            postSuccess,
            error,
            selectedPins
        }
    }
}) => ({
    fields: Object.values(fields),
    sites: Object.values(sitesReducer.sites),
    sitesFilter: sitesReducer.filters,
    buildings: Object.values(buildingsReducer.buildings),
    floors: Object.values(floorsReducer.floors),
    drawings: Object.values(drawingsReducer),
    selectedPins,
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

const WithConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(OutputSettingsContainer);

export default withRouter(WithConnect);
