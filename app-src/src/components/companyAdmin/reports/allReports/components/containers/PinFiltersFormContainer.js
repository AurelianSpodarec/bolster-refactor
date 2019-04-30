import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { FURTHER_FILTRATION } from 'constants/companyAdmin/enums';
import { convertEnumToDropdownOptions } from 'helpers/generic';
import PinFiltersForm from '../presentational/PinFiltersForm';

import postReport from 'actions/companyAdmin/reports/async/postReport';
import postCustomFilters from 'actions/companyAdmin/reports/async/postCustomFilters';
import removeFilterQuestions from 'actions/companyAdmin/reports/sync/removeFilterQuestions';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

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
        ).filter(({ text }) => drawingID || text !== 'Pin Selection');

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
    removeFilterQuestions: () => dispatch(removeFilterQuestions()),
    showModal: (type, props) => dispatch(showModal(type, props)),
    hideModal: () => dispatch(hideModal())
});

const WithConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(PinFiltersFormContainer);

export default withRouter(WithConnect);
