import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import DrawingMapViewSimple from '../presentational/DrawingMapViewSimple';
import DrawingInspectionLogContainer from './DrawingInspectionLogContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { convertEnumToDropdownOptions } from 'helpers/generic';
import { PIN_STATUS_TYPES } from 'constants/companyAdmin/enums';
import withUpdateOnChange from 'components/client/reports/createReport/components/hocs/withUpdateOnChange';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import BasicFiltersContainer from 'components/client/reports/createReport/components/containers/BasicFiltersContainer';
import DrawingDetailsContainer from './DrawingDetailsContainer';
import FurtherFiltrationContainer from 'components/client/reports/createReport/components/containers/FurtherFiltrationContainer';
import OutputSettingsContainer from 'components/client/reports/createReport/components/containers/OutputSettingsContainer';
import updateReportFilter from 'actions/client/reports/create/sync/clientUpdateReportFilter';

class DrawingMapGeneralContainer extends Component {
    state = {
        serviceSelectedID: '',
        statusSelectedID: '',
        operativeSelectedID: '',
        fromDateInclusive: undefined,
        toDateInclusive: undefined,
        position: [51.505, -0.09],
        mapZoom: 3,
        updating: false,
        // in state instead of in render method, recalculating each time
        serviceOptions: {},
        operativeOptions: {},
        statusOptions: convertEnumToDropdownOptions(PIN_STATUS_TYPES)
    };

    render() {
        const { mapZoom, position, updating } = this.state;

        const { error, drawing = {} } = this.props;

        return (
            <>
                <div className="flex-container size-lg-12">
                    <div className="flex-item size-lg-4">
                        <BasicFiltersContainer isDrawingPage />
                    </div>

                    <div className="flex-item size-lg-4">
                        <DrawingDetailsContainer />
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
                <FurtherFiltrationContainer />
                <OutputSettingsContainer />
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
    componentDidMount = () => {
        const {
            drawing = {},
            postFilters,
            updateReportFilter,
            match,
            fetchSingleDrawing
        } = this.props;

        updateReportFilter('drawingID', match.params.id).then(postFilters);
        if (drawing.isFloorplanUpdating) {
            this._floorplanInterval = setInterval(() => {
                fetchSingleDrawing(drawing.id);
            }, 5000);
        }
    };

    componentDidUpdate = ({
        drawing: prevDrawing = {},
        isFetching: prevIsFetching,
        pinsFromAPI: prevPinsFromAPI = []
    }) => {
        const {
            drawing = {},
            isFetching,
            pinsFromAPI = [],
            handleChange,
            fieldErrors,
            removeFieldError,
            fromDateInclusive,
            toDateInclusive
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

        if (
            fieldErrors.fromDateInclusive &&
            moment(fromDateInclusive) <= moment(toDateInclusive)
        ) {
            removeFieldError('fromDateInclusive');
            removeFieldError('toDateInclusive');
        }
    };

    handleChange = (name, value) => {
        const { handleChange, postFilters } = this.props;
        this.setState({ [name]: value });
        handleChange(name, value).then(postFilters);
    };

    handleDateChange = (date, name) => {
        this.setState({ [name]: date });
        const { handleChange, postFilters } = this.props;
        handleChange(name, date).then(postFilters);
    };

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

const mapDispatchToProps = { removeFieldError, updateReportFilter };

export default withRouter(
    withUpdateOnChange(
        connect(
            mapStateToProps,
            mapDispatchToProps
        )(DrawingMapGeneralContainer)
    )
);
