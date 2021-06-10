import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { usePrevious } from 'helpers/hooks';

const useMultiReportDrawings = () => {
    const { drawingIDs } = useSelector(mapStateToProps);
    const [selectedDrawingID, setSelectedDrawingID] = useState(
        drawingIDs.length ? drawingIDs[0] : null,
    );
    const prevProps = usePrevious({ drawingIDs });

    useEffect(() => {
        if (selectedDrawingID && !drawingIDs.includes(selectedDrawingID)) {
            if (drawingIDs.length) {
                setSelectedDrawingID(drawingIDs[0]);
            } else {
                setSelectedDrawingID(null);
            }
        }

        if (drawingIDs.length && !prevProps.drawingIDs.length) {
            setSelectedDrawingID(drawingIDs[0]);
        }
    }, [drawingIDs, prevProps.drawingIDs]);

    return { drawingIDs, selectedDrawingID };
};

const mapStateToProps = ({
    companyAdmin: {
        reportsReducer: { filters },
    },
}) => ({
    drawingIDs: filters.drawingID || [],
});

export default useMultiReportDrawings;
