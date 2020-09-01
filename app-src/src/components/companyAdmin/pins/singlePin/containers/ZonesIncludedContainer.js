import React from 'react';
import { connect } from 'react-redux';

import ZonesIncluded from '../presentational/ZonesIncluded';

const ZonesIncludedContainer = ({ pin, zones }) => {
    return <ZonesIncluded zones={_filterZonesWithPin()} />;

    function _filterZonesWithPin() {
        const pinLocation = pin.location;
        const point = [pinLocation.lngX, pinLocation.latY];

        const zonesList = zones.filter(({ name, coordinates }) => {
            let x = point[0],
                y = point[1];

            for (
                let i = 0, j = coordinates.length - 1;
                i < coordinates.length;
                j = i++
            ) {
                let xi = coordinates[i][0],
                    yi = coordinates[i][1];
                let xj = coordinates[j][0],
                    yj = coordinates[j][1];

                let intersect =
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
