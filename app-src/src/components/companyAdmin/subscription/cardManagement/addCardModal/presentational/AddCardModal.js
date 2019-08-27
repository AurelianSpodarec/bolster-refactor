import React from 'react';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const AddCardModal = ({
    handleChange,
    handleSubmit,
    nickname,
    name,
    cardNumber,
    expiryMonth,
    expiryYear,
    CV2,
    validateMaxLength,
    postError,
    close,
    postingError
}) => {
    return (
        <ModalOuterContainer close={close}>
            <BlockHeading title="Add card" />

            <Form className="generic-form" onSubmit={handleSubmit}>
                <div className="size-lg-6">
                    <Field name="Card Nickname" required>
                        <TextInputContainer
                            handleChange={handleChange}
                            name={'nickname'}
                            value={nickname}
                            type="text"
                            required
                        />
                    </Field>
                </div>
                <div className="size-lg-6">
                    <Field name="Name on card" required>
                        <TextInputContainer
                            handleChange={handleChange}
                            name={'name'}
                            value={name}
                            type="text"
                            required
                        />
                    </Field>
                </div>
                <div className="size-lg-12">
                    <Field name="Card Number" required>
                        <TextInputContainer
                            handleChange={handleChange}
                            name={'cardNumber'}
                            value={cardNumber}
                            type="text"
                            required
                        />
                    </Field>
                </div>
                <div className="size-lg-4">
                    <Field name="Expiry Month" required>
                        <TextInputContainer
                            handleChange={handleChange}
                            name={'expiryMonth'}
                            value={expiryMonth}
                            type="number"
                            required
                            placeholder="MM"
                            validate={validateMaxLength(2)}
                        />
                    </Field>
                </div>
                <div className="size-lg-4">
                    <Field name="Expiry Year" required>
                        <TextInputContainer
                            handleChange={handleChange}
                            name={'expiryYear'}
                            value={expiryYear}
                            type="number"
                            required
                            placeholder="YYYY"
                            validate={validateMaxLength(4)}
                        />
                    </Field>
                </div>
                <div className="size-lg-4">
                    <Field name="CV2" required>
                        <TextInputContainer
                            handleChange={handleChange}
                            name={'CV2'}
                            value={CV2}
                            type="number"
                            required
                            placeholder="000"
                            validate={validateMaxLength(4)}
                        />
                    </Field>
                </div>
                {!!postingError && (
                    <div className="form-field basic size-lg-12">
                        <p className="info-message error">{`${postingError}. Please check over your details and try again.`}</p>
                    </div>
                )}
                <BlockButtonWrapper>
                    <button className="button green" type="submit">
                        <i className="fa fa-plus" /> Add Card
                    </button>
                    <ButtonContainer
                        handleClick={e => {
                            e.preventDefault();
                            close();
                        }}
                    >
                        Cancel
                    </ButtonContainer>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default AddCardModal;
