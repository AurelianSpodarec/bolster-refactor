import React from 'react';

import BackButtonContainer from 'components_DEPRECATED/shared/generic/backButton/containers/BackButtonContainer';
import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components_DEPRECATED/shared/generic/form/containers/Form';
import TextInputContainer from 'components_DEPRECATED/shared/generic/form/containers/TextInputContainer';
import Field from 'components_DEPRECATED/shared/generic/form/presentational/Field';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';
import BlockButtonWrapper from 'components_DEPRECATED/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import MultiSelect from 'components_DEPRECATED/shared/generic/form/presentational/MultiSelect';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';
import LinkButton from 'components_DEPRECATED/shared/generic/button/presentational/LinkButton';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';

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
    isFetchingDrawings,
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
                                    search
                                    placeholder={
                                        isFetchingDrawings ? 'Loading...' : '-- select options --'
                                    }
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
                        <ActionButton type="submit" text="Confirm" icon="check" />
                        <ButtonWrapper alignment="right">
                            <LinkButton
                                source="secondary"
                                text="Cancel"
                                href="/company/users-management/clients"
                            />
                        </ButtonWrapper>
                    </BlockButtonWrapper>
                </Form>
            </BlockContainer>
        </>
    );
};

export default AddClient;
