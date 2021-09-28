import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockContainerFetch from 'components/shared/generic/block/containers/BlockContainerFetch';
import { isEmpty } from 'helpers/generic';
import Field from 'components/shared/generic/form/presentational/Field';
import Select from 'components/shared/generic/form/presentational/Select';
import MergeToolBoxes from './MergeToolBoxes';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';

const MergeToolForm = ({
    companiesOptions,
    fetchingCompanies,
    companiesError,
    companyID,
    setCompanyID,
    drawingsOptions,
    pinsOptions,
    selectedPins,
    setSelectedPins,
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
    isFetchingPins,
    pinsError,
    handleCSVUpload,
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
            <MergeToolBoxes
                drawingsOptions={drawingsOptions}
                drawings={drawings}
                sourceDrawingID={sourceDrawingID}
                setSourceDrawingID={setSourceDrawingID}
                sourceDrawingPoints={sourceDrawingPoints}
                setSourceDrawingPoints={setSourceDrawingPoints}
                destDrawingID={destDrawingID}
                setDestDrawingID={setDestDrawingID}
                destDrawingPoints={destDrawingPoints}
                setDestDrawingPoints={setDestDrawingPoints}
                fetchingDrawings={fetchingDrawings}
                pinsOptions={pinsOptions}
                selectedPins={selectedPins}
                setSelectedPins={setSelectedPins}
                isFetchingPins={isFetchingPins}
                pinsError={pinsError}
                handleCSVUpload={handleCSVUpload}
            />
        )}

        {shouldShowSubmit && (
            <ButtonContainer handleClick={handleSubmit}>
                Merge source drawing into destination drawing
            </ButtonContainer>
        )}
        {isPosting && (
            <ButtonContainer handleClick={() => {}} disabled>
                Sending merge request...
            </ButtonContainer>
        )}
    </BlockContainer>
);

export default MergeToolForm;
