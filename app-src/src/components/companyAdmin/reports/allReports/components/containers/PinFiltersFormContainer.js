import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FUTHER_FILTRATION } from 'constants/companyAdmin/enums';
import { convertArrToObj, convertEnumToDropdownOptions } from 'helpers/generic';
import PinFiltersForm from '../presentational/PinFiltersForm';

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
            />
        );
    }
    handleFurtherFiltrationChange = ({ target: { value, name } }) => {
        this.setState({ [name]: value });
    };
}

const mapStateToProps = ({
    companyAdmin: {
        sitesReducer,
        buildingsReducer,
        floorsReducer,
        drawingsReducer
    }
}) => ({
    sites: Object.values(sitesReducer.sites),
    sitesFilter: sitesReducer.filters,
    buildings: Object.values(buildingsReducer.buildings),
    floors: Object.values(floorsReducer.floors),
    drawings: Object.values(drawingsReducer)
});

export default connect(
    mapStateToProps,
    null
)(PinFiltersFormContainer);
