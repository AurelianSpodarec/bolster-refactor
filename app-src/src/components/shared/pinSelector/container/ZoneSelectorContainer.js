import React, { Component } from 'react';
import { connect } from 'react-redux';

import ZoneSelector from '../presentational/ZoneSelector';
import withUpdateOnChange from 'components/companyAdmin/reports/createReport/components/hocs/withUpdateOnChange';

class ZoneSelectorContainer extends Component {
    state = {
        zoneOptions: [],
        included: []
    };

    render() {
        const { fieldError, isClient } = this.props;
        const { included, excluded } = this._getOptions();

        return (
            <ZoneSelector
                included={included}
                excluded={excluded}
                handleExclude={this.handleExclude}
                handleInclude={this.handleInclude}
                error={fieldError}
                isClient={isClient}
            />
        );
    }

    componentDidMount = () => {
        this._setZoneOptions();
    };

    componentWillUnmount = () => {
        const { handleChange, removeFieldError, blockName } = this.props;
        handleChange('pinIDs', []);
        removeFieldError(blockName);
    };

    componentDidUpdate = ({ customFilters: { pins: prevPins = [] } }) => {
        const {
            customFilters: { pins = [] }
        } = this.props;

        if (prevPins.length !== pins.length) {
            this._setZoneOptions();
        }
    };

    _getOptions = () => {
        const { zoneOptions, included } = this.state;
        return zoneOptions.reduce(
            (acc, opt) => {
                included.includes(opt.value)
                    ? acc.included.push(opt)
                    : acc.excluded.push(opt);

                return acc;
            },
            {
                included: [],
                excluded: []
            }
        );
    };

    _getPinsIncludedPinIDs = () => {
        const { zonesObj } = this.props;
        const { included } = this.state;

        const pinIDsWithinZones = included
            .map(id => zonesObj[id])
            .filter(zone => zone)
            .map(({ coordinates }) => coordinates)
            .reduce((acc, poly) => {
                const pinIDsWithinCoords = this._filterPinsWithinPolygon(poly);
                return acc.concat(pinIDsWithinCoords);
            }, [])
            .map(pin => pin.id);

        return pinIDsWithinZones;
    };

    _filterPinsWithinPolygon = poly => {
        const {
            customFilters: { pins }
        } = this.props;

        return pins.filter(({ location: { lngX, latY } }) => {
            const point = [lngX, latY];
            const inside = this._isInsidePolygon(point, poly);
            return inside;
        });
    };

    _isInsidePolygon = (point, polygon) => {
        var x = point[0],
            y = point[1];

        var inside = false;
        for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            var xi = polygon[i][0],
                yi = polygon[i][1];
            var xj = polygon[j][0],
                yj = polygon[j][1];

            var intersect =
                yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
            if (intersect) inside = !inside;
        }

        return inside;
    };

    _setZoneOptions = () => {
        const { zonesObj } = this.props;
        const zoneOptions = Object.values(zonesObj).map(
            ({ id, name, colorHex }) => ({
                value: id,
                text: name,
                colorHex
            })
        );

        this.setState({ zoneOptions, includedZones: [] }, this._handleChange);
    };

    _handleChange = () => {
        const { handleChange } = this.props;

        const pinIDs = this._getPinsIncludedPinIDs();
        handleChange('pinIDs', pinIDs);

        this._validate(pinIDs);
    };

    _validate = pinIDs => {
        const { blockName, addFieldError, removeFieldError } = this.props;

        if (!pinIDs.length) {
            const error = 'You must include some pins in the report.';
            addFieldError(blockName, error);
        } else {
            removeFieldError('zoneSelector');
        }
    };

    handleInclude = zoneIDs => {
        const { included } = this.state;
        const updated = included.concat(zoneIDs);
        this.setState({ included: updated }, this._handleChange);
    };

    handleExclude = zoneIDs => {
        const { included } = this.state;
        const updated = included.filter(val => !zoneIDs.includes(val));
        this.setState({ included: updated }, this._handleChange);
    };
}

const mapStateToProps = ({
    companyAdmin: {
        pinsReducer: { pins }
    }
}) => ({
    pinsObj: Object.values(pins)
});
export default withUpdateOnChange(
    connect(mapStateToProps, null)(ZoneSelectorContainer)
);
