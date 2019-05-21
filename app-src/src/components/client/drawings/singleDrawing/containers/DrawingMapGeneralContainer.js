import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import DrawingMapFiltersAdvanced from '../presentational/DrawingMapFiltersAdvanced';
import DrawingMapViewSimple from '../presentational/DrawingMapViewSimple';
import DrawingInspectionLogContainer from './DrawingInspectionLogContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { convertEnumToDropdownOptions } from 'helpers/generic';
import {
    PIN_STATUS_TYPES,
    COMPANY_USER_ROLE_TYPES as USER_ROLE
} from 'constants/companyAdmin/enums';
import fetchSingleDrawing from 'actions/companyAdmin/drawings/async/fetchSingleDrawing';

class DrawingMapGeneralContainer extends Component {
    state = {
        serviceSelectedID: '',
        statusSelectedID: '',
        operativeSelectedID: '',
        startDateSelected: undefined,
        endDateSelected: undefined,
        position: [51.505, -0.09],
        mapZoom: 3,
        updating: false,
        // in state instead of in render method, recalculating each time
        serviceOptions: {},
        operativeOptions: {},
        statusOptions: convertEnumToDropdownOptions(PIN_STATUS_TYPES)
    };

    render() {
        const {
            serviceSelectedID,
            statusSelectedID,
            operativeSelectedID,
            startDateSelected,
            endDateSelected,
            mapZoom,
            position,
            updating,
            serviceOptions,
            operativeOptions,
            statusOptions
        } = this.state;

        const { error, pins, drawing = {} } = this.props;

        return (
            <>
                <div className="flex-container size-lg-12">
                    <div className="flex-item size-lg-8">
                        <BlockContainer error={error}>
                            <DrawingMapFiltersAdvanced
                                serviceOptions={Object.values(serviceOptions)}
                                selectedService={
                                    serviceOptions[serviceSelectedID]
                                }
                                statusOptions={Object.values(statusOptions)}
                                selectedStatus={statusOptions[statusSelectedID]}
                                operativeOptions={Object.values(
                                    operativeOptions
                                )}
                                selectedOperative={
                                    operativeOptions[operativeSelectedID]
                                }
                                startDateSelected={startDateSelected}
                                endDateSelected={endDateSelected}
                                pins={pins}
                                handleChange={this.handleChange}
                                handleDateChange={this.handleDateChange}
                            />
                        </BlockContainer>
                    </div>

                    <DrawingInspectionLogContainer />
                </div>
                <BlockContainer error={error} isEmpty={!drawing}>
                    <DrawingMapViewSimple
                        position={position}
                        zoom={mapZoom}
                        drawing={drawing}
                        pins={this._getFilteredPins()}
                        updating={updating}
                    />
                </BlockContainer>
            </>
        );
    }

    componentDidMount = () => {
        this.props.fetchCompanyUsers();
        // this._resetCoordinates();
    };

    componentDidUpdate = ({
        drawing: prevDrawing = {},
        isFetching: prevIsFetching
    }) => {
        const { drawing = {}, isFetching } = this.props;
        // when the component has finished fetching all the options, run get services options once instead of in every render
        if (!isFetching && prevIsFetching) {
            const serviceOptions = this._getServicesOptions();
            const operativeOptions = this._getOperativeOptions();
            this.setState({ serviceOptions, operativeOptions });
        }
        if (drawing.tilesetS3Key !== prevDrawing.tilesetS3Key) {
            clearInterval(this._floorplanInterval);
            this.setState({ updating: false });
        }
    };

    handleChange = (name, value) => this.setState({ [name]: value });

    handleDateChange = (date, name) => this.setState({ [name]: date });

    _getServicesOptions = () => {
        const { services, pins } = this.props;

        const servicesOnDrawing = pins.reduce((acc, { latestServiceID }) => {
            if (!acc.includes(latestServiceID)) acc.push(latestServiceID);
            return acc;
        }, []);

        return services.reduce((acc, { id, name }) => {
            if (servicesOnDrawing.includes(id))
                acc[id] = { value: id, text: name };

            return acc;
        }, {});
    };

    _getOperativeOptions = () => {
        const { users } = this.props;

        return users.reduce(
            (acc, { id, userFirstName, userLastName, userEmail, type }) => {
                if (type === USER_ROLE.OPERATIVE)
                    acc[id] = {
                        value: id,
                        text: `${userFirstName} ${userLastName} <${userEmail}`
                    };
                return acc;
            },
            {}
        );
    };

    _getFilteredPins = () => {
        const { pins } = this.props;
        const {
            serviceSelectedID,
            statusSelectedID,
            operativeSelectedID,
            startDateSelected,
            endDateSelected
        } = this.state;

        const filterPins = pins.filter(pin => {
            if (
                serviceSelectedID &&
                +pin.latestServiceID !== +serviceSelectedID
            ) {
                return false;
            }
            if (statusSelectedID && +pin.latestStatus !== +statusSelectedID) {
                return false;
            }
            if (
                operativeSelectedID &&
                +pin.latestCreatedByCompanyUserID !== +operativeSelectedID
            ) {
                return false;
            }
            if (
                startDateSelected &&
                moment(pin.latestCreatedOn) < moment(startDateSelected)
            ) {
                return false;
            }
            if (
                endDateSelected &&
                moment(pin.latestCreatedOn) > moment(endDateSelected)
            ) {
                return false;
            }
            return true;
        });

        return filterPins;
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            pinsReducer: { pins, isFetching: fetchingPins, error },
            servicesReducer: { services, isFetching: fetchingServices },
            companyUsersReducer: { users, isFetching: fetchingUsers },
            drawingsReducer: { drawings }
        }
    },
    { match }
) => ({
    drawing: drawings[match.params.id],
    pins: Object.values(pins),
    users: Object.values(users),
    services: Object.values(services),
    isFetching: fetchingPins || fetchingServices || fetchingUsers,
    error
});

const mapDispatchToProps = dispatch => ({
    fetchCompanyUsers: () => dispatch(fetchCompanyUsers()),
    fetchDrawing: id => dispatch(fetchSingleDrawing(id))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(DrawingMapGeneralContainer)
);
