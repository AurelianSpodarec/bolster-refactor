import React from 'react';
import { connect } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { VIEW_ZONES } from 'constants/shared/modalTypes';

import ZoneDetailsModal from '../presentational/ZoneDetailsModal';

const ZoneDetailsModalContainer = ({ zone, showModal }) => {
    return <ZoneDetailsModal zone={zone} handleHideDetails={handleHideDetails} />;

    function handleHideDetails() {
        showModal(VIEW_ZONES);
    }

    function _getPinsIncludedPinIDs() {
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
    }

    function _filterPinsWithinPolygon(poly) {
        const {
            customFilters: { pins }
        } = this.props;

        return pins.filter(({ location: { lngX, latY } }) => {
            const point = [lngX, latY];
            const inside = this._isInsidePolygon(point, poly);
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
                yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
            if (intersect) inside = !inside;
        }

        return inside;
    }
};

const mapDispatchToProps = {
    showModal,
};

export default connect(null, mapDispatchToProps)(ZoneDetailsModalContainer);

