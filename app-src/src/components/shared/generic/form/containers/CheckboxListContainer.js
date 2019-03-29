import React, { Component } from 'react';
import CheckboxList from '../presentational/CheckboxList';

export default class CheckboxListContainer extends Component {
    state = {
        showFieldError: false
    };
    render() {
        const { items, checkedServices, handleMultiselect } = this.props;
        return (
            <CheckboxList
                items={items}
                checkedServices={checkedServices}
                handleMultiselect={handleMultiselect}
            />
        );
    }
}
