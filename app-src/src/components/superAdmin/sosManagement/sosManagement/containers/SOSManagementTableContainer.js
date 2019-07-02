import React from 'react';
import { connect } from 'react-redux';

import SOSManagementTable from '../presentational/SOSManagementTable';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { GENERATE_SOS_CODE } from 'constants/shared/modalTypes';

const SOSManagementTableContainer = ({ isFetching, error, showModal }) => {
    const sosCodes = [
        {
            date: '08/17/15',
            code: 896545,
            description: 'this is an sos code',
            isDataSynced: false
        },
        {
            date: '08/17/15',
            code: 896545,
            description: 'this is an sos code',
            isDataSynced: false
        },
        {
            date: '08/17/15',
            code: 896545,
            description: 'this is an sos code',
            isDataSynced: false
        },
        {
            date: '08/17/15',
            code: 896545,
            description: 'this is an sos code',
            isDataSynced: false
        }
    ];
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

// const mapStateToProps = ({
//     superAdmin: {
//         sosCodesReducer: { isFetching, sosCodes, error }
//     }
// }) => ({

// });

const mapDispatchToProps = {
    showModal
};

export default connect(
    null,
    mapDispatchToProps
)(SOSManagementTableContainer);
