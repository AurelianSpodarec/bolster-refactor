import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import DrawingMapFiltersSimple from '../presentational/DrawingMapFiltersSimple';
import DrawingMapViewSimple from '../presentational/DrawingMapViewSimple';
import { PIN_STATUS_IDS } from 'constants/companyAdmin/enums';

class DrawingMapAdvancedContainer extends Component {
    state = {
        pinLat: -128,
        pinLng: 128,
        mapZoom: 3
    };

    render() {
        const position = [this.state.pinLat, this.state.pinLng];
        const { pins, drawing } = this.props;

        return (
            <div className="size-lg-12">
                <DrawingMapFiltersSimple
                    installed={getPinCount(pins, PIN_STATUS_IDS.INSTALLED)}
                    inspected={getPinCount(pins, PIN_STATUS_IDS.INSPECTED)}
                    noAction={getPinCount(pins, PIN_STATUS_IDS.NO_ACTION)}
                    action={getPinCount(pins, PIN_STATUS_IDS.ACTION_REQUIRED)}
                    other={getPinCount(pins, PIN_STATUS_IDS.OTHER)}
                />
                <DrawingMapViewSimple
                    position={position}
                    zoom={this.state.mapZoom}
                    pins={pins}
                    drawing={drawing}
                />
            </div>
        );
    }
}

const mapStateToProps = (
    {
        companyAdmin: {
            pinsReducer: { isFetching, error, pins },
            drawingsReducer: { drawings },
            reportsReducer: {
                filters: { pinIDs }
            }
        }
    },
    { match: { params } }
) => ({
    pins: Object.values(pins).filter(({ id }) => pinIDs.includes(id)),
    isFetching,
    error,
    drawing: drawings[params.id]
});

const WithConnect = connect(mapStateToProps)(DrawingMapAdvancedContainer);

export default withRouter(WithConnect);

function getPinCount(pins, status) {
    return pins.filter(pin => pin.latestStatus === status).length;
}
