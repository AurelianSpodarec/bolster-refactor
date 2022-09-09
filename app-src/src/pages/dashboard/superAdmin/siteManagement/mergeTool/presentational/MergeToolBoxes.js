import React from 'react';
import MergeDrawingMap from './MergeDrawingMap';
import Field from 'components/shared/generic/form/presentational/Field';
import Select from 'components/shared/generic/form/presentational/Select';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import BlockContainerFetch from 'components/shared/generic/block/containers/BlockContainerFetch';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';
import MergeToolCSVUploader from 'components/shared/generic/form/containers/MergeToolCSVUploader';

const MergeToolBoxes = ({
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
    fetchingDrawings,
    pinsOptions,
    selectedPins,
    setSelectedPins,
    isFetchingPins,
    pinsError,
    handleCSVUpload,
    csvError,
}) =>
    fetchingDrawings ? (
        <Loading message="Fetching drawings..." />
    ) : (
        <>
            <div className="size-lg-6 size-md-12">
                <Field name="Select source drawing">
                    <Select
                        name="sourceDrawingID"
                        options={drawingsOptions}
                        onChange={(_, id) => setSourceDrawingID(id)}
                        value={sourceDrawingID}
                        search
                        omitPlaceholder
                    />
                </Field>
            </div>
            <div className="size-lg-6 size-md-12">
                <Field name="Select destination drawing">
                    <Select
                        name="destDrawingID"
                        options={drawingsOptions}
                        onChange={(_, id) => setDestDrawingID(id)}
                        value={destDrawingID}
                        search
                        omitPlaceholder
                    />
                </Field>
            </div>

            {!!sourceDrawingID && (
                <div className="size-lg-12">
                    <Field name="Upload PinIDs">
                        <BlockContainerFetch
                            isFetching={isFetchingPins}
                            error={pinsError}
                            noWhiteBackground
                        >
                            <MergeToolCSVUploader
                                handleChange={handleCSVUpload}
                                sourceDrawingID={sourceDrawingID}
                                csvError={csvError}
                            />
                        </BlockContainerFetch>
                    </Field>
                </div>
            )}

            <div className="size-lg-12">
                {!!sourceDrawingID && (
                    <Field name="Select pins">
                        <BlockContainerFetch
                            isFetching={isFetchingPins}
                            error={pinsError}
                            noWhiteBackground
                        >
                            <MultiSelect
                                search
                                options={pinsOptions}
                                value={selectedPins}
                                name="selectedPins"
                                onChange={(_, value) => setSelectedPins(value)}
                                placeholder="All pins"
                            />
                        </BlockContainerFetch>
                    </Field>
                )}
            </div>

            <div className="size-lg-6 size-md-12">
                {!!sourceDrawingID && (
                    <MergeDrawingMap
                        drawing={drawings[sourceDrawingID]}
                        points={sourceDrawingPoints}
                        setPoints={setSourceDrawingPoints}
                    />
                )}
            </div>
            <div className="size-lg-6 size-md-12">
                {!!destDrawingID && (
                    <MergeDrawingMap
                        drawing={drawings[destDrawingID]}
                        points={destDrawingPoints}
                        setPoints={setDestDrawingPoints}
                    />
                )}
            </div>
        </>
    );

export default MergeToolBoxes;
