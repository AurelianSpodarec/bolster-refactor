import React, { Component } from 'react';
import uuid from 'uuid/v1';
import MultiOptionForm from '../presentational/MultiOptionForm';

class MultiOptionFormContainer extends Component {
    render() {
        const { addOption, removeOption, ...rest } = this.props;
        return (
            <MultiOptionForm
                {...rest}
                addOption={e => {
                    e.preventDefault();
                    addOption();
                }}
                removeOption={(e, id) => {
                    e.preventDefault();
                    removeOption(id);
                }}
            />
        );
    }

    componentDidMount = () => {
        const { addOption } = this.props;
        addOption({ text: '', id: uuid() });
    };

    componentWillUnmount = () => {
        const { emptyOptions } = this.props;
        emptyOptions();
    };
}

export default MultiOptionFormContainer;
