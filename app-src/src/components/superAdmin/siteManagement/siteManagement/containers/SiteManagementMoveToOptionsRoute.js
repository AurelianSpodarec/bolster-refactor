import React, { Component } from 'react';
import { connect } from 'react-redux';

import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';
import Field from 'components/shared/generic/form/presentational/Field';

const { BUILDING, FLOOR, DRAWING } = HIERARCHY_IDS;

const Sites = ({ sites }) => {
    return (
        <Field name="Select a site" classes="full-length">
            {sites.map(site => (
                <p key={site.id} className="select-option size-lg-12">
                    {site.name}
                </p>
            ))}
        </Field>
    );
};

const Buildings = ({ buildings }) => {
    return (
        <Field name="Select a building" classes="full-length">
            {buildings.map(building => (
                <p key={building.id} className="select-option size-lg-12">
                    {building.name}
                </p>
            ))}
        </Field>
    );
};

const Floors = ({ floors }) => {
    return (
        <Field name="Select a floor" classes="full-length">
            {floors.map(floor => (
                <p key={floor.id} className="select-option size-lg-12">
                    {floor.name}
                </p>
            ))}
        </Field>
    );
};

class SiteManagementMoveFromOptionsRoute extends Component {
    render() {
        const { hierarchyID, sites, buildings, floors } = this.props;

        const listTypes = {
            [BUILDING]: Sites,
            [FLOOR]: Buildings,
            [DRAWING]: Floors
        };

        const SpecificField = listTypes[hierarchyID + ''] || null;

        if (!SpecificField) return null;

        return (
            <SpecificField
                sites={sites}
                buildings={buildings}
                floors={floors}
            />
        );
    }
}

const mapStateToProps = ({
    superAdmin: {
        sitesReducer: { sites },
        buildingsReducer: { buildings },
        floorsReducer: { floors }
    }
}) => ({
    sites: Object.values(sites),
    buildings: Object.values(buildings),
    floors: Object.values(floors)
});

export default connect(mapStateToProps)(SiteManagementMoveFromOptionsRoute);
