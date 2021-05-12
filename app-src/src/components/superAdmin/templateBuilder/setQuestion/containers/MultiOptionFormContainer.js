import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import MultiOptionForm from '../presentational/MultiOptionForm';
import updateQuestionField from 'actions/superAdmin/templateBuilder/sync/updateQuestionField';

const MultiOptionFormContainer = ({ options, updateQuestionField, ...props }) => {
    return (
        <MultiOptionForm
            {...props}
            options={options}
            optionsForSelect={optionsForSelect()}
            updateQuestionField={updateQuestionField}
            addOption={addOption}
            removeOption={removeOption}
            updateOption={updateOption}
        />
    );

    function optionsForSelect() {
        return options.map(({ text }) => ({ label: text, value: text }));
    }

    function addOption() {
        const id = uuid();
        const newOption = { text: '', id };
        updateQuestionField('options', [...options, newOption]);
    }

    function removeOption(id) {
        updateQuestionField(
            'options',
            options.filter(op => op.id !== id),
        );
    }

    function updateOption(name, text) {
        const updated = options.map(opt => (opt.id === name ? { ...opt, text } : opt));

        updateQuestionField('options', updated);
    }
};

const mapDispatchToProps = { updateQuestionField };

export default connect(null, mapDispatchToProps)(MultiOptionFormContainer);
