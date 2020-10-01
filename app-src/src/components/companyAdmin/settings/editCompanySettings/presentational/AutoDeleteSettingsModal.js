import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Field from 'components/shared/generic/form/presentational/Field';
import Form from 'components/shared/generic/form/containers/Form';
import LoadingIcon from 'components/shared/generic/misc/presentational/LoadingIcon';

const AutoDeleteSettingsModal = ({ handleChange, handleSubmit, form, hideModal, isPosting }) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title="Report Auto Delete Settings" />
            <Form className="generic-form">
                <div className="size-lg-6 size-md-12">
                    <Field name="Amount of days (Max 30)" required>
                        <TextInputContainer
                            handleChange={handleChange}
                            name={'numberOfDays'}
                            value={form.numberOfDays}
                            type="number"
                            maxNum="30"
                            required
                        />
                    </Field>
                </div>
                <div className="button-area size-lg-12">
                    <button onClick={handleSubmit} className="button green" type="button">
                        {isPosting ? <LoadingIcon /> : <i className="far fa-check fa-fw" />}
                        Confirm
                    </button>
                    <button onClick={hideModal} className="button red" type="submit">
                        <i className="far fa-times fa-fw" />
                        Cancel
                    </button>
                </div>
            </Form>
        </ModalOuterContainer>
    );
};

export default AutoDeleteSettingsModal;
