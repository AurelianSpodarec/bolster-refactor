/* eslint no-mixed-operators: 0 */

import React from 'react';
import { connect } from 'react-redux';

import greenPin from '_content/images/map-markers/green-pin2x.png';
import redPin from '_content/images/map-markers/red-pin2x.png';
import bluePin from '_content/images/map-markers/blue-pin2x.png';
import yellowPin from '_content/images/map-markers/yellow-pin2x.png';
import purplePin from '_content/images/map-markers/purple-pin2x.png';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { VIEW_ZONES } from 'constants/shared/modalTypes';

import ZoneDetailsModal from '../presentational/ZoneDetailsModal';
import { PIN_STATUS_IDS } from 'constants/companyAdmin/enums';

const ZoneDetailsModalContainer = ({ zone, pins, servicesObj, showModal }) => {
    return (
        <ZoneDetailsModal
            zone={zone}
            handleHideDetails={handleHideDetails}
            services={_getServiceAreas()}
            getStatusIcon={_getStatusIcon}
        />
    );

    function handleHideDetails() {
        showModal(VIEW_ZONES);
    }

    function _getPinsIncludedPinIDs() {
        const pinIDsWithinZones = zone.coordinates
            .reduce((acc) => {
                const pinIDsWithinCoords = _filterPinsWithinPolygon();
                return acc.concat(pinIDsWithinCoords);
            }, [])
            .map((pin) => pin.id);

        return [...new Set(pinIDsWithinZones)];
    }

    function _filterPinsWithinPolygon() {
        return pins.filter(({ location: { lngX, latY } }) => {
            const point = [lngX, latY];
            const inside = _isInsidePolygon(point, zone.coordinates);

            return inside;
        });
    }

    function _isInsidePolygon(point, polygon) {
        var x = point[0],
            y = point[1];

        var inside = false;
        for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            var xi = polygon[i][0],
                yi = polygon[i][1];
            var xj = polygon[j][0],
                yj = polygon[j][1];

            var intersect =
                yi > y !== yj > y &&
                x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
            if (intersect) inside = !inside;
        }

        return inside;
    }

    function _getFilteredPins() {
        const pinsInZone = _getPinsIncludedPinIDs();
        const filteredPins = pins.filter(({ id }) => pinsInZone.includes(id));

        return filteredPins;
    }

    function _getServiceAreas() {
        const filteredPins = _getFilteredPins();
        const filteredServices = [
            ...new Set(
                filteredPins.map(({ latestServiceID }) => latestServiceID)
            ),
        ];

        const services = [];

        filteredServices.forEach((service) => {
            const curService = servicesObj[service];

            const pinsInService = filteredPins.filter(
                ({ latestServiceID }) => latestServiceID === service
            );

            services.push({
                id: curService.id,
                name: curService.name,
                pins: pinsInService,
            });
        });

        return services.sort((a, b) => a.id - b.id);
    }

    function _getStatusIcon(status) {
        const {
            ACTION_REQUIRED,
            INSTALLED,
            INSPECTED,
            NO_ACTION,
            OTHER,
        } = PIN_STATUS_IDS;

        let icon = redPin;

        switch (status) {
            case ACTION_REQUIRED:
                icon = redPin;
                break;
            case INSTALLED:
                icon = greenPin;
                break;
            case INSPECTED:
                icon = bluePin;
                break;
            case NO_ACTION:
                icon = yellowPin;
                break;
            case OTHER:
                icon = purplePin;
                break;
            default:
                icon = redPin;
        }

        return icon;
    }
};

const mapStateToProps = ({
    companyAdmin: {
        pinsReducer: { pins },
        servicesReducer: { services },
    },
}) => ({
    pins: Object.values(pins),
    servicesObj: services,
});

const mapDispatchToProps = {
    showModal,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ZoneDetailsModalContainer);
