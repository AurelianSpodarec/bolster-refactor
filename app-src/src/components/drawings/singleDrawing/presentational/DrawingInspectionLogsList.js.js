import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const DrawingInspectionLogsList = ({ inspectionLogs }) =>
    [...inspectionLogs]
        .sort((a, b) => moment(b.updated) - moment(a.updated))
        .slice(0, 5)
        .map(inspectionLog => (
            <tr key={inspectionLog.id}>
                <td>{inspectionLog.name}</td>
                <td>{inspectionLog.status}</td>
                <td>
                    <Link
                        to={`/pins/${inspectionLog.pinId}`}
                        className="button"
                    >
                        View
                    </Link>
                </td>
            </tr>
        ));

export default DrawingInspectionLogsList;
