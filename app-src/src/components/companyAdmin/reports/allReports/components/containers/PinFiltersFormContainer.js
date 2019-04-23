import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FUTHER_FILTRATION } from 'constants/companyAdmin/enums';
import { convertEnumToDropdownOptions } from 'helpers/generic';
import PinFiltersForm from '../presentational/PinFiltersForm';

import postReport from 'actions/companyAdmin/reports/async/postReport';
import postCustomFilters from 'actions/companyAdmin/reports/async/postCustomFilters';

export class PinFiltersFormContainer extends Component {
    state = {
        filterOption: 0
    };

    render() {
        const { filterOption } = this.state;

        const futherFiltrationOptions = convertEnumToDropdownOptions(
            FUTHER_FILTRATION
        );
        return (
            <PinFiltersForm
                futherFiltrationOptions={Object.values(futherFiltrationOptions)}
                selectedFutherFiltration={futherFiltrationOptions[filterOption]}
                handleFurtherFiltrationChange={
                    this.handleFurtherFiltrationChange
                }
                filterOption={filterOption}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    handleFurtherFiltrationChange = ({ target: { value, name } }) => {
        this.setState({ [name]: value });
    };

    handleSubmit = () => {
        const {
            filters: {
                siteID,
                buildingID,
                floorID,
                drawingID,
                serviceID,
                statusID,
                numberOfHistoriesID,
                reportFormatID,
                includeLocationDrawing,
                startDate,
                endDate,
                operativeIDs
            },
            postReport
        } = this.props;
        const hierarchyType = drawingID
            ? 'drawing'
            : floorID
            ? 'floor'
            : buildingID
            ? 'building'
            : 'site';
        const hierarchyID = drawingID
            ? drawingID
            : floorID
            ? floorID
            : buildingID
            ? buildingID
            : siteID;

        const postBody = {
            hierarchyType,
            hierarchyID,
            reportHistories: numberOfHistoriesID,
            fileType: reportFormatID,
            includePinLocation: includeLocationDrawing,
            fromDateInclusive: startDate,
            ToDateInclusive: endDate,
            companyUserIDs: operativeIDs,
            serviceID,
            status: statusID
            //company user ID
        };

        postReport(postBody);
    };
}

const mapStateToProps = ({
    companyAdmin: {
        sitesReducer,
        buildingsReducer,
        floorsReducer,
        drawingsReducer,
        reportsReducer: { filters }
    }
}) => ({
    sites: Object.values(sitesReducer.sites),
    sitesFilter: sitesReducer.filters,
    buildings: Object.values(buildingsReducer.buildings),
    floors: Object.values(floorsReducer.floors),
    drawings: Object.values(drawingsReducer),
    filters
});

const mapDispatchToProps = dipatch => ({
    postReport: postBody => {
        dipatch(postReport(postBody));
    },
    postCustomFilters: postBody => {
        dipatch(postCustomFilters(postBody));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PinFiltersFormContainer);
