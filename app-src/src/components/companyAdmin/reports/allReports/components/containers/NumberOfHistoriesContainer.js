import React from 'react';
import { connect } from 'react-redux';

import { convertEnumToDropdownOptions } from 'helpers/generic';
import { NUMBER_OF_HISTORIES } from 'constants/companyAdmin/enums';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import NumberOfHistories from '../presentational/NumberOfHistories';

const NumberOfHistoriesContainer = ({
    filters: { numberOfHistoriesID },
    updateReportFilter
}) => {
    const numberOfHistoriesOptions = convertEnumToDropdownOptions(
        NUMBER_OF_HISTORIES
    );
    return (
        <NumberOfHistories
            numberOfHistoriesOptions={Object.values(numberOfHistoriesOptions)}
            selectedHistory={numberOfHistoriesOptions[numberOfHistoriesID]}
            handleChange={handleChange}
        />
    );
    function handleChange({ target: { value, name } }) {
        updateReportFilter(name, value);
    }
};

const mapStateToProps = ({
    companyAdmin: {
        reportsReducer: { filters }
    }
}) => ({ filters });

const mapDispatchToProps = dispatch => ({
    updateReportFilter: (name, val) => dispatch(updateReportFilter(name, val))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NumberOfHistoriesContainer);
