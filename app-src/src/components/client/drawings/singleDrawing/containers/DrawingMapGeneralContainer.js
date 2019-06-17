import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import DrawingMapFiltersAdvanced from '../presentational/DrawingMapFiltersAdvanced';
import DrawingMapViewSimple from '../presentational/DrawingMapViewSimple';
import DrawingInspectionLogContainer from './DrawingInspectionLogContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { convertEnumToDropdownOptions } from 'helpers/generic';
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

        const { error, pins, drawing = {}, fieldErrors } = this.props;

        const dateError = fieldErrors['startDateSelected']
            ? 'Start date must not be after end date.'
            : null;

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
                                dateError={dateError}
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
        isFetching: prevIsFetching,
        pinsFromAPI: prevPinsFromAPI = []
    }) => {
        const {
            drawing = {},
            isFetching,
            pinsFromAPI = [],
            handleChange
        } = this.props;
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

        if (pinsFromAPI.length !== prevPinsFromAPI.length) {
            const pinIDs = pinsFromAPI.map(({ id }) => id);
            handleChange('pinIDs', pinIDs);
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
        const { pins, pinIDs } = this.props;

        const filterPins = pins.filter(({ id }) => pinIDs.includes(id));

        return filterPins;
    };
}

const mapStateToProps = (
    {
        client: {
            pinsReducer: { pins, isFetching: fetchingPins, error },
            servicesReducer: { services, isFetching: fetchingServices },
            // drawingOperativesReducer: { users, isFetching: fetchingUsers },
            drawingsReducer: { drawings },
            reportsReducer: {
                filters: { pinIDs },
                customFilters: { pins: pinsFromAPI }
            }
        },
        shared: {
            fieldErrorsReducer: { fieldErrors }
        }
    },
    { match }
) => ({
    drawing: drawings[match.params.id],
    pins: Object.values(pins),
    // operatives: Object.values(users),
    services: Object.values(services),
    isFetching: fetchingPins || fetchingServices,
    fieldErrors,
    error,
    pinIDs,
    pinsFromAPI
});

export default withRouter(connect(mapStateToProps)(DrawingMapGeneralContainer));
