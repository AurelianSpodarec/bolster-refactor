import postAccessCode from 'actions/frontEnd/demoFullSite/async/postAccessCode';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import SubmitContainer from 'components/shared/generic/form/containers/SubmitContainer';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const EnterDemoFullSiteModal = () => {
    const dispatch = useDispatch();

    const [form, setFormChange] = useState({
        accessCode: '',
    });

    const handleInputChange = (name, value) => {
        setFormChange({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        const postBody = {
            AccessCode: form.accessCode,
        };

        dispatch(postAccessCode(postBody)).then(data => {
            // eslint-disable-next-line no-empty
            if ('error' in data) {
            } else {
                dispatch(hideModal());
            }
        });
    };

    return (
        <ModalOuterContainer extraClasses="demo-access-codes" hideCloseButton>
            <BlockHeading title="Enter Access Code" />
            <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
                <div className="size-lg-12">
                    <Field name="Access Code" required>
                        <TextInputContainer
                            name="accessCode"
                            handleChange={handleInputChange}
                            required
                            value={form.accessCode}
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

export default EnterDemoFullSiteModal;
