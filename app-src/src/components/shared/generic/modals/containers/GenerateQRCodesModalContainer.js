import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import fetchCompanySettings from 'actions/companyAdmin/companySettings/async/fetchCompanySettings';

import { usePrevious } from 'helpers/hooks';

import GenerateQRCodesModal from '../presentational/GenerateQRCodesModal';
import { isEmpty } from 'helpers/generic';

const GenerateQRCodesModalContainer = ({ hideModal, qrCodeCount, fetchCompanySettings, company, isFetching }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);

    const [form, handleChange] = useState({
        numberOfCodes: '',
    });

    const prevProps = usePrevious({ isFetching });

    useEffect(() => {
        fetchCompanySettings();
    }, []);

    useEffect(() => {
        if (prevProps.isFetching && !isFetching && !isEmpty(company)) {
            setIsLoading(false);
        }
    }, [isFetching]);

    return <GenerateQRCodesModal
        hideModal={hideModal}
        isLoading={isLoading}
        isGenerating={isGenerating}
        qrCodeCount={qrCodeCount + ''}
        form={form}
        handleFormChange={handleFormChange}
        handleSubmit={handleSubmit}
    />;

    function handleFormChange(name, value) {
        handleChange({
            ...form,
            [name]: value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        // const { isAdmin, ...restForm } = form;

        // const postBody = {
        //     ...restForm,
        //     role: isAdmin ? USER_ROLES.ADMIN : USER_ROLES.USER,
        // };

        // editTeamMember(teamMember.id, postBody);
    }
};

const mapStateToProps = ({ companyAdmin: { companySettingsReducer: { companySettings, isFetching } } }) => ({
    qrCodeCount: companySettings.qrCodeCount,
    company: companySettings,
    isFetching,
});

const mapDispatchToProps = dispatch => ({
    hideModal: () => dispatch(hideModal()),
    fetchCompanySettings: () => {
        dispatch(fetchCompanySettings());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GenerateQRCodesModalContainer);
