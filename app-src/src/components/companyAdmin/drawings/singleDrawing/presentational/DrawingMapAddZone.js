import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import '../../../../../../node_modules/leaflet-draw/dist/leaflet.draw.css';
import setZoneFormCoordinates from 'actions/companyAdmin/zones/sync/setZoneFormCoordinates';

class DrawingMapAddZone extends Component {
    state = {
        polygonExists: false
    };

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
                        circlemarker: false,
                        polygon: !this.state.polygonExists
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
            const { setZoneFormCoordinates } = this.props;

            this.setState({ polygonExists: true });
            const coords = this._formatCoordinates(layer);
            setZoneFormCoordinates(coords);
        }
    };

    _onEdited = ({ layers: { _layers } }) => {
        const editedLayers = Object.values(_layers);
        if (editedLayers.length === 0) return;

        const { setZoneFormCoordinates } = this.props;

        const [layer] = editedLayers;
        const coords = this._formatCoordinates(layer);
        setZoneFormCoordinates(coords);
    };

    _onDeleted = ({ layers: { _layers } }) => {
        const editedLayers = Object.values(_layers);
        if (editedLayers.length === 0) return;
        this.setState({ polygonExists: false });
        const { setZoneFormCoordinates } = this.props;
        setZoneFormCoordinates(null);
    };
}

const mapState = (_, ownProps) => ({
    drawingID: ownProps.match.params['id']
});
const mapDispatch = { setZoneFormCoordinates };

const WithConnect = connect(mapState, mapDispatch)(DrawingMapAddZone);

export default withRouter(WithConnect);
