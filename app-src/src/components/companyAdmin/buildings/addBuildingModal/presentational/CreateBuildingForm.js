import React from 'react';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ButtonNoClickContainer from 'components/shared/generic/button/containers/ButtonNoClickContainer';

const CreateBuildingForm = ({
    handleSubmit,
    handleInputChange,
    name,
    addressLine1,
    addressLine2,
    postcode,
    siteID
}) => (
    <>
        <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
            <div className="size-lg-12">
                <div className="size-lg-6">
                    <Field name="Building name" required>
                        <TextInputContainer
                            name="name"
                            value={name}
                            handleChange={handleInputChange}
                            required
                        />
                    </Field>
                </div>

                <div className="size-lg-6">
                    <Field name="Address Line 1" required>
                        <TextInputContainer
                            value={addressLine1}
                            name="addressLine1"
                            handleChange={handleInputChange}
                            required
                        />
                    </Field>
                </div>
            </div>

            <div className="size-lg-12">
                <div className="size-lg-6">
                    <Field name="Address Line 2">
                        <TextInputContainer
                            value={addressLine2}
                            name="addressLine2"
                            handleChange={handleInputChange}
                        />
                    </Field>
                </div>

                <div className="size-lg-6">
                    <Field name="Postcode" required>
                        <TextInputContainer
                            value={postcode}
                            name="postcode"
                            handleChange={handleInputChange}
                            required
                        />
                    </Field>
                </div>
            </div>

            <BlockButtonWrapper>
                <button className="button green">
                    <i className="fa fa-plus" /> Add Building
                </button>
                <ButtonNoClickContainer to={`/company/sites/${siteID}`}>
                    Cancel
                </ButtonNoClickContainer>
            </BlockButtonWrapper>
        </Form>
    </>
);

export default CreateBuildingForm;
