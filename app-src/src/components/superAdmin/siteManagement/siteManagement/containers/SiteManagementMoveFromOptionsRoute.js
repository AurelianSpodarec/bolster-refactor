import React, { Component } from 'react';
import { connect } from 'react-redux';

import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';
import Field from 'components/shared/generic/form/presentational/Field';

const { BUILDING, FLOOR, DRAWING } = HIERARCHY_IDS;

const Buildings = ({ buildings }) => {
    return (
        <Field name="Select a building" classes="full-length">
            {buildings.map(building => (
                <p key={building.id} className="size-lg-12">
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
                <p key={floor.id} className="size-lg-12">
                    {floor.name}
                </p>
            ))}
        </Field>
    );
};

const Drawings = ({ drawings }) => {
    return (
        <Field name="Select a drawing" classes="full-length">
            {drawings.map(drawing => (
                <p key={drawing.id} className="size-lg-12">
                    {drawing.name}
                </p>
            ))}
        </Field>
    );
};

class SiteManagementMoveFromOptionsRoute extends Component {
    render() {
        const { hierarchyID, buildings, floors, drawings } = this.props;

        const listTypes = {
            [BUILDING]: Buildings,
            [FLOOR]: Floors,
            [DRAWING]: Drawings
        };

        const SpecificField = listTypes[hierarchyID + ''] || null;

        if (!SpecificField) return null;

        return (
            <SpecificField
                buildings={buildings}
                floors={floors}
                drawings={drawings}
            />
        );
    }
}

const mapStateToProps = ({
    superAdmin: {
        buildingsReducer: { buildings },
        floorsReducer: { floors },
        drawingsReducer: { drawings }
    }
}) => ({
    buildings: Object.values(buildings),
    floors: Object.values(floors),
    drawings: Object.values(drawings)
});

export default connect(mapStateToProps)(SiteManagementMoveFromOptionsRoute);
