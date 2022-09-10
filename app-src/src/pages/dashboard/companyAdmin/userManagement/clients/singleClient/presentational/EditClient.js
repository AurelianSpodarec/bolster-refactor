import BackButtonContainer from 'components_DEPRECATED/shared/generic/backButton/containers/BackButtonContainer';
import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components_DEPRECATED/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';
import LinkButton from 'components_DEPRECATED/shared/generic/button/presentational/LinkButton';
import Form from 'components_DEPRECATED/shared/generic/form/containers/Form';
import TextInputContainer from 'components_DEPRECATED/shared/generic/form/containers/TextInputContainer';
import Field from 'components_DEPRECATED/shared/generic/form/presentational/Field';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';
import React from 'react';

const EditClient = ({
    handleSubmit,
    handleChange,
    firstName,
    lastName,
    companyName,
    phoneNumber,
}) => (
    <>
        <PageHeading leftChildren={true} title="Edit Client">
            <BackButtonContainer />
        </PageHeading>
        <BlockContainer>
            <BlockHeading title="Client details" />
            <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
                <div className="size-lg-12">
                    <div className="size-lg-6">
                        <Field name="First Name" required>
                            <TextInputContainer
                                name="firstName"
                                value={firstName}
                                handleChange={handleChange}
                                required
                            />
                        </Field>
                    </div>

                    <div className="size-lg-6">
                        <Field name="Last Name" required>
                            <TextInputContainer
                                value={lastName}
                                name="lastName"
                                handleChange={handleChange}
                                required
                            />
                        </Field>
                    </div>
                </div>

                <div className="size-lg-12">
                    <div className="size-lg-6">
                        <Field name="Phone Number">
                            <TextInputContainer
                                value={phoneNumber}
                                name="phoneNumber"
                                handleChange={handleChange}
                            />
                        </Field>
                    </div>
                    <div className="size-lg-6">
                        <Field name="Company Name">
                            <TextInputContainer
                                value={companyName}
                                name="companyName"
                                handleChange={handleChange}
                            />
                        </Field>
                    </div>
                </div>

                <BlockButtonWrapper>
                    <ButtonWrapper alignment="right">
                        <LinkButton
                            href="/company/users-management/clients"
                            text="Cancel"
                            source="secondary"
                        />
                        <ActionButton type="submit" text="Confirm" icon="check" />
                    </ButtonWrapper>
                </BlockButtonWrapper>
            </Form>
        </BlockContainer>
    </>
);

export default EditClient;
