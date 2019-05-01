import React, { Component } from 'react';
import LabelFieldContainer from './LabelFieldContainer';

class StandardLabelFieldsContainer extends Component {
    render() {
        return [1, 2, 3, 4, 5].map(num => <LabelFieldContainer key={num} />);
    }
}

export default StandardLabelFieldsContainer;
