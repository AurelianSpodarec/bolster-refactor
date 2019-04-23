import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FURTHER_FILTRATION } from 'constants/companyAdmin/enums';
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
        const { drawingID } = this.props.filters;

        const furtherFiltrationOptions = convertEnumToDropdownOptions(
            FURTHER_FILTRATION
        );

        const furtherFiltrationOptionsArr = Object.values(
            furtherFiltrationOptions
        ).filter(({ text }) => (drawingID ? true : text !== 'Pin Selection'));

        return (
            <PinFiltersForm
                furtherFiltrationOptions={furtherFiltrationOptionsArr}
                selectedfurtherFiltration={
                    furtherFiltrationOptions[filterOption]
                }
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
            fields,
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

        const questionFilters = fields.map(
            ({ selectedQuestions, questionValues }) => ({
                questionGroupKeys: selectedQuestions,
                values: Object.values(questionValues).map(({ value }) => value)
            })
        );

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
            status: statusID || null,
            questionFilters
        };

        console.log(postBody);

        postReport(postBody);
    };
}

const mapStateToProps = ({
    companyAdmin: {
        sitesReducer,
        buildingsReducer,
        floorsReducer,
        drawingsReducer,
        reportsReducer: { filters, fields }
    }
}) => ({
    fields: Object.values(fields),
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
