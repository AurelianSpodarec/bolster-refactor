import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import CountriesSelectList from '../../form/presentational/CountriesSelectList';

const EditCompanyAddressModal = ({
    company: { name },
    companyAddress: { addressLine1, addressLine2, county, postcode, town, country },
    hideModal,
    handleChange,
    handleSubmit,
}) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title={`Edit ${name}'s address`} />
            <Form className="generic-form" onSubmit={handleSubmit}>
                <div className="size-lg-12">
                    <Field name="Address Line 1" required>
                        <TextInputContainer
                            handleChange={handleChange}
                            name={'addressLine1'}
                            value={addressLine1}
                            type="text"
                            required
                        />
                    </Field>
                </div>
                <div className="size-lg-12">
                    <Field name="Address Line 2">
                        <TextInputContainer
                            handleChange={handleChange}
                            name={'addressLine2'}
                            value={addressLine2}
                            type="text"
                        />
                    </Field>
                </div>
                <div className="size-lg-6 size-md-12">
                    <Field name="County" required>
                        <TextInputContainer
                            handleChange={handleChange}
                            name={'county'}
                            value={county}
                            type="text"
                            required
                        />
                    </Field>
                </div>
                <div className="size-lg-6 size-md-12">
                    <Field name="Town" required>
                        <TextInputContainer
                            handleChange={handleChange}
                            name={'town'}
                            value={town}
                            type="text"
                            required
                        />
                    </Field>
                </div>
                <div className="size-lg-6 size-md-12">
                    <Field name="Postcode" required>
                        <TextInputContainer
                            handleChange={handleChange}
                            name={'postcode'}
                            value={postcode}
                            type="text"
                            required
                        />
                    </Field>
                </div>
                <div className="size-lg-6 size-md-12">
                    <Field name="Country" required>
                        <CountriesSelectList
                            onChange={handleChange}
                            name="country"
                            value={country}
                            required
                        />
                    </Field>
                </div>
                <BlockButtonWrapper>
                    <button className="button green" type="submit">
                        Submit
                    </button>
                    <button className="button" onClick={hideModal}>
                        Cancel
                    </button>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default EditCompanyAddressModal;
