import React, { Component } from 'react';
import LabelFieldContainer from './LabelFieldContainer';

class TrimLabelFieldsContainer extends Component {
    render() {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <LabelFieldContainer key={num} />
        ));
    }
}

export default TrimLabelFieldsContainer;
