import React from 'react';
import { connect } from 'react-redux';

import { enumFormat } from 'helpers/generic';
import { NUMBER_OF_HISTORIES } from 'constants/companyAdmin/enums';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import NumberOfHistories from '../presentational/NumberOfHistories';

const NumberOfHistoriesContainer = ({
    filters: { numberOfHistoriesID },
    updateReportFilter
}) => {
    const numberOfHistoriesOptions = enumFormat(NUMBER_OF_HISTORIES);
    return null;
    // <NumberOfHistories
    //     numberOfHistoriesOptions={Object.values(numberOfHistoriesOptions)}
    //     selectedHistory={String(numberOfHistoriesID)}
    //     handleChange={handleChange}
    // />
    function handleChange(name, value) {
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
