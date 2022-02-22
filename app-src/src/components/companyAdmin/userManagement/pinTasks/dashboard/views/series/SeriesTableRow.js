import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import React from 'react';
import SeriesTableRowPins from './SeriesTableRowPins';

const SeriesListRow = ({ pinTaskSeries, startEditPinTaskSeries }) => {
    const {
        id,
        operativeFirstName,
        operativeLastName,
        siteName,
        buildingName,
        floorName,
        drawingName,
        pinCount,
        recurrenceStartsOn,
        recurrenceEndsOn,
        drawingID,
        pins,
    } = pinTaskSeries;

    return (
        <tr>
            <td>
                {operativeFirstName} {operativeLastName}
            </td>
            <td>
                <a className="link-without-decoration" href={`/company/drawings/${drawingID}`}>
                    {siteName}/{buildingName}/{floorName}/{drawingName}
                </a>
            </td>
            <td>
                <SeriesTableRowPins pinCount={pinCount} pins={pins} />
            </td>
            <td>
                <DateTimeContainer
                    datetime={DATE_TIME_IDS.DATE}
                    date={new Date(recurrenceStartsOn)}
                />
            </td>
            <td>
                {!recurrenceEndsOn ? (
                    'Indefinite'
                ) : (
                    <DateTimeContainer
                        datetime={DATE_TIME_IDS.DATE}
                        date={new Date(recurrenceEndsOn)}
                    />
                )}
            </td>
            <td>N/A</td>
            <td>
                <button
                    className="button yellow"
                    type="button"
                    onClick={() => startEditPinTaskSeries(id)}
                >
                    <i className="far fa-pencil" />
                    Edit Series
                </button>
            </td>
        </tr>
    );
};

export default SeriesListRow;
