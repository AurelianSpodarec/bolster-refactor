import '../../../../../../node_modules/leaflet-draw/dist/leaflet.draw.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import L from 'leaflet';
import { FeatureGroup } from 'react-leaflet';

class DrawingMapViewZones extends Component {
    state = {
        renderKids: false,
    };

    leafletGeoJSON = new L.GeoJSON(this.getGeoJson());
    fgRef = React.createRef(null);

    render() {
        return <FeatureGroup ref={this.fgRef} />;
    }

    componentDidMount() {
        this.setZones();
    }

    componentDidUpdate(prevProps) {
        const { curZoom, opacity, zones } = this.props;
        const layers = this.leafletGeoJSON;

        if (zones.length !== prevProps.zones.length) {
            this.setZones();
        }

        if (prevProps.opacity !== opacity) {
            layers.eachLayer((layer) =>
                layer.setStyle({ fillOpacity: opacity })
            );
        }

        if (prevProps.curZoom !== curZoom) {
            layers.eachLayer((layer) => {
                layer.unbindTooltip();
                layer
                    .bindTooltip(layer.feature.name, {
                        permanent: true,
                        className: `zone-tooltip ${
                            curZoom < 1
                                ? 'small-zoom'
                                : curZoom > 2
                                ? 'large-zoom'
                                : ''
                        }`,
                        offset: [0, 0],
                        direction: 'center',
                    })
                    .openTooltip();
            });
        }
    }

    // order of values in coordinates array is lng, lat
    getGeoJson() {
        const { zones } = this.props;
        const zonesArr = Object.values(zones);

        const zoneFeatures = {
            type: 'FeatureCollection',
            features: zonesArr.map((zone) => {
                return {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'Polygon',
                        coordinates: [zone.coordinates],
                    },
                    color: zone.colorHex,
                    name: zone.name,
                };
            }),
        };

        return zoneFeatures;
    }

    setZones() {
        const { curZoom, opacity } = this.props;
        const leafletFG = this.fgRef.current.leafletElement;

        this.leafletGeoJSON.eachLayer((layer) => {
            const layerColor = layer.feature.color;
            const layerName = layer.feature.name;

            layer.setStyle({
                fillColor: layerColor,
                color: layerColor,
                fillOpacity: opacity,
            });

            layer
                .bindTooltip(layerName, {
                    permanent: true,
                    className: `zone-tooltip ${
                        curZoom < 1
                            ? 'small-zoom'
                            : curZoom > 2
                            ? 'large-zoom'
                            : ''
                    }`,
                    offset: [0, 0],
                    direction: 'center',
                })
                .openTooltip();

            leafletFG.addLayer(layer);
        });
    }
}

const mapState = ({ companyAdmin }) => ({
    opacity: companyAdmin.zonesReducer.zonesOpacity,
});

export default connect(mapState)(DrawingMapViewZones);
