import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectPinScaleModal from '../presentational/SelectPinScaleModal';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import clientUpdateReportFilter from 'actions/client/reports/create/sync/clientUpdateReportFilter';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

class SelectPinScaleModalContainer extends Component {
    render() {
        const {
            drawing,
            floorplanPinScale,
            selectedCompanyID,
            clientFloorplanPinScale
        } = this.props;
        return (
            <SelectPinScaleModal
                drawing={drawing}
                scale={
                    selectedCompanyID
                        ? clientFloorplanPinScale
                        : floorplanPinScale
                }
                handleUpdatePinScale={this.handleUpdatePinScale}
                handleSubmit={this.handleSubmit}
                handleCancelScale={this.handleCancelScale}
            />
        );
    }

    handleCancelScale = () => {
        const {
            updateReportFilter,
            selectedCompanyID,
            clientUpdateReportFilter,
            hideModal
        } = this.props;
        if (selectedCompanyID) {
            clientUpdateReportFilter('floorplanPinScale', 1);
        } else updateReportFilter('floorplanPinScale', 1);
        hideModal();
    };

    handleUpdatePinScale = e => {
        const {
            updateReportFilter,
            selectedCompanyID,
            clientUpdateReportFilter
        } = this.props;
        if (selectedCompanyID) {
            clientUpdateReportFilter('floorplanPinScale', e.target.value);
        } else updateReportFilter('floorplanPinScale', e.target.value);
    };

    handleSubmit = e => {
        e.preventDefault();
        const { postReport, getPostBody, selectedCompanyID } = this.props;
        if (selectedCompanyID) postReport(selectedCompanyID, getPostBody());
        else postReport(getPostBody());
        hideModal();
    };
}

const mapStateToProps = ({
    companyAdmin: {
        reportsReducer: {
            filters: { floorplanPinScale }
        }
    },
    client: {
        reportsReducer: {
            filters: { floorplanPinScale: clientFloorplanPinScale }
        }
    }
}) => ({
    floorplanPinScale,
    clientFloorplanPinScale
});

const mapDispatchToProps = dispatch => ({
    updateReportFilter: (name, value) => {
        dispatch(updateReportFilter(name, value));
    },
    clientUpdateReportFilter: (name, value) => {
        dispatch(clientUpdateReportFilter(name, value));
    },
    hideModal: () => {
        dispatch(hideModal());
    }
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectPinScaleModalContainer);
