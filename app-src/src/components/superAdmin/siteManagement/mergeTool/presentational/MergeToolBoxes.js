import React from 'react';
import MergeDrawingMap from './MergeDrawingMap';
import Field from 'components/shared/generic/form/presentational/Field';
import Select from 'components/shared/generic/form/presentational/Select';
import Loading from 'components/shared/generic/misc/presentational/Loading';

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
    fetchingDrawings
}) => 
    fetchingDrawings ? 
        <Loading message="Fetching drawings..." /> :
    (
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
                {!!sourceDrawingID && 
                    <MergeDrawingMap 
                        drawing={drawings[sourceDrawingID]} 
                        points={sourceDrawingPoints}
                        setPoints={setSourceDrawingPoints}
                    />
                }
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
                {!!destDrawingID && 
                    <MergeDrawingMap
                        drawing={drawings[destDrawingID]}
                        points={destDrawingPoints}
                        setPoints={setDestDrawingPoints}
                    />
                }
            </div>
        </>
    );

export default MergeToolBoxes;