import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Field from 'components/shared/generic/form/presentational/Field';
import Form from 'components/shared/generic/form/containers/Form';

const AutoDeleteSettingsModal = ({ handleChange, handleSubmit, form }) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title="Report Auto Delete Settings" />
            <Form className="generic-form" onSubmit={handleSubmit}>
                <div className="size-lg-6 size-md-12">
                    <Field name="Amount of days" required>
                        <TextInputContainer
                            handleChange={handleChange}
                            name={'valueToUpdate'}
                            value={form.valueToUpdate}
                            type="number"
                            maxNum="30"
                            required
                        />
                    </Field>
                </div>
            </Form>
        </ModalOuterContainer>
    );
};

export default AutoDeleteSettingsModal;
