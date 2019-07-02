import React, { Component } from 'react';
import { connect } from 'react-redux';

import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';
import Field from 'components/shared/generic/form/presentational/Field';
import selectOption from 'actions/superAdmin/siteManagement/sync/selectOption';
import Loading from 'components/shared/generic/misc/presentational/Loading';

const { BUILDING, FLOOR, DRAWING } = HIERARCHY_IDS;

const Buildings = ({ buildings, handleSelectOption, selectedOption }) => {
    if (!buildings.length)
        return (
            <p className="generic-text no-data size-lg-12">
                No buildings were found
            </p>
        );

    return (
        <Field name="Select a building" classes="full-length">
            {buildings.map(building => (
                <p
                    key={building.id}
                    className={`select-option size-lg-12 ${
                        building.id === selectedOption ? 'active' : ''
                    }`}
                    onClick={() => handleSelectOption(building.id)}
                >
                    {`${building.siteName} / ${building.name}`}
                </p>
            ))}
        </Field>
    );
};

const Floors = ({ floors, handleSelectOption, selectedOption }) => {
    if (!floors.length)
        return (
            <p className="generic-text no-data size-lg-12">
                No floors were found
            </p>
        );

    return (
        <Field name="Select a floor" classes="full-length">
            {floors.map(floor => (
                <p
                    key={floor.id}
                    className={`select-option size-lg-12 ${
                        floor.id === selectedOption ? 'active' : ''
                    }`}
                    onClick={() => handleSelectOption(floor.id)}
                >
                    {`${floor.siteName} / ${floor.buildingName} / ${
                        floor.name
                    }`}
                </p>
            ))}
        </Field>
    );
};

const Drawings = ({ drawings, handleSelectOption, selectedOption }) => {
    if (!drawings.length)
        return (
            <p className="generic-text no-data size-lg-12">
                No drawings were found
            </p>
        );

    return (
        <Field name="Select a drawing" classes="full-length">
            {drawings.map(drawing => (
                <p
                    key={drawing.id}
                    className={`select-option size-lg-12 ${
                        drawing.id === selectedOption ? 'active' : ''
                    }`}
                    onClick={() => handleSelectOption(drawing.id)}
                >
                    {`${drawing.siteName} / ${drawing.buildingName} / ${
                        drawing.floorName
                    } / ${drawing.name}`}
                </p>
            ))}
        </Field>
    );
};

class SiteManagementMoveFromOptionsRoute extends Component {
    render() {
        const {
            hierarchyID,
            buildings,
            floors,
            drawings,
            selectedOption,
            companyID,
            isFetching
        } = this.props;

        const listTypes = {
            [BUILDING]: Buildings,
            [FLOOR]: Floors,
            [DRAWING]: Drawings
        };

        // console.warn('selected company', companyID);
        // console.warn('buildings', buildings);
        // console.warn(
        //     'buildings filtered',
        //     buildings.filter(building => building.ownerCompanyID === companyID)
        // );

        const SpecificField = listTypes[hierarchyID + ''] || null;

        if (!SpecificField) return null;

        if (isFetching) return <Loading />;

        return (
            <SpecificField
                buildings={buildings.filter(
                    building => building.ownerCompanyID === companyID
                )}
                floors={floors.filter(
                    floor => floor.ownerCompanyID === companyID
                )}
                drawings={drawings.filter(
                    drawing => drawing.ownerCompanyID === companyID
                )}
                handleSelectOption={this.handleSelectOption}
                selectedOption={selectedOption}
            />
        );
    }

    handleSelectOption = value => {
        this.props.selectOption(value);
    };
}

const mapStateToProps = ({
    superAdmin: {
        buildingsReducer: { buildings, isFetching: isFetchingBuildings },
        floorsReducer: { floors, isFetching: isFetchingFloors },
        drawingsReducer: { drawings, isFetching: isFetchingDrawings },
        siteManagementReducer: { selectedOption }
    }
}) => ({
    buildings: Object.values(buildings),
    floors: Object.values(floors),
    drawings: Object.values(drawings),
    selectedOption,
    isFetching: isFetchingBuildings || isFetchingFloors || isFetchingDrawings
});

const mapDispatchToProps = dispatch => ({
    selectOption: value => {
        dispatch(selectOption(value));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SiteManagementMoveFromOptionsRoute);
