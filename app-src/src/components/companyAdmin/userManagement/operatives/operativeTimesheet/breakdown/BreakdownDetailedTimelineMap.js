import React from 'react';
import GoogleMapReact from 'google-map-react';
import BreakdownPositionCard from './BreakdownPositionCard';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';

const BreakdownDetailedTimelineMap = ({
    markers = [],
    className = '',
    zoom = 18,
    disable = false,
}) => {
    const startLocation = markers.find(marker => !marker.location.isEmpty)?.location || {
        x: 0,
        y: 0,
    };

    return (
        <div className={`${className} breakdown-detailed-timeline-map`}>
            {(markers.length === 0 || disable) && (
                <div className="no-data-cover">
                    <p className="no-data-message">No mapping data available</p>
                </div>
            )}
            <GoogleMapReact
                center={{ lat: startLocation.y, lng: startLocation.x }}
                defaultZoom={zoom}
                bootstrapURLKeys={{
                    key: 'AIzaSyAPCib6iO1b_MTcuzMmb2wx_CyvgGfqmgo',
                }}
                options={maps => ({
                    zoomControl: true,
                    zoomControlOptions: {
                        position: maps.ControlPosition.TOP_RIGHT,
                    },
                })}
            >
                {markers.map(({ location, type, name, timestamp, jobReference }, i) => {
                    if (location.isEmpty) return null;

                    return (
                        <Marker key={i} lat={location.y} lng={location.x} type={type}>
                            {/* Disabled tooltip for timebeing - available to be re-enaled */}
                            {/* <div className="tooltip">
                                <div className="text">
                                    <p className="title">
                                        {name} -{' '}
                                        <DateTimeContainer
                                            date={new Date(timestamp)}
                                            datetime={DATE_TIME_IDS.TIME}
                                        />
                                    </p>
                                    <p className="reference">Reference: {jobReference}</p>
                                </div>
                                <BreakdownPositionCard location={location} />
                            </div> */}
                        </Marker>
                    );
                })}
            </GoogleMapReact>
        </div>
    );
};

const Marker = ({ children, type }) => {
    const color = {
        clockIn: 'green',
        clockOut: 'red',
        breakIn: 'yellow',
        breakOut: 'yellow',
    }[type];

    return (
        <div className="marker">
            <div className={`circle ${color}`}></div>

            {children}
        </div>
    );
};

export default BreakdownDetailedTimelineMap;
