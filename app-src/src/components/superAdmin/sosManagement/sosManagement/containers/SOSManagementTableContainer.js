import React from 'react';
import { connect } from 'react-redux';

import SOSManagementTable from '../presentational/SOSManagementTable';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { GENERATE_SOS_CODE } from 'constants/shared/modalTypes';

const SOSManagementTableContainer = ({
    isFetching,
    error,
    showModal,
    sosCodes
}) => {
    return (
        <SOSManagementTable
            headers={['Date', 'Code', 'Description', 'Data Synced?']}
            isFetching={isFetching}
            error={error}
            sosCodes={sosCodes}
            showSOSModal={showSOSModal}
        />
    );

    function showSOSModal() {
        showModal(GENERATE_SOS_CODE);
    }
};

const mapStateToProps = ({
    superAdmin: {
        sosCodesReducer: { isFetching, sosCodes, error }
    }
}) => ({
    isFetching,
    error,
    sosCodes: Object.values(sosCodes)
});

const mapDispatchToProps = {
    showModal
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SOSManagementTableContainer);
