import React, { Component } from 'react';

import Block1Filters from '../presentational/Block1Filters';
import withUpdateOnChange from '../hocs/withUpdateOnChange';

class Block1FiltersContainer extends Component {
    state = {
        showError: false
    };
    render() {
        const {
            fieldError,
            advanced,
            isFetching,
            getAllOperatives
        } = this.props;

        return (
            <Block1Filters
                fieldError={fieldError}
                advanced={advanced}
                isFetching={isFetching}
                getAllOperatives={getAllOperatives}
            />
        );
    }
}

export default withUpdateOnChange(Block1FiltersContainer);
