import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectPinScaleModal from '../presentational/SelectPinScaleModal';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

class SelectPinScaleModalContainer extends Component {
    render() {
        const { drawing, floorplanPinScale, hideModal } = this.props;
        return (
            <SelectPinScaleModal
                drawing={drawing}
                scale={floorplanPinScale}
                handleUpdatePinScale={this.handleUpdatePinScale}
                handleSubmit={this.handleSubmit}
                hideModal={hideModal}
            />
        );
    }

    handleUpdatePinScale = e => {
        const { updateReportFilter } = this.props;
        updateReportFilter('floorplanPinScale', e.target.value);
    };

    handleSubmit = e => {
        e.preventDefault();
        const { postReport, getPostBody } = this.props;
        postReport(getPostBody());
        hideModal();
    };
}

const mapStateToProps = ({
    companyAdmin: {
        reportsReducer: {
            filters: { floorplanPinScale }
        }
    }
}) => ({
    floorplanPinScale
});

const mapDispatchToProps = dispatch => ({
    updateReportFilter: (name, value) => {
        dispatch(updateReportFilter(name, value));
    },
    hideModal: () => {
        dispatch(hideModal());
    }
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectPinScaleModalContainer);
