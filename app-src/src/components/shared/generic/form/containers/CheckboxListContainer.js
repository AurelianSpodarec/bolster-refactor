import React, { Component } from 'react';
import CheckboxList from '../presentational/CheckboxList';

export default class CheckboxListContainer extends Component {
    state = {
        showFieldError: false
    };
    render() {
        return <CheckboxList items={this.props.items} />;
    }
}
