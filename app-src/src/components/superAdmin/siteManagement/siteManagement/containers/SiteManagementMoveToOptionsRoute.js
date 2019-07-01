import React, { Component } from 'react';
import { connect } from 'react-redux';

import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';
import Field from 'components/shared/generic/form/presentational/Field';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { CONFIRM_MOVE_HIERARCHY_TO_COMPANY } from 'constants/shared/modalTypes';

const { BUILDING, FLOOR, DRAWING } = HIERARCHY_IDS;

const Sites = ({ sites, handleSelectOption }) => {
    return (
        <Field name="Select a site" classes="full-length">
            {sites.map(site => (
                <p
                    key={site.id}
                    className="select-option size-lg-12"
                    onClick={() => handleSelectOption(site.name, site.id)}
                >
                    {site.name}
                </p>
            ))}
        </Field>
    );
};

const Buildings = ({ buildings, handleSelectOption }) => {
    return (
        <Field name="Select a building" classes="full-length">
            {buildings.map(building => (
                <p
                    key={building.id}
                    className="select-option size-lg-12"
                    onClick={() =>
                        handleSelectOption(building.name, building.id)
                    }
                >
                    {building.name}
                </p>
            ))}
        </Field>
    );
};

const Floors = ({ floors, handleSelectOption }) => {
    return (
        <Field name="Select a floor" classes="full-length">
            {floors.map(floor => (
                <p
                    key={floor.id}
                    className="select-option size-lg-12"
                    onClick={() => handleSelectOption(floor.name, floor.id)}
                >
                    {floor.name}
                </p>
            ))}
        </Field>
    );
};

class SiteManagementMoveFromOptionsRoute extends Component {
    render() {
        const {
            hierarchyID,
            sites,
            buildings,
            floors,
            selectedOption
        } = this.props;

        const listTypes = {
            [BUILDING]: Sites,
            [FLOOR]: Buildings,
            [DRAWING]: Floors
        };

        const SpecificField = listTypes[hierarchyID + ''] || null;

        if (!selectedOption)
            return (
                <p className="generic-text no-data size-lg-12">
                    Please select an option to move from the list on the left.
                </p>
            );

        if (!SpecificField) return null;

        return (
            <SpecificField
                sites={sites}
                buildings={buildings}
                floors={floors}
                handleSelectOption={this.handleSelectOption}
            />
        );
    }

    handleSelectOption = (name, value) => {
        const { showModal } = this.props;

        showModal(CONFIRM_MOVE_HIERARCHY_TO_COMPANY, {
            moveToName: name,
            moveToValue: value
        });
    };
}

const mapStateToProps = ({
    superAdmin: {
        sitesReducer: { sites },
        buildingsReducer: { buildings },
        floorsReducer: { floors },
        siteManagementReducer: { selectedOption }
    }
}) => ({
    sites: Object.values(sites),
    buildings: Object.values(buildings),
    floors: Object.values(floors),
    selectedOption
});

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SiteManagementMoveFromOptionsRoute);
