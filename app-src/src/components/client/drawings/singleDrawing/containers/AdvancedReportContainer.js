import React, { Component } from 'react';
import { connect } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { LOADING_DATA } from 'constants/shared/modalTypes';
import HierarchyAdvancedReport from 'components/companyAdmin/reports/createReport/components/presentational/HierarchyAdvancedReport';

class AdvancedReportContainer extends Component {
    render() {
        return <HierarchyAdvancedReport />;
    }

    componentDidMount = () => {
        const { isFetching, showModal } = this.props;
        if (isFetching) showModal(LOADING_DATA, { message: 'Loading pins...' });
    };

    componentDidUpdate = prevProps => {
        const { isFetching, showModal, hideModal } = this.props;
        if (isFetching) showModal(LOADING_DATA, { message: 'Loading pins...' });
        if (!isFetching && prevProps.isFetching) {
            hideModal();
        }
    };
}

const mapStateToProps = ({
    companyAdmin: {
        reportsReducer: { isFetching }
    }
}) => ({
    isFetching
});

const mapDispatchToProps = dispatch => ({
    showModal: (type, modalProps) => dispatch(showModal(type, modalProps)),
    hideModal: () => dispatch(hideModal())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdvancedReportContainer);
