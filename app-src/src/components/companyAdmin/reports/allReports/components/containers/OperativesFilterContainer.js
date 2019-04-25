import React, { Component } from 'react';
import withUpdateOnChange from '../hocs/withUpdateOnChange';

import OperativesFilter from '../presentational/OperativesFilter';

class OperativesFilterContainer extends Component {
    state = {
        selectedOperatives: []
    };
    render() {
        const {
            handleChange,
            formatArrForDropdown,
            customFilters: { operatives }
        } = this.props;

        return (
            <OperativesFilter
                operativeOptions={formatArrForDropdown(operatives)}
                selectedOperatives={this.state.selectedOperatives}
                handleChange={handleChange}
            />
        );
    }

    componentDidMount = () => {
        this.props.postFilters();
    };

    componentDidUpdate = ({ customFilters: { operatives: prevOps } }) => {
        const {
            handleChange,
            customFilters: { operatives },
            filters: { operativeIDs }
        } = this.props;
        if (operatives.length !== prevOps.length) {
            // remove operative if they're no longer available after filter update
            const opIDs = operativeIDs.operativeIDs.filter(opID =>
                operatives.some(op => opID === op.id)
            );

            handleChange('operatveIDs', opIDs);
        }
    };

    handleChange = (name, val) => {
        const { handleChange, postFilters } = this.props;
        return handleChange(name, val).then(postFilters);
    };
}

export default withUpdateOnChange(OperativesFilterContainer);
