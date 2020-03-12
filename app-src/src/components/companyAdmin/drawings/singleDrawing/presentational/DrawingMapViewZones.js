import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FeatureGroup } from 'react-leaflet';
import L from 'leaflet';
import '../../../../../../node_modules/leaflet-draw/dist/leaflet.draw.css';

class DrawingMapViewZones extends Component {
    state = {
        renderKids: false
    }

    leafletGeoJSON = null;
    fgRef = React.createRef(null);

    render() {
        return (
            <FeatureGroup ref={this.fgRef} />
        );
    }

    componentDidMount() {
        const { zonesOpacity } = this.props;
        this.leafletGeoJSON = new L.GeoJSON(getGeoJson());
        const leafletFG = this.fgRef.current.leafletElement;

        this.leafletGeoJSON.eachLayer((layer) => {
            layer.setStyle({ fillColor: '#b0e435', color: '#b0e435', fillOpacity: zonesOpacity });
            leafletFG.addLayer(layer);
        });
    }

    componentDidUpdate(prevProps) {
        const { zonesOpacity } = this.props;
        const layers = this.leafletGeoJSON;

        if (prevProps.zonesOpacity !== zonesOpacity) {
            layers.eachLayer(layer => layer.setStyle({ fillOpacity: zonesOpacity }));
        }
    }
}

// order of values in coordinates array is lng, lat
function getGeoJson() {
    return {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': [
                        [
                            [
                                78.40234375,
                                -68.69921875
                            ],
                            [
                                165.80078125,
                                -136.5
                            ],
                            [
                                119.5625,
                                -189.80078125
                            ],
                            [
                                31.01953125,
                                -91.94140625
                            ]
                        ]
                    ]
                },
            },
            {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': [
                        [
                            [
                                222.529296875,
                                -129.25390625
                            ],
                            [
                                221.6640625,
                                -106.111328125
                            ],
                            [
                                228.084228515625,
                                -106.321044921875
                            ],
                            [
                                228.086669921875,
                                -97.56640625
                            ],
                            [
                                245.22021484375,
                                -97.71044921875
                            ],
                            [
                                245.56396484375,
                                -106.0205078125
                            ],
                            [
                                249.15478515625,
                                -105.97802734375
                            ],
                            [
                                248.85888671875,
                                -129.001953125
                            ]
                        ]
                    ]
                }
            },
        ]
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            zonesReducer: { zonesOpacity }
        }
    }
) => ({
    zonesOpacity
});

export default connect(mapStateToProps)(DrawingMapViewZones);