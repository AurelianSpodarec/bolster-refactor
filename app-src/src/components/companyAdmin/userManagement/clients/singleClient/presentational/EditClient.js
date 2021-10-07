import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
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
                    <button className="button green">Confirm</button>
                    <ButtonContainer to="/company/users-management/clients">Cancel</ButtonContainer>
                </BlockButtonWrapper>
            </Form>
        </BlockContainer>
    </>
);

export default EditClient;
