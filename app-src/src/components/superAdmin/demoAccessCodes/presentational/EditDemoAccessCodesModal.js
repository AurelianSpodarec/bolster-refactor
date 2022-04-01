import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import updateDemoAccessCodes from 'actions/superAdmin/demoAccessCodes/async/updateDemoAccessCodes';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ButtonWrapper from '../../../shared/generic/button/presentational/ButtonWrapper';
import ActionButton from '../../../shared/generic/button/presentational/ActionButton';

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

                <div className="size-lg-12">
                    <ButtonWrapper alignment="right">
                        <ActionButton
                            text="Cancel"
                            onClick={() => dispatch(hideModal())}
                            source="secondary"
                            size="small"
                        />
                        <ActionButton text="Confirm" type="submit" icon="check" size="small" />
                    </ButtonWrapper>
                </div>
            </Form>
        </ModalOuterContainer>
    );
};

export default EditDemoAccessCodesModal;
