import React, { Component } from 'react';
import { connect } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { LOADING_DATA } from 'constants/shared/modalTypes';
import HierarchyAdvancedReport from 'components/companyAdmin/reports/createReport/components/presentational/HierarchyAdvancedReport';
import withUpdateOnChange from 'components/companyAdmin/reports/createReport/components/hocs/withUpdateOnChange';

class AdvancedReportContainer extends Component {
    render() {
        return <HierarchyAdvancedReport isDrawingPage />;
    }

    componentDidMount = () => {
        const { isFetching, showModal, pins, handleChange } = this.props;
        if (pins && pins.length)
            handleChange('pinIDs', pins.map(({ id }) => id));
        if (isFetching) showModal(LOADING_DATA, { message: 'Loading data...' });
    };

    componentDidUpdate = prevProps => {
        const {
            isFetching,
            showModal,
            hideModal,
            pins,
            handleChange
        } = this.props;

        if (pins.length !== prevProps.pins.length) {
            handleChange('pinIds', pins.map(({ id }) => id));
        }
        if (isFetching && !prevProps.isFetching) {
            showModal(LOADING_DATA, { message: 'Loading pins...' });
        }
        if (!isFetching && prevProps.isFetching) {
            hideModal();
        }
    };
}

const mapStateToProps = ({
    companyAdmin: {
        reportsReducer: {
            isFetching,
            customFilters: { pins }
        }
    }
}) => ({
    isFetching,
    pins
});

const mapDispatchToProps = { showModal, hideModal };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withUpdateOnChange(AdvancedReportContainer));
