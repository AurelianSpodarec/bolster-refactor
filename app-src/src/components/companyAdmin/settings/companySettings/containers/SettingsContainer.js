import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import fetchCompanySettings from 'actions/companyAdmin/companySettings/async/fetchCompanySettings';
import Settings from '../presentational/Settings';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { COMPANY_AUTO_DELETE_SETTINGS } from 'constants/shared/modalTypes';

const SettingsContainer = ({ onMobile, fetchCompanySettings, showModal }) => {
    useEffect(() => {
        fetchCompanySettings();
    }, []);

    function showAutoDeleteSettingsModal() {
        showModal(COMPANY_AUTO_DELETE_SETTINGS);
    }

    return (
        <Settings onMobile={onMobile} showAutoDeleteSettingsModal={showAutoDeleteSettingsModal} />
    );
};

const mapStateToProps = ({
    shared: {
        mobileReducer: { onMobile },
    },
}) => ({
    onMobile,
});

const mapDispatchToProps = {
    showModal,
    fetchCompanySettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
