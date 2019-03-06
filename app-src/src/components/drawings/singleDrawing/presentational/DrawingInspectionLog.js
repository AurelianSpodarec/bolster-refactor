import React from 'react';
import { Link } from 'react-router-dom';

const DrawingInspectionLog = () => (
    <div className="size-lg-12">
        <p>Inspection Log</p>
        <Link to="/drawings/3/pin/5" className="button">
            View Pin
        </Link>
    </div>
);

export default DrawingInspectionLog;
