import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import '../../../../../../node_modules/leaflet-draw/dist/leaflet.draw.css';
import createDrawingZone from 'actions/companyAdmin/zones/async/createDrawingZone';

class DrawingMapAddZone extends Component {
    coords = null;

    render() {
        return (
            <FeatureGroup>
                <EditControl
                    position="topright"
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
                        circlemarker: false
                    }}
                />
            </FeatureGroup>
        );
    }

    _formatCoordinates = ({ _latlngs }) => {
        if (!_latlngs) return [];

        const [coords = []] = _latlngs;
        return coords.map(({ lng, lat }) => [lng, lat]);
    };

    _onCreated = ({ layerType, layer }) => {
        if (layerType === 'marker') {
            // Do marker specific actions.
        } else {
            this.coords = this._formatCoordinates(layer);
        }
    };

    _onEdited = ({ layers: { _layers } }) => {
        const editedLayers = Object.values(_layers);
        if (editedLayers.length === 0) return;

        const [layer] = editedLayers;
        this.coords = this._formatCoordinates(layer);
    };

    _onDeleted = () => {
        this.coords = null;
    };

    _handleSubmit = e => {
        e.preventDefault();

        const { drawingID, createDrawingZone } = this.props;
        const postBody = {
            name: 'test zone',
            colorHex: '#009900',
            coordinates: JSON.stringify(this.coords)
        };

        createDrawingZone(drawingID, postBody);
    };
}

const mapState = (_, ownProps) => ({
    drawingID: ownProps.match.params['id']
});
const mapDispatch = { createDrawingZone };

const WithConnect = connect(mapState, mapDispatch)(DrawingMapAddZone);

export default withRouter(WithConnect);
