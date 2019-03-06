import React from 'react';
import { Link } from 'react-router-dom';

const DrawingInspectionLog = () => (
    <div className="size-lg-12">
        <h2 className="heading heading-3 size-lg-12">Inspection Log</h2>
        <Link to="/drawings/3/pin/5" className="button">
            View Pin
        </Link>
    </div>
);

export default DrawingInspectionLog;
