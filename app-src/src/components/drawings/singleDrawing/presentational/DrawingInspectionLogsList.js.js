import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const DrawingInspectionLogsList = ({ inspectionLogs }) =>
    [...inspectionLogs]
        .sort((a, b) => moment(b.updated) - moment(a.updated))
        .map(inspectionLog => (
            <tr key={inspectionLog.id}>
                <td>{inspectionLog.name}</td>
                <td>{inspectionLog.status}</td>
                <td>
                    <Link to={inspectionLog.link} className="button">
                        View
                    </Link>
                </td>
            </tr>
        ));

export default DrawingInspectionLogsList;
