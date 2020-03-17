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

const QR_CODE_TYPES = {
    PIN: 'Pin',
    ZONE: 'Zone'
};

const typeOptions = [
    { value: QR_CODE_TYPES.PIN, label: QR_CODE_TYPES.PIN },
    { value: QR_CODE_TYPES.ZONE, label: QR_CODE_TYPES.ZONE }
];

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
        type: QR_CODE_TYPES.PIN
    });

    const prevProps = usePrevious({ isFetching, isGeneratingQRCodes });

    useEffect(() => {
        fetchCompanySettings();
    }, []);

    useEffect(() => {
        if (prevProps.isFetching && !isFetching && !isEmpty(company)) {
            setIsLoading(false);
        }

        if (
            prevProps.isGeneratingQRCodes &&
            !isGeneratingQRCodes &&
            generateSuccess
        ) {
            showModal(SUCCESS_MODAL, {
                title: 'Successfully generated',
                message:
                    'Successfully generated the QR code(s). The CSV containing the code(s) will now download.'
            });
        }

        if (
            prevProps.isGeneratingQRCodes &&
            !isGeneratingQRCodes &&
            generateError
        ) {
            setIsGenerating(false);
            showModal(ERROR_MODAL, {
                title: 'Error generating',
                message:
                    'There was an error generating your QR code(s). Please try again.'
            });
        }
    }, [isFetching, isGeneratingQRCodes]);

    return (
        <GenerateQRCodesModal
            hideModal={hideModal}
            isLoading={isLoading}
            isGenerating={isGenerating}
            qrCodeCount={qrCodeCount + ''}
            form={form}
            handleFormChange={handleFormChange}
            handleSubmit={handleSubmit}
            typeOptions={typeOptions}
        />
    );

    function handleFormChange(name, value) {
        handleChange({
            ...form,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        setIsGenerating(true);

        const { numberOfCodes, type } = form;
        generateQRCodes(numberOfCodes, type);
    }
};

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: { companySettings, isFetching },
        qrCodesReducer: { isGenerating, generateSuccess, generateError }
    }
}) => ({
    qrCodeCount: companySettings.qrCodeCount,
    company: companySettings,
    isFetching,
    isGeneratingQRCodes: isGenerating,
    generateSuccess,
    generateError
});

const mapDispatchToProps = dispatch => ({
    hideModal: () => dispatch(hideModal()),
    showModal: (type, props) => dispatch(showModal(type, props)),
    fetchCompanySettings: () => {
        dispatch(fetchCompanySettings());
    },
    generateQRCodes: (numberOfCodes, zone) => {
        dispatch(generateQRCodes(numberOfCodes, zone));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GenerateQRCodesModalContainer);
