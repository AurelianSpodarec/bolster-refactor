import React, { useState } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { CRS } from 'leaflet';


import Block from 'components/shared/generic/block/presentational/Block';
import { FILE_STORAGE_URL } from 'config';
import MergeMapPin from './MergeMapPin';


const MergeDrawingMap = ({
    drawing = {},
    points, 
    setPoints
}) => {
    // alternates between A/B
    const [currentPoint, setCurrentPoint] = useState('A');

    const onClick = ({ latlng }) => {
        const {lat, lng} = latlng;
        setPoints({...points, [currentPoint]: {latY: lat, lngX: lng}});

        if (currentPoint === 'A') {
            setCurrentPoint('B');
        } else {
            setCurrentPoint('A');
        }
    };

    return (
        <Block>
            <Map
                center={[-128, 128]}
                zoom={1}
                minZoom={0}
                maxZoom={6}
                onClick={onClick}
                crs={CRS.Simple}
            >
                <TileLayer
                    attribution='&amp;copy <a href="http://app.bolstersystems.com">Bolster Systems Ltd</a>'
                    url={`${FILE_STORAGE_URL}/${drawing.tilesetS3Key}/{z}/{x}/{y}.jpg`}
                    noWrap={true}
                />
                {!!points.A &&
                    <MergeMapPin point={points.A} name="A"/>
                }   
                {!!points.B &&
                    <MergeMapPin point={points.B} name="B"/>
                }   
            </Map>
        </Block>
    );
};

export default MergeDrawingMap;