import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { FURTHER_FILTRATION } from 'constants/companyAdmin/enums';
import { convertEnumToDropdownOptions } from 'helpers/generic';
import PinFiltersForm from '../presentational/PinFiltersForm';

import postReport from 'actions/companyAdmin/reports/async/postReport';
import postCustomFilters from 'actions/companyAdmin/reports/async/postCustomFilters';
import removeFilterQuestions from 'actions/companyAdmin/reports/sync/removeFilterQuestions';

export class PinFiltersFormContainer extends Component {
    state = {
        filterOption: 0
    };

    render() {
        return <PinFiltersForm />;
    }
}

const mapStateToProps = ({
    companyAdmin: {
        sitesReducer,
        buildingsReducer,
        floorsReducer,
        drawingsReducer,
        reportsReducer: {
            filters,
            fields,
            options,
            postSuccess,
            error,
            selectedPins
        }
    }
}) => ({
    fields: Object.values(fields),
    sites: Object.values(sitesReducer.sites),
    sitesFilter: sitesReducer.filters,
    buildings: Object.values(buildingsReducer.buildings),
    floors: Object.values(floorsReducer.floors),
    drawings: Object.values(drawingsReducer),
    selectedPins,
    filters,
    options,
    postSuccess,
    error
});

const mapDispatchToProps = dispatch => ({
    postReport: postBody => dispatch(postReport(postBody)),
    postCustomFilters: postBody => dispatch(postCustomFilters(postBody)),
    removeFilterQuestions: () => dispatch(removeFilterQuestions())
});

const WithConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(PinFiltersFormContainer);

export default withRouter(WithConnect);
