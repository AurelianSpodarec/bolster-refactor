import React from 'react';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { FILE_STORAGE_URL } from 'config';

import MapPin from 'components/shared/pins/presentational/MapPin';

const DrawingMapViewSimple = ({
    position,
    addPinPosition,
    zoom,
    pins,
    handleClick,
    drawing,
    addMode,
    toggleAddMode
}) => (
    <>
        {addMode ? (
            <>
                <Link
                    to={`${drawing.id}/add-pin`}
                    className="button pull-right"
                >
                    <i className="fa fa-times" /> Confirm position
                </Link>
                <button className="button pull-right" onClick={toggleAddMode}>
                    <i className="fa fa-plus" /> Stop
                </button>
            </>
        ) : (
            <button className="button pull-right" onClick={toggleAddMode}>
                <i className="fa fa-plus" /> Add pin
            </button>
        )}

        <Map
            center={position}
            zoom={zoom}
            minZoom={0}
            maxZoom={5}
            onClick={e => handleClick(e)}
        >
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url={`${FILE_STORAGE_URL}/${
                    drawing.tilesetS3Key
                }/{z}/{x}/{y}.jpg`}
                noWrap={true}
            />
            {pins.map(pin => (
                <MapPin key={pin.id} pin={pin} />
            ))}
            {addMode && <Marker position={addPinPosition} />}
        </Map>
    </>
);

export default DrawingMapViewSimple;
