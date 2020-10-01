import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isEmpty } from 'helpers/generic';
import Field from 'components/shared/generic/form/presentational/Field';
import Select from 'components/shared/generic/form/presentational/Select';

const ExpiryToolForm = ({
    companiesOptions,
    fetchingCompanies,
    companiesError,
    companyID,
    setCompanyID,
    drawingsOptions,
    drawings,
    sourceDrawingID,
    setSourceDrawingID,
    sourceDrawingPoints,
    setSourceDrawingPoints,
    destDrawingID,
    setDestDrawingID,
    destDrawingPoints,
    setDestDrawingPoints,
    shouldShowSubmit,
    handleSubmit,
    isPosting,
    fetchingDrawings,
}) => (
    <BlockContainer
        isFetching={fetchingCompanies}
        error={companiesError}
        isEmpty={isEmpty(companiesOptions)}
    >
        <Field name="Select a company" classes>
            <Select
                name="companyID"
                options={companiesOptions}
                value={companyID}
                onChange={(_, value) => setCompanyID(value)}
                search
                omitPlaceholder
            />
        </Field>
    </BlockContainer>
);

export default ExpiryToolForm;
