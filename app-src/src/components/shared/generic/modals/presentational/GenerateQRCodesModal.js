import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Loading from '../../misc/presentational/Loading';
import Form from '../../form/containers/Form';
import Field from '../../form/presentational/Field';
import NumberInputContainer from '../../form/containers/NumberInputContainer';

const GenerateQRCodesModal = ({
    hideModal,
    isLoading,
    isGenerating,
    qrCodeCount,
    form,
    handleFormChange,
    handleSubmit,
}) => {
    if (isLoading) return <ModalOuterContainer><Loading /></ModalOuterContainer>;

    if (isGenerating) return <ModalOuterContainer hideCloseButton><Loading message='Generating... please wait' /></ModalOuterContainer>;

    return (
        <ModalOuterContainer>
            <BlockHeading title='Generate QR Codes' />
            <p className="generic-text">You currently have {qrCodeCount} QR Codes.</p>

            <Form className="generic-form" onSubmit={handleSubmit}>
                <Field name="Number of new codes to generate" required>
                    <NumberInputContainer
                        required
                        name='numberOfCodes'
                        value={form.numberOfCodes}
                        handleChange={handleFormChange}
                    />
                </Field>

                <BlockButtonWrapper>
                    <button className="button green" type="submit">
                        <i className="fa fa-check" /> Generate
                    </button>
                    <button className="button" onClick={hideModal}>
                        <i className="fa fa-times" /> Close
                    </button>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default GenerateQRCodesModal;
