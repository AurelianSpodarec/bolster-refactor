import React, { Component } from 'react';
import { connect } from 'react-redux';

import OperativesFilter from '../presentational/OperativesFilter';
import updateOperativeFilter from 'actions/companyAdmin/reports/sync/updateOperativeFilter';

class OperativesFilterContainer extends Component {
    state = {
        selectedOperatives: []
    };
    render() {
        const operatives = this.props.operatives.map(({ id, name }) => ({
            value: id,
            label: name
        }));
        return (
            <OperativesFilter
                operatives={operatives}
                selectedOperatives={this.state.selectedOperatives}
                handleChange={this.handleChange}
            />
        );
    }

    handleChange = selectedOperatives => {
        const { updateOperativeFilter } = this.props;
        const operativeIDs = selectedOperatives.map(({ value }) => value);
        this.setState({ selectedOperatives });
        updateOperativeFilter(operativeIDs);
    };

    componentDidUpdate = prevProps => {
        const { operatives } = this.props;
        if (operatives.length !== prevProps.operatives.length) {
            // re-set operative if they're no longer available
        }
    };
}

const mapStateToProps = ({
    companyAdmin: {
        reportsReducer: {
            customFilters: { operatives = [] }
        }
    }
}) => ({
    operatives
});

const mapDispatchToProps = dispatch => ({
    updateOperativeFilter: ids => dispatch(updateOperativeFilter(ids))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OperativesFilterContainer);
