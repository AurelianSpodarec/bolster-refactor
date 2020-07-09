import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import PrefillStatusFields from '../presentational/PrefillStatusFields';
import updateQuestionField from 'actions/superAdmin/templateBuilder/sync/updateQuestionField';
import { QUESTION_TYPE_VALUES } from 'constants/shared/templateBuilder';

const PrefillStatusFieldsContainer = ({ options, updateQuestionField, questionType, ...props }) => {
    const radio = questionType === QUESTION_TYPE_VALUES.RADIO;
    return (
        <PrefillStatusFields
            {...props}
            options={options}
            optionsForSelect={optionsForSelect()}
            updateQuestionField={updateQuestionField}
            addOption={addOption}
            removeOption={removeOption}
            updateOption={updateOption}
            radio={radio}
        />
    );

    function optionsForSelect() {
        return options.map(opt => ({ label: opt.text, value: opt.id }));
    }

    function addOption() {
        const id = uuid();
        const newOption = { text: '', id };
        updateQuestionField('options', [...options, newOption]);
    }

    function removeOption(id) {
        updateQuestionField(
            'options',
            options.filter(op => op.id !== id)
        );
    }

    function updateOption(name, text) {
        const updated = options.map(opt => (opt.id === name ? { ...opt, text } : opt));

        updateQuestionField('options', updated);
    }
};

const mapDispatchToProps = { updateQuestionField };

export default connect(null, mapDispatchToProps)(PrefillStatusFieldsContainer);
