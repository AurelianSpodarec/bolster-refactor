import React from 'react';
import { connect } from 'react-redux';

import ZonesIncluded from '../presentational/ZonesIncluded';

const ZonesIncludedContainer = ({ pin, zones }) => {
    return <ZonesIncluded zones={_filterZonesWithPin()} />;

    function _filterZonesWithPin() {
        const pinLocation = pin.location;
        const point = [pinLocation.lngX, pinLocation.latY];
        const zonesList = [];

        zones.map(({ name, coordinates }) => {
            var x = point[0],
                y = point[1];

            for (
                var i = 0, j = coordinates.length - 1;
                i < coordinates.length;
                j = i++
            ) {
                var xi = coordinates[i][0],
                    yi = coordinates[i][1];
                var xj = coordinates[j][0],
                    yj = coordinates[j][1];

                var intersect =
                    yi > y != yj > y &&
                    x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
                if (intersect) {
                    zonesList.push(name);
                }
            }
        });

        return zonesList;
    }
};

const mapStateToProps = ({
    companyAdmin: {
        zonesReducer: { zones },
    },
}) => ({
    zones: Object.values(zones),
});

export default connect(mapStateToProps)(ZonesIncludedContainer);
