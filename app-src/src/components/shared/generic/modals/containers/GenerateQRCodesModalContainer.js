import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import fetchCompanySettings from 'actions/companyAdmin/companySettings/async/fetchCompanySettings';
import generateQRCodes from 'actions/companyAdmin/qrCodes/async/generateQRCodes';

import { usePrevious } from 'helpers/hooks';

import GenerateQRCodesModal from '../presentational/GenerateQRCodesModal';
import { isEmpty } from 'helpers/generic';
import { SUCCESS_MODAL, ERROR_MODAL } from 'constants/shared/modalTypes';

const GenerateQRCodesModalContainer = ({
    showModal,
    hideModal,
    qrCodeCount,
    fetchCompanySettings,
    company,
    isFetching,
    generateQRCodes,
    isGeneratingQRCodes,
    generateSuccess,
    generateError
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);

    const [form, handleChange] = useState({
        numberOfCodes: '',
    });

    const prevProps = usePrevious({ isFetching, isGeneratingQRCodes });

    useEffect(() => {
        fetchCompanySettings();
    }, []);

    useEffect(() => {
        if (prevProps.isFetching && !isFetching && !isEmpty(company)) {
            setIsLoading(false);
        }

        if (prevProps.isGeneratingQRCodes && !isGeneratingQRCodes && generateSuccess) {
            showModal(SUCCESS_MODAL, {
                title: 'Successfully generated',
                message: 'The QR codes have successfully been generated, they will now download as a CSV file.'
            });
        }

        if (prevProps.isGeneratingQRCodes && !isGeneratingQRCodes && generateError) {
            setIsGenerating(false);
            showModal(ERROR_MODAL, {
                title: 'Error generating',
                message: 'There was an error generating your QR codes. Please try again.'
            });
        }
    }, [isFetching, isGeneratingQRCodes]);

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

        setIsGenerating(true);
        generateQRCodes(form.numberOfCodes);
    }
};

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: { companySettings, isFetching },
        qrCodesReducer: { isGenerating, generateSuccess, generateError } }
}) => ({
    qrCodeCount: companySettings.qrCodeCount,
    company: companySettings,
    isFetching,
    isGeneratingQRCodes: isGenerating,
    generateSuccess,
    generateError,
});

const mapDispatchToProps = dispatch => ({
    hideModal: () => dispatch(hideModal()),
    showModal: (type, props) => dispatch(showModal(type, props)),
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
