import React, { Component } from 'react';
import { connect } from 'react-redux';

import OperativesFilter from '../presentational/OperativesFilter';
import updateOperativeFilter from 'actions/companyAdmin/reports/sync/updateOperativeFilter';
import postCustomFilters from 'actions/companyAdmin/reports/async/postCustomFilters';

class OperativesFilterContainer extends Component {
    state = {
        selectedOperatives: []
    };
    render() {
        const operatives = this.props.operatives.map(({ id, name }) => ({
            value: id,
            label: name
        }));
        const { isSiteSelected } = this.props;

        return (
            <OperativesFilter
                required={!isSiteSelected}
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

    componentDidMount = () => {
        this.props.postCustomFilters();
    };

    componentDidUpdate = prevProps => {
        const { operatives } = this.props;
        if (operatives.length !== prevProps.operatives.length) {
            // remove operative if they're no longer available after filter update
            const selectedOperatives = this.state.selectedOperatives.filter(
                ({ value }) => operatives.find(({ id }) => id === value)
            );
            this.setState({ selectedOperatives });
        }
    };
}

const mapStateToProps = ({
    companyAdmin: {
        reportsReducer: {
            filters: { siteID },
            customFilters: { operatives = [] }
        }
    }
}) => ({
    operatives,
    isSiteSelected: !!siteID
});

const mapDispatchToProps = dispatch => ({
    updateOperativeFilter: ids => dispatch(updateOperativeFilter(ids)),
    postCustomFilters: () =>
        dispatch(postCustomFilters({ name: '', value: '' }))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OperativesFilterContainer);
