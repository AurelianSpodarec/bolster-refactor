import React from 'react';
import useCreateNewOperativeAlerts from './hooks/useCreateNewOperativeAlerts';

import ModalOuterContainer from 'components_DEPRECATED/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components_DEPRECATED/shared/generic/form/containers/Form';
import Field from 'components_DEPRECATED/shared/generic/form/presentational/Field';
import TextAreaContainer from 'components_DEPRECATED/shared/generic/form/containers/TextAreaContainer';
import { sendToEnum } from 'constants/companyAdmin/enums';
import Select from 'components_DEPRECATED/shared/generic/form/presentational/Select';
import MultiSelect from 'components_DEPRECATED/shared/generic/form/presentational/MultiSelect';
import BlockButtonWrapper from 'components_DEPRECATED/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const CreateNewOperativeAlertsModal = () => {
    const {
        sendToOptions,
        siteOptions,
        operativeOptions,
        form: { sendTo, siteID, message, operativeIDs },
        handleChange,
        handleSubmit,
    } = useCreateNewOperativeAlerts();

    return (
        <ModalOuterContainer>
            <BlockHeading title="Alert Details" />

            <Form onSubmit={handleSubmit}>
                <Field name="Send To" required>
                    <Select
                        name="sendTo"
                        value={sendTo}
                        options={sendToOptions}
                        onChange={handleChange}
                        required
                    />
                </Field>
                {sendTo === sendToEnum.OPERATIVES_WITHIN_SITE && (
                    <Field name="Operatives within a Site">
                        <Select
                            name="siteID"
                            value={siteID}
                            options={siteOptions}
                            onChange={handleChange}
                            search
                        />
                    </Field>
                )}
                {sendTo === sendToEnum.SELECTED_OPERATIVES && (
                    <Field name="Operatives within a Site">
                        <MultiSelect
                            name="operativeIDs"
                            value={operativeIDs}
                            options={operativeOptions}
                            onChange={handleChange}
                            search
                        />
                    </Field>
                )}
                <Field name="Message" required>
                    <TextAreaContainer
                        name="message"
                        value={message}
                        handleChange={handleChange}
                        required
                    />
                </Field>

                <BlockButtonWrapper>
                    <button className="button green" type="submit">
                        <i className="fa fa-plus" />
                        Submit
                    </button>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default CreateNewOperativeAlertsModal;
