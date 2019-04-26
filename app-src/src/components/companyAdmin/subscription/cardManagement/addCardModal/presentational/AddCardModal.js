import React from 'react';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const AddCardModal = ({
    hideModal,
    handleChange,
    handleSubmit,
    nickname,
    name,
    cardNumber,
    expiryMonth,
    expiryYear,
    CV2,
    validateMaxLength,
    postError
}) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title="Add card" />
            <Form className="generic-form" onSubmit={handleSubmit}>
                <div className="size-lg-6">
                    <Field name="Card Nickname">
                        <TextInputContainer
                            handleChange={handleChange}
                            name={'nickname'}
                            value={nickname}
                            type="text"
                            required
                            placeholder="Expenses..."
                        />
                    </Field>
                </div>
                <div className="size-lg-6">
                    <Field name="Name on card">
                        <TextInputContainer
                            handleChange={handleChange}
                            name={'name'}
                            value={name}
                            type="text"
                            required
                            placeholder="Name On Card"
                        />
                    </Field>
                </div>
                <div className="size-lg-12">
                    <Field name="Card Number">
                        <TextInputContainer
                            handleChange={handleChange}
                            name={'cardNumber'}
                            value={cardNumber}
                            type="text"
                            required
                            placeholder="0123-4567-8901-2345"
                        />
                    </Field>
                </div>
                <div className="size-lg-4">
                    <Field name="Expiry Month">
                        <TextInputContainer
                            handleChange={handleChange}
                            name={'expiryMonth'}
                            value={expiryMonth}
                            type="number"
                            required
                            placeholder="00"
                            validate={validateMaxLength(2)}
                        />
                    </Field>
                </div>
                <div className="size-lg-4">
                    <Field name="Expiry Year">
                        <TextInputContainer
                            handleChange={handleChange}
                            name={'expiryYear'}
                            value={expiryYear}
                            type="number"
                            required
                            placeholder="00"
                            validate={validateMaxLength(4)}
                        />
                    </Field>
                </div>
                <div className="size-lg-4">
                    <Field name="CV2">
                        <TextInputContainer
                            handleChange={handleChange}
                            name={'CV2'}
                            value={CV2}
                            type="number"
                            required
                            placeholder="000"
                            validate={value => validateMaxLength(3)(value)}
                        />
                    </Field>
                </div>
                {!!postError && <p className="error size-lg-12">{postError}</p>}
                <BlockButtonWrapper>
                    <button className="button green" type="submit">
                        <i className="fa fa-plus" /> Add Card
                    </button>
                    <ButtonContainer handleClick={hideModal}>
                        Cancel
                    </ButtonContainer>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default AddCardModal;
