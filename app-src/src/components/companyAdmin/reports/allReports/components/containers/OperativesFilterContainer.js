import React, { Component } from 'react';
import { connect } from 'react-redux';

import OperativesFilter from '../presentational/OperativesFilter';

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
        this.setState({ selectedOperatives });
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

export default connect(mapStateToProps)(OperativesFilterContainer);
