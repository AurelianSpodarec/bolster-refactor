import React from 'react';

import { PIN_OPTION_SETS_ENUM, PIN_OPTION_TYPES_ENUM } from 'constants/companyAdmin/enums';
import { useForm } from 'helpers/hooks';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const CreateOptionSet = ({ pinOptionTypeID }) => {
    const typeName = PIN_OPTION_TYPES_ENUM[pinOptionTypeID];
    const setName = PIN_OPTION_SETS_ENUM[pinOptionTypeID];

    const [form, handleChange] = useForm({
        name: '',
    });

    const handleSubmit = () => {
        const postBody = {
            ...form,
            pinOptionTypeID,
        };

        console.log(postBody);
    };

    return (
        <ModalOuterContainer>
            <BlockHeading title={`Create ${setName}`} />

            <p className="generic-text size-lg-12">
                Create an '{setName.toLowerCase()}' for your sites.
            </p>

            <p className="generic-text size-lg-12">
                You will be able to set prices for your {typeName.toLowerCase()} and choose which
                options are available to your operatives through the app.
            </p>

            <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
                <Field name="Name" required>
                    <TextInputContainer
                        name="name"
                        value={form.name}
                        handleChange={handleChange}
                        placeholder="Type name"
                        required
                    />
                </Field>

                <BlockButtonWrapper>
                    <button className="button green">
                        <i className="fa fa-save"></i> Save
                    </button>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default CreateOptionSet;
