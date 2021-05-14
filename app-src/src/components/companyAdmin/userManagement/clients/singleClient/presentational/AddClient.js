import React from 'react';

import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';

const AddClient = ({
    handleChange,
    handleSubmit,
    drawingOptions,
    serviceOptions,
    firstName,
    lastName,
    email,
    drawingIDs,
    serviceIDs,
    phoneNumber,
    companyName,
}) => {
    return (
        <>
            <PageHeading leftChildren={true} title="Add Client">
                <BackButtonContainer />
            </PageHeading>
            <BlockContainer>
                <BlockHeading title="Client details" />
                <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
                    <div className="size-lg-12">
                        <div className="size-lg-6">
                            <Field name="Email" required>
                                <TextInputContainer
                                    name="email"
                                    value={email}
                                    handleChange={handleChange}
                                    required
                                />
                            </Field>
                        </div>
                    </div>
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
                            <Field name="Phone Number" required>
                                <TextInputContainer
                                    value={phoneNumber}
                                    name="phoneNumber"
                                    handleChange={handleChange}
                                    required
                                />
                            </Field>
                        </div>
                        <div className="size-lg-6">
                            <Field name="Company Name" required>
                                <TextInputContainer
                                    value={companyName}
                                    name="companyName"
                                    handleChange={handleChange}
                                    required
                                />
                            </Field>
                        </div>
                    </div>
                    <div className="size-lg-12">
                        <div className="size-lg-6">
                            <Field name="Drawings" required>
                                <MultiSelect
                                    value={drawingIDs}
                                    name="drawingIDs"
                                    onChange={handleChange}
                                    options={drawingOptions}
                                    required
                                />
                            </Field>
                        </div>
                        <div className="size-lg-6">
                            <Field name="Services" required>
                                <MultiSelect
                                    value={serviceIDs}
                                    name="serviceIDs"
                                    onChange={handleChange}
                                    options={serviceOptions}
                                    required
                                />
                            </Field>
                        </div>
                    </div>

                    <BlockButtonWrapper>
                        <button className="button green">Confirm</button>
                        <ButtonContainer to="/company/users-management/clients">
                            Cancel
                        </ButtonContainer>
                    </BlockButtonWrapper>
                </Form>
            </BlockContainer>
        </>
    );
};

export default AddClient;
