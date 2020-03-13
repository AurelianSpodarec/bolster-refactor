import '../../../../../../node_modules/leaflet-draw/dist/leaflet.draw.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import L from 'leaflet';
import { FeatureGroup } from 'react-leaflet';

class DrawingMapViewZones extends Component {
    state = {
        renderKids: false
    };

    leafletGeoJSON = new L.GeoJSON(this.getGeoJson());
    fgRef = React.createRef(null);

    render() {
        return <FeatureGroup ref={this.fgRef} />;
    }

    componentDidMount() {
        const { zonesOpacity } = this.props;
        const leafletFG = this.fgRef.current.leafletElement;

        this.leafletGeoJSON.eachLayer(layer => {
            const layerColor = layer.feature.color;

            layer.setStyle({
                fillColor: layerColor,
                color: layerColor,
                fillOpacity: zonesOpacity,
            });
            leafletFG.addLayer(layer);
        });
    }

    componentDidUpdate(prevProps) {
        const { zonesOpacity } = this.props;
        const layers = this.leafletGeoJSON;

        if (prevProps.zonesOpacity !== zonesOpacity) {
            layers.eachLayer(layer =>
                layer.setStyle({ fillOpacity: zonesOpacity })
            );
        }
    }

    // order of values in coordinates array is lng, lat
    getGeoJson() {
        const { zones } = this.props;
        const zonesArr = Object.values(zones);

        const zoneFeatures = {
            type: 'FeatureCollection',
            features: zonesArr.map(zone => {
                return {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'Polygon',
                        coordinates: [JSON.parse(zone.coordinates)]
                    },
                    color: zone.colorHex
                };
            })
        };

        return zoneFeatures;
    }
}

const mapStateToProps = ({
    companyAdmin: {
        zonesReducer: { zonesOpacity, zones }
    }
}) => ({
    zonesOpacity,
    zones
});

export default connect(mapStateToProps)(DrawingMapViewZones);
