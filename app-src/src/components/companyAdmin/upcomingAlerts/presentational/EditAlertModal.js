import React from 'react';
import { useSelector } from 'react-redux';

import {
    ALERT_FREQUENCY_SUFFIX_VALUES,
    ALERT_FREQUENCY_TYPES,
    ALERT_FREQUENCY_VALUES,
    ALERT_METHOD_VALUES,
} from 'constants/companyAdmin/enums';

import { NUMBER_GREATER_THAN_ZERO } from 'helpers/regex';
import { alertsIsPosting, selectAlert } from 'selectors/companyAdmin/alerts';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import DatePickerContainer from 'components/shared/generic/form/containers/DatePickerContainer';
import Select from 'components/shared/generic/form/presentational/Select';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';
import { enumFormat } from 'helpers/generic';
import useEditAlert from '../hierarchys/hooks/useEditAlert';

const EditAlertModal = ({ id, hideModal }) => {
    const alert = useSelector(state => selectAlert(state, id));

    const { form, handleChange, handleSubmit } = useEditAlert(id, alert);

    const isPosting = useSelector(alertsIsPosting);

    const methodOptions = enumFormat(ALERT_METHOD_VALUES);
    const frequencyTypeOptions = enumFormat(ALERT_FREQUENCY_VALUES);

    const frequencyAmountNum = parseInt(form.frequencyAmount);
    const frequencySuffix = `${ALERT_FREQUENCY_SUFFIX_VALUES[form?.frequencyType].toLowerCase()}${
        frequencyAmountNum > 1 ? 's' : ''
    }`;

    return (
        <ModalOuterContainer>
            <BlockHeading title="Edit alert" />

            <Form className="generic-form" onSubmit={handleSubmit}>
                <div className="size-lg-12">
                    <Field name="Name" required>
                        <TextInputContainer
                            handleChange={handleChange}
                            name="name"
                            value={form.name}
                            required
                        />
                    </Field>

                    <Field name="Description" required>
                        <TextAreaContainer
                            handleChange={handleChange}
                            name="description"
                            value={form.description}
                            required
                        />
                    </Field>

                    <div className="size-lg-6">
                        <Field name="Alert Method" required>
                            <Select
                                value={form.method}
                                onChange={handleChange}
                                name="method"
                                options={methodOptions}
                                omitPlaceholder
                                required
                            />
                        </Field>
                    </div>

                    <div className="size-lg-6">
                        <Field name="Date" required>
                            <DatePickerContainer
                                selected={form.date}
                                onChange={val => handleChange('date', val)}
                                name="date"
                                required
                            />
                        </Field>
                    </div>

                    <div className="size-lg-6">
                        <Field name="Frequency Type" required>
                            <Select
                                value={form.frequencyType}
                                onChange={handleChange}
                                name="frequencyType"
                                options={Object.values(frequencyTypeOptions)}
                                omitPlaceholder
                                required
                            />
                        </Field>
                    </div>

                    {form.frequencyType !== ALERT_FREQUENCY_TYPES.ONCE && (
                        <>
                            <div className="size-lg-6">
                                <Field name="Frequency Amount" required>
                                    <TextInputContainer
                                        type="number"
                                        name="frequencyAmount"
                                        value={form.frequencyAmount}
                                        handleChange={handleChange}
                                        minNum={1}
                                        validationRegExp={NUMBER_GREATER_THAN_ZERO}
                                        required
                                    />
                                </Field>
                            </div>
                        </>
                    )}

                    <Field styles={{ minHeight: 0 }}>
                        <p className="size-lg-12 info-message">
                            {+form.frequencyType === ALERT_FREQUENCY_TYPES.ONCE
                                ? 'Alert will be sent once.'
                                : `Alert will be sent every ${
                                      frequencyAmountNum > 1 ? `${form.frequencyAmount} ` : ''
                                  }${frequencySuffix}.`}
                        </p>
                    </Field>
                </div>

                <BlockButtonWrapper>
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className={`button yellow ${isPosting ? 'disabled' : ''}`}
                        disabled={isPosting}
                    >
                        <i className={`${isPosting ? 'fa fa-spinner fa-spin' : null}`} />{' '}
                        {isPosting ? 'Editing...' : 'Edit Alert'}
                    </button>
                    <button className="button" onClick={hideModal}>
                        Cancel
                    </button>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default EditAlertModal;
