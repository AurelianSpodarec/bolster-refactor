import React from 'react';
import { useSelector } from 'react-redux';

const FilterMapTabs = ({ drawingIDs, selectedDrawingID, setSelectedDrawingID }) => {
    const drawings = useSelector(mapStateToProps);

    return (
        <div className="page-heading size-lg-12">
            <div className="content-container">
                <div className="tab-container">
                    {drawingIDs.map(drawingID => (
                        <button
                            key={drawingID}
                            className={drawingID === selectedDrawingID ? 'active' : ''}
                            onClick={() => setSelectedDrawingID(drawingID)}
                        >
                            <span>{drawings[drawingID].name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({
    companyAdmin: {
        drawingsReducer: { drawings },
    },
}) => drawings;

export default FilterMapTabs;
