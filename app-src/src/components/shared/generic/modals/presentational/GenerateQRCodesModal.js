import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Loading from '../../misc/presentational/Loading';
import Form from '../../form/containers/Form';
import Field from '../../form/presentational/Field';
import Select from '../../form/presentational/Select';

const GenerateQRCodesModal = ({
    form: { numberOfCodes, type },
    hideModal,
    isLoading,
    isGenerating,
    qrCodeCount,
    handleFormChange,
    handleSubmit,
    options,
    typeOptions,
}) => {
    if (isLoading)
        return (
            <ModalOuterContainer>
                <Loading />
            </ModalOuterContainer>
        );

    if (isGenerating)
        return (
            <ModalOuterContainer hideCloseButton>
                <Loading message="Generating... please wait" />
            </ModalOuterContainer>
        );

    return (
        <ModalOuterContainer>
            <BlockHeading title="Generate QR Codes" />
            <p className="generic-text">You currently have {qrCodeCount} QR Codes.</p>

            <Form className="generic-form" onSubmit={handleSubmit}>
                <Field name="Type" required>
                    <Select
                        required
                        omitPlaceholder
                        name="type"
                        value={type}
                        options={typeOptions}
                        onChange={handleFormChange}
                    />
                </Field>

                <Field name="Number of new codes to generate" required>
                    <Select
                        required
                        name="numberOfCodes"
                        value={numberOfCodes}
                        onChange={handleFormChange}
                        options={options}
                    />
                    {/* just some space for the dropdown */}
                    <div style={{ height: '10em', zIndex: -10 }} />
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
