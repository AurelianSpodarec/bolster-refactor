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
        const { curZoom, zonesOpacity } = this.props;
        const leafletFG = this.fgRef.current.leafletElement;

        this.leafletGeoJSON.eachLayer(layer => {
            const layerColor = layer.feature.color;
            const layerName = layer.feature.name;

            layer.setStyle({
                fillColor: layerColor,
                color: layerColor,
                fillOpacity: zonesOpacity,
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

    componentDidUpdate(prevProps) {
        const { curZoom, zonesOpacity } = this.props;
        const layers = this.leafletGeoJSON;

        if (prevProps.zonesOpacity !== zonesOpacity) {
            layers.eachLayer(layer =>
                layer.setStyle({ fillOpacity: zonesOpacity })
            );
        }

        if (prevProps.curZoom !== curZoom) {
            layers.eachLayer(layer => {
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
            features: zonesArr.map(zone => {
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
}

const mapStateToProps = ({
    companyAdmin: {
        zonesReducer: { zonesOpacity, zones },
    },
}) => ({
    zonesOpacity,
    zones,
});

export default connect(mapStateToProps)(DrawingMapViewZones);
