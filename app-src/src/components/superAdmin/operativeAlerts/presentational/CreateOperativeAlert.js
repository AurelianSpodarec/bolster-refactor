import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const CreateOperativeAlert = ({
    handleSubmit,
    handleChange,
    message,
    sending
}) => (
    <>
        <PageHeading
            leftChildren={true}
            title="Create Operative Alert"
            withBackButton
        />
        <BlockContainer>
            <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
                <p>
                    ##This will send a message to all operatives using the
                    Bolster Systems app ##
                </p>
                <div className="size-lg-12">
                    <Field name="Message" required>
                        <TextAreaContainer
                            name="message"
                            value={message}
                            handleChange={handleChange}
                            required
                            classes="set-height"
                        />
                    </Field>
                </div>
                <BlockButtonWrapper>
                    <button
                        className={`button ${sending ? 'red' : 'green'}`}
                        disabled={sending}
                    >
                        <i className="far fa-bell" />{' '}
                        {sending ? 'Sending...' : 'Send Alert'}
                    </button>
                    <ButtonContainer to="/company/message-centre">
                        Cancel
                    </ButtonContainer>
                </BlockButtonWrapper>
            </Form>
        </BlockContainer>
    </>
);

export default CreateOperativeAlert;
