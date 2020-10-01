import React from 'react';

import moment from 'moment';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isEmpty } from 'helpers/generic';
import Field from 'components/shared/generic/form/presentational/Field';
import Select from 'components/shared/generic/form/presentational/Select';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';

const ExpiryToolForm = ({
    companiesOptions,
    fetchingCompanies,
    companiesError,
    companyID,
    setCompanyID,
    drawingsOptions,
    setDrawingID,
    drawingID,
    currentDrawing: { id, expiresOn, createdOn },
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
        {!!companyID && (
            <Field name="Select a drawing" classes>
                <Select
                    name="companyID"
                    options={drawingsOptions}
                    value={drawingID}
                    onChange={(_, value) => setDrawingID(value)}
                    search
                    omitPlaceholder
                />
            </Field>
        )}
        {!!drawingID && (
            <Field name="Expiry Date" classes>
                <FieldOutput description={moment(expiresOn).format()} />
            </Field>
        )}
    </BlockContainer>
);

export default ExpiryToolForm;
