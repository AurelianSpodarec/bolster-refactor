import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Form from 'components/shared/generic/form/containers/Form';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Field from 'components/shared/generic/form/presentational/Field';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';

const InviteClientForm = ({
    location,
    handleSubmit,
    serviceOptions,
    checkedServices,
    handleChange,
    firstName,
    lastName,
    email,
    phoneNumber,
    companyName,
    showMoreServicesMesssage,
    clients,
    inviteNewClient,
    userOptions
}) => (
    <>
        <Form className="generic-form size-lg-12" onSubmit={handleSubmit}>
            <Field labelClasses="no-capitalise" name="Invite new client?">
            <CheckboxContainer
                checked={inviteNewClient}
                name="inviteNewClient"
                text=""
                handleChange={handleChange}
            />
            </Field>
                          
                {!inviteNewClient && (
                <Field
                       name="Select client(s)"
                       sizeClasses="size-lg-6 size-md-12"
                       required
                   >   
                    <MultiSelect
                        name="clients"
                        options={userOptions}
                        value={clients}
                        onChange={handleChange}
                        placeholder="-- select operatives --"
                        search
                        required
                    />
                    </Field>
                )}

                {/* <DropdownContainer
                    placeholder="-- select operative --"
                    name="companyUserID"
                    options={users}
                    selectedOption={selectedUser}
                    handleChange={handleChange}
                    required
                /> */}
         
        
            {inviteNewClient && (
                <>
                    <BlockHeading title="Client Details" />
                    <p className="generic-text in-form size-lg-12">
                        You can also invite a new client, please enter the email address of the user
                        you wish to invite.
                        <br /> If the user does not have a Bolster systems account, they will be
                        prompted to create one to accepted your invitation.
                    </p>
                    <div className="size-lg-12">
                        <Field name="Email address" sizeClasses="size-lg-6 size-md-12" required>
                            <TextInputContainer
                                name="email"
                                value={email}
                                type="email"
                                handleChange={handleChange}
                                required
                            />
                        </Field>
                    </div>

                    <Field name="First name" sizeClasses="size-lg-4 size-md-12" required>
                        <TextInputContainer
                            name="firstName"
                            value={firstName}
                            handleChange={handleChange}
                            required
                        />
                    </Field>

                    <Field name="Last name" sizeClasses="size-lg-4 size-md-12" required>
                        <TextInputContainer
                            name="lastName"
                            value={lastName}
                            handleChange={handleChange}
                            required
                        />
                    </Field>

                    <Field name="Phone number" sizeClasses="size-lg-4 size-md-12" required>
                        <TextInputContainer
                            name="phoneNumber"
                            value={phoneNumber}
                            handleChange={handleChange}
                            required
                        />
                    </Field>

                    <Field name="Company name" sizeClasses="size-lg-4 size-md-12" required>
                        <TextInputContainer
                            name="companyName"
                            value={companyName}
                            handleChange={handleChange}
                            required
                        />
                    </Field>
                </>
            )}

            <Field name="Service types" sizeClasses="size-lg-12" required>
                <p className="generic-text size-lg-12">
                    Select the services the client should have access to:
                </p>
                <CheckboxListContainer
                    required
                    name="serviceIDs"
                    handleChange={handleChange}
                    options={serviceOptions}
                    selectedOptions={checkedServices}
                    hideDisabled
                />
            </Field>

            <BlockButtonWrapper>
                {showMoreServicesMesssage && (
                    <p className="generic-text size-lg-12">
                        Looking for more service types? Check your{' '}
                        <Link to="/company/subscription">subscriptions</Link> to add more!
                    </p>
                )}

                <button className="button green">
                    <i className="fa fa-plus" />
                    Invite Client
                </button>

                <ButtonContainer to={location.pathname.replace('/invite-client', '')}>
                    Cancel
                </ButtonContainer>
            </BlockButtonWrapper>
        </Form>
    </>
);

export default withRouter(InviteClientForm);
