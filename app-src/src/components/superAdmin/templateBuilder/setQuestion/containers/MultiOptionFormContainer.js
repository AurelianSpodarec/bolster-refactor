import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import MultiOptionForm from '../presentational/MultiOptionForm';
import updateQuestionField from 'actions/superAdmin/templateBuilder/sync/updateQuestionField';

class MultiOptionFormContainer extends Component {
    render() {
        const { options } = this.props;
        return (
            <MultiOptionForm
                options={options}
                addOption={this.addOption}
                removeOption={this.removeOption}
                updateOption={this.updateOption}
            />
        );
    }

    addOption = e => {
        e.preventDefault();
        const { options, updateQuestionField } = this.props;
        updateQuestionField('options', [...options, { text: '', id: uuid() }]);
    };

    removeOption = (e, id) => {
        e.preventDefault();
        const { options, updateQuestionField } = this.props;
        updateQuestionField('options', options.filter(op => op.id !== id));
    };

    updateOption = e => {
        e.preventDefault();
        const { name: id, value } = e.target;
        const { options, updateQuestionField } = this.props;
        const updated = options.map(opt =>
            opt.id === id ? { ...opt, text: value } : opt
        );

        updateQuestionField('options', updated);
    };
}

const mapDispatchToProps = dispatch => ({
    updateQuestionField: (name, value) => {
        dispatch(updateQuestionField(name, value));
    }
});
export default connect(
    null,
    mapDispatchToProps
)(MultiOptionFormContainer);
