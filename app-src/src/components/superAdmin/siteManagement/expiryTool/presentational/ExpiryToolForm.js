import React from 'react';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isEmpty } from 'helpers/generic';
import Field from 'components/shared/generic/form/presentational/Field';
import Select from 'components/shared/generic/form/presentational/Select';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';

const ExpiryToolForm = ({
    companiesOptions,
    fetchingCompanies,
    companiesError,
    companyID,
    setCompanyID,
    drawingsOptions,
    setDrawingID,
    drawingID,
    currentDrawing: { expiresOn },
    handleFormChange,
    handleChange,
    extendDrawingForm,
    daysToExtendBy,
    handleSubmit,
    handleCancel,
}) => (
    <BlockContainer
        isFetching={fetchingCompanies}
        error={companiesError}
        isEmpty={isEmpty(companiesOptions)}
    >
        <Field name="Select a company" classes required>
            <Select
                name="companyID"
                options={companiesOptions}
                value={companyID}
                onChange={(_, value) => setCompanyID(value)}
                search
                omitPlaceholder
                required
            />
        </Field>
        {!!companyID && (
            <Field name="Select a drawing" classes required>
                <Select
                    name="companyID"
                    options={drawingsOptions}
                    value={drawingID}
                    onChange={(_, value) => setDrawingID(value)}
                    search
                    omitPlaceholder
                    required
                />
            </Field>
        )}
        {!!drawingID && (
            <>
                <Field name="Current Expiration Date" classes>
                    <p className="size-lg-12">
                        <DateTimeContainer date={expiresOn} />
                    </p>
                </Field>
                <Field name="Days to extend expiration by (max 120)" classes required>
                    <TextInputContainer
                        name="amountOfDays"
                        value={daysToExtendBy.amountOfDays}
                        handleChange={handleChange}
                        type="number"
                        maxNum="120"
                        required
                    />
                </Field>
                <Field name="New Expiration Date" classes>
                    <p className="size-lg-12">
                        {extendDrawingForm.newExpiryDate && (
                            <DateTimeContainer date={extendDrawingForm.newExpiryDate} />
                        )}
                    </p>
                </Field>
                <Field name="Reason for extension" classes required>
                    <TextInputContainer
                        name="extensionReason"
                        value={extendDrawingForm.extensionReason}
                        handleChange={handleFormChange}
                        required
                    />
                </Field>
                <BlockButtonWrapper>
                    <button onClick={handleSubmit} className="button green">
                        <i className="fa fa-check" />
                        Submit
                    </button>
                    <button onClick={handleCancel} className="button red" type="submit">
                        <i className="far fa-times fa-fw" />
                        Cancel
                    </button>
                </BlockButtonWrapper>
            </>
        )}
    </BlockContainer>
);

export default ExpiryToolForm;
