import React, { Component } from 'react';
import { FeatureGroup } from 'react-leaflet';
import L from 'leaflet';
import { EditControl } from 'react-leaflet-draw';
import '../../../../../../node_modules/leaflet-draw/dist/leaflet.draw.css';

export default class DrawingMapZones extends Component {
    state = {
        renderKids: false
    }

    fgRef = React.createRef(null);
    // see http://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#l-draw-event for leaflet-draw events doc

    _onEdited = (e) => {

        let numEdited = 0;
        e.layers.eachLayer((layer) => {
            numEdited += 1;
        });
        console.log(`_onEdited: edited ${numEdited} layers`, e);

        this._onChange();
    }

    _onCreated = (e) => {
        let type = e.layerType;
        let layer = e.layer;
        if (type === 'marker') {
            // Do marker specific actions
            console.log('_onCreated: marker created', e);
        }
        else {
            console.log('_onCreated: something else created:', type, e);
        }
        // Do whatever else you need to. (save to db; etc)

        this._onChange();
    }

    _onDeleted = (e) => {

        let numDeleted = 0;
        e.layers.eachLayer((layer) => {
            numDeleted += 1;
        });
        console.log(`onDeleted: removed ${numDeleted} layers`, e);

        this._onChange();
    }

    _onMounted = () => {
        let leafletGeoJSON = new L.GeoJSON(getGeoJson());
        let leafletFG = this.fgRef.current.leafletElement;

        leafletGeoJSON.eachLayer((layer) => {
            leafletFG.addLayer(layer);
        });
    }

    _onEditStart = (e) => {
        console.log('_onEditStart', e);
    }

    _onEditStop = (e) => {
        console.log('_onEditStop', e);
    }

    _onDeleteStart = (e) => {
        console.log('_onDeleteStart', e);
    }

    _onDeleteStop = (e) => {
        console.log('_onDeleteStop', e);
    }

    render() {

        return (
            <FeatureGroup ref={this.fgRef} >
                {this.state.renderKids && <EditControl
                    position='topright'
                    onEdited={this._onEdited}
                    onCreated={this._onCreated}
                    onDeleted={this._onDeleted}
                    onMounted={this._onMounted}
                    onEditStart={this._onEditStart}
                    onEditStop={this._onEditStop}
                    onDeleteStart={this._onDeleteStart}
                    onDeleteStop={this._onDeleteStop}
                    draw={{
                        polyline: false,
                        rectangle: false,
                        circle: false,
                        marker: false,
                        circlemarker: false,
                    }}
                />}

            </FeatureGroup>
        );
    }

    componentDidMount() {
        this.setState({ renderKids: true });
    }

    _onChange = () => {
        // this.fgRef contains the edited geometry, which can be manipulated through the leaflet API
        const { onChange } = this.props;

        if (!this.fgRef || !onChange) {
            return;
        }

        const geojsonData = this.fgRef.leafletElement.toGeoJSON();
        onChange(geojsonData);
    }
}

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
                                -68.69921875,
                                78.40234375
                            ],
                            [
                                -136.5,
                                165.80078125
                            ],
                            [
                                -189.80078125,
                                119.5625
                            ],
                            [
                                -91.94140625,
                                31.01953125
                            ]
                        ]
                    ]
                }
            },
        ]
    };
}