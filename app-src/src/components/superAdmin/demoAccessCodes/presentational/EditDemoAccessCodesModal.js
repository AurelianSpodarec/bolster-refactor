import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import updateDemoAccessCodes from 'actions/superAdmin/demoAccessCodes/async/updateDemoAccessCodes';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import SubmitContainer from 'components/shared/generic/form/containers/SubmitContainer';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const EditDemoAccessCodesModal = ({ item }) => {
    const dispatch = useDispatch();

    const [form, setFormChange] = useState({
        email: item.email,
        companyName: item.companyName,
    });

    const handleInputChange = (name, value) => {
        setFormChange({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        const postBody = {
            Email: form.email,
            CompanyName: form.companyName,
        };

        dispatch(updateDemoAccessCodes(item.id, postBody));
        dispatch(hideModal());
    };

    return (
        <ModalOuterContainer extraClasses="demo-access-codes">
            <BlockHeading title="Edit Access Code" />
            <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
                <div className="size-lg-12">
                    <Field name="Email" required>
                        <TextInputContainer
                            name="email"
                            handleChange={handleInputChange}
                            required
                            value={form.email}
                        />
                    </Field>
                    <Field name="Company Name" required>
                        <TextInputContainer
                            name="companyName"
                            handleChange={handleInputChange}
                            required
                            value={form.companyName}
                        />
                    </Field>
                </div>
                <BlockButtonWrapper>
                    <SubmitContainer text="Submit" withPlus />
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default EditDemoAccessCodesModal;
