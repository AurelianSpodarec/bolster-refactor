import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import fetchCompanySettings from 'actions/companyAdmin/companySettings/async/fetchCompanySettings';
import generateQRCodes from 'actions/companyAdmin/qrCodes/async/generateQRCodes';

import { usePrevious } from 'helpers/hooks';

import GenerateQRCodesModal from '../presentational/GenerateQRCodesModal';
import { isEmpty } from 'helpers/generic';

const GenerateQRCodesModalContainer = ({ hideModal, qrCodeCount, fetchCompanySettings, company, isFetching, generateQRCodes }) => {
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

        generateQRCodes(form.numberOfCodes);
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
    },
    generateQRCodes: numberOfCodes => {
        dispatch(generateQRCodes(numberOfCodes));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GenerateQRCodesModalContainer);
