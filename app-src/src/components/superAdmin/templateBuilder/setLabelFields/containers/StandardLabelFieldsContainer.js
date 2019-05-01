import React, { Component } from 'react';
import uuid from 'uuid/v1';

import LabelFieldContainer from './LabelFieldContainer';
import { STANDARD_LABEL_FIELDS } from 'constants/shared/templateBuilder';

const labelField = {
    uuid: '',
    key: '',
    config: {
        title: '',
        source: '',
        staticField: '',
        questionUUID: ''
    }
};

const getLabelOptions = () => {
    return Object.values(STANDARD_LABEL_FIELDS)
        .sort((a, b) => a - b)
        .reduce((acc, val) => {
            acc[val] = { ...labelField, key: val, uuid: uuid() };
        }, {});
};

class StandardLabelFieldsContainer extends Component {
    state = {
        labelOptions: getLabelOptions()
    };

    render() {
        const { labelOptions } = this.state;

        return labelOptions.map(num => <LabelFieldContainer key={num} />);
    }

    _getLabelOptions = () => {
        return Object.values(STANDARD_LABEL_FIELDS).reduce((acc, val) => {
            acc[val] = { ...labelField, key: val, uuid: uuid() };
        }, {});
    };
}

export default StandardLabelFieldsContainer;
