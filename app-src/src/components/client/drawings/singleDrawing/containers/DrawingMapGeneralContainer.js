import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import DrawingMapFiltersAdvanced from '../presentational/DrawingMapFiltersAdvanced';
import DrawingMapViewSimple from '../presentational/DrawingMapViewSimple';
import DrawingInspectionLogContainer from './DrawingInspectionLogContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import {
    convertEnumToDropdownOptions,
    momentComparisonFormat
} from 'helpers/generic';
import { PIN_STATUS_TYPES } from 'constants/companyAdmin/enums';

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
            // operativeSelectedID,
            startDateSelected,
            endDateSelected,
            mapZoom,
            position,
            updating,
            serviceOptions,
            // operativeOptions,
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
                                // operativeOptions={Object.values(
                                //     operativeOptions
                                // )}
                                // selectedOperative={
                                //     operativeOptions[operativeSelectedID]
                                // }
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
                {/* <div className="flex-container size-lg-12">
                    <div className="flex-item small-text-table size-lg-3">
                        <DrawingDocumentsContainer />
                    </div>

                    <div className="flex-item small-text-table two-line size-lg-3">
                        <DrawingCompaniesAccessContainer />
                    </div>
                </div> */}
            </>
        );
    }

    componentDidUpdate = ({
        drawing: prevDrawing = {},
        isFetching: prevIsFetching
    }) => {
        const { drawing = {}, isFetching } = this.props;
        // when the component has finished fetching all the options, run get services options once instead of in every render
        if (!isFetching && prevIsFetching) {
            const serviceOptions = this._getServicesOptions();
            // const operativeOptions = this._getOperativeOptions();
            this.setState({ serviceOptions });
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

    //  !operative information not available at drawing level yet
    // _getOperativeOptions = () => {
    //     const { operatives } = this.props;

    //     return operatives.reduce(
    //         (acc, { id, userFirstName, userLastName, userEmail }) => {
    //             acc[id] = {
    //                 value: id,
    //                 text: `${userFirstName} ${userLastName} <${userEmail}>`
    //             };
    //             return acc;
    //         },
    //         {}
    //     );
    // };

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
            // * format moment dates for comparison to date instead of timestamp - for same day comparison
            if (
                startDateSelected &&
                moment(pin.latestCreatedOn).format(momentComparisonFormat) <=
                    moment(startDateSelected)
            ) {
                return false;
            }
            if (
                endDateSelected &&
                moment(pin.latestCreatedOn).format(momentComparisonFormat) >=
                    moment(endDateSelected)
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
        client: {
            pinsReducer: { pins, isFetching: fetchingPins, error },
            servicesReducer: { services, isFetching: fetchingServices },
            // drawingOperativesReducer: { users, isFetching: fetchingUsers },
            drawingsReducer: { drawings }
        }
    },
    { match }
) => ({
    drawing: drawings[match.params.id],
    pins: Object.values(pins),
    // operatives: Object.values(users),
    services: Object.values(services),
    isFetching: fetchingPins || fetchingServices,
    error
});

export default withRouter(connect(mapStateToProps)(DrawingMapGeneralContainer));
