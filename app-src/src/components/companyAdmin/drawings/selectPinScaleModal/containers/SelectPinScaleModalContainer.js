import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectPinScaleModal from '../presentational/SelectPinScaleModal';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';

class SelectPinScaleModalContainer extends Component {
    render() {
        const { drawing, floorplanPinScale } = this.props;
        return (
            <SelectPinScaleModal
                drawing={drawing}
                scale={floorplanPinScale}
                handleUpdatePinScale={this.handleUpdatePinScale}
            />
        );
    }

    handleUpdatePinScale = e => {
        const { updateReportFilter } = this.props;
        updateReportFilter('floorplanPinScale', e.target.value);
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
    }
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectPinScaleModalContainer);
