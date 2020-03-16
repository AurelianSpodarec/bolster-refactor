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
        const { fieldError } = this.props;
        const { included, excluded } = this._getOptions();

        return (
            <ZoneSelector
                included={included}
                excluded={excluded}
                handleExclude={this.handleExclude}
                handleInclude={this.handleInclude}
                error={fieldError}
            />
        );
    }

    componentDidMount = () => {
        this._setZoneOptions();
    };

    componentWillUnmount = () => {
        const {
            customFilters: { pins },
            handleChange,
            removeFieldError,
            blockName
        } = this.props;

        const pinIDs = pins.map(({ id }) => id);
        handleChange(pinIDs);
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
        const { pins, zones } = this.props;
        const { includedZones: zoneIDs } = this.state;

        const pinsWithinZones = zoneIDs
            .map(id => zones[id])
            .filter(zone => zone)
            .map(({ coordinates }) => coordinates)
            .reduce((acc, coords) => {
                // need to filter within polygon
                const pinIDsWithinCoords = [];
                return acc.concat(pinIDsWithinCoords);
            }, []);

        return pinsWithinZones;
    };

    _setZoneOptions = () => {
        const { zones } = this.props;
        const zoneOptions = zones.map(({ id, name, colorHex }) => ({
            value: id,
            text: name,
            colorHex
        }));

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

    handleInclude = pinIDs => {
        console.log({ pinIDs });
        const { included } = this.state;
        const updated = included.concat(pinIDs);
        this.setState({ included: updated }, this._handleChange);
    };

    handleExclude = pinIDs => {
        console.log({ pinIDs });
        const { included } = this.state;
        const updated = included.filter(val => !pinIDs.includes(val));
        this.setState({ included: updated }, this._handleChange);
    };
}

const mapStateToProps = ({
    companyAdmin: {
        pinsReducer: { pins }
    }
}) => ({
    pins: Object.values(pins)
});
export default withUpdateOnChange(
    connect(mapStateToProps, null)(ZoneSelectorContainer)
);
