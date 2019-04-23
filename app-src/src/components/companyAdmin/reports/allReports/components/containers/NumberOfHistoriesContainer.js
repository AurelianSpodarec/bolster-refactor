import React, { Component } from 'react';
import { connect } from 'react-redux';

import { convertEnumToDropdownOptions } from 'helpers/generic';
import { NUMBER_OF_HISTORIES } from 'constants/companyAdmin/enums';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import NumberOfHistories from '../presentational/NumberOfHistories';

class NumberOfHistoriesContainer extends Component {
    render() {
        const {
            filters: { numberOfHistoriesID }
        } = this.props;

        const numberOfHistoriesOptions = convertEnumToDropdownOptions(
            NUMBER_OF_HISTORIES
        );

        return (
            <NumberOfHistories
                numberOfHistoriesOptions={Object.values(
                    numberOfHistoriesOptions
                )}
                selectedHistory={numberOfHistoriesOptions[numberOfHistoriesID]}
                handleChange={this.handleChange}
            />
        );
    }

    handleChange = ({ target: { value, name } }) => {
        const { updateReportFilter } = this.props;

        updateReportFilter(name, value);
    };
}

const mapStateToProps = ({
    companyAdmin: {
        reportsReducer: { filters }
    }
}) => {
    return {
        filters
    };
};

const mapDispatchToProps = dispatch => ({
    updateReportFilter: (name, val) => {
        dispatch(updateReportFilter(name, val));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NumberOfHistoriesContainer);
