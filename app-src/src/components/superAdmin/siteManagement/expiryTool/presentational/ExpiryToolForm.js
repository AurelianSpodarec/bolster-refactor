import React from 'react';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isEmpty } from 'helpers/generic';
import Field from 'components/shared/generic/form/presentational/Field';
import Select from 'components/shared/generic/form/presentational/Select';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import DatePickerContainer from 'components/shared/generic/form/containers/DatePickerContainer';

const ExpiryToolForm = ({
    companiesOptions,
    fetchingCompanies,
    companiesError,
    companyID,
    setCompanyID,
    drawingsOptions,
    currentDrawings,
    handleFormChange,
    extendDrawingForm,
    handleSubmit,
    handleCancel,
    showExpiredMessage,
}) => {
    const sortedDrawings = currentDrawings.sort((a, b) => b - a);
    const earliestDrawing = sortedDrawings[0];
    const latestDrawing = sortedDrawings[sortedDrawings.length - 1];
    return (
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
                    classes="large"
                />
            </Field>
            {!!companyID && (
                <Field name="Select a drawing" classes required>
                    <MultiSelect
                        name="drawingIDs"
                        options={drawingsOptions}
                        value={extendDrawingForm.drawingIDs}
                        onChange={(name, value) => handleFormChange(name, value)}
                        search
                        omitPlaceholder
                        required
                        classes="large"
                    />
                </Field>
            )}
            {!!currentDrawings.length && (
                <>
                    {showExpiredMessage && (
                        <p className="info-message error" style={{ marginBottom: '10px' }}>
                            A drawing you have selected has expired. If you extend this drawing you
                            could be re-activating it from todays date.
                        </p>
                    )}
                    <Field name="Current Expiration Date(s)" classes>
                        {currentDrawings.length === 1 && (
                            <p className="size-lg-12">
                                <DateTimeContainer date={currentDrawings[0].expiresOn} />
                            </p>
                        )}
                        {currentDrawings.length > 1 && (
                            <p className="size-lg-12">
                                <DateTimeContainer date={earliestDrawing.expiresOn} /> -{' '}
                                <DateTimeContainer date={latestDrawing.expiresOn} />
                            </p>
                        )}
                    </Field>
                    <Field name="New Expiration Date" classes required>
                        <DatePickerContainer
                            name="newExpiryDate"
                            selected={
                                new Date(
                                    extendDrawingForm.newExpiryDate ||
                                        (currentDrawings[0] || {}).expiresOn,
                                )
                            }
                            onChange={newDate => handleFormChange('newExpiryDate', newDate)}
                            required
                        />
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
};

export default ExpiryToolForm;
