import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import MultiOptionForm from '../presentational/MultiOptionForm';
import updateQuestionField from 'actions/superAdmin/templateBuilder/sync/updateQuestionField';

const MultiOptionFormContainer = ({ options, updateQuestionField, optionColour, ...props }) => {
    return (
        <MultiOptionForm
            {...props}
            options={options}
            optionColour={optionColour}
            optionsForSelect={optionsForSelect()}
            updateQuestionField={updateQuestionField}
            addOption={addOption}
            removeOption={removeOption}
            updateOption={updateOption}
            updateColorOption={updateColorOption}
        />
    );

    function optionsForSelect() {
        return options.map(({ text }) => ({ label: text, value: text }));
    }

    function addOption() {
        const id = uuid();
        const newOption = { text: '', id };
        const newColor = { Name: '', HexValue: '#ffffff' };
        updateQuestionField('options', [...options, newOption]);
        updateQuestionField('optionColour', [...optionColour, newColor]);
    }

    function removeOption(id) {
        const index = options.findIndex(item => item.id === id);
        updateQuestionField(
            'options',
            options.filter(op => op.id !== id),
        );
        updateQuestionField(
            'optionColour',
            optionColour.reduce((res, item, i) => {
                return index === i ? res : [...res, item];
            }, []),
        );
    }

    function updateOption(name, text) {
        const index = options.findIndex(item => item.id === name);
        const updated = options.map(opt => (opt.id === name ? { ...opt, text } : opt));
        const updatedTextColor = optionColour.map((opt, i) =>
            index === i ? { ...opt, Name: text } : opt,
        );

        updateQuestionField('options', updated);
        updateQuestionField('optionColour', updatedTextColor);
    }

    function updateColorOption(colorIndex, HexValue) {
        const updated = optionColour.map((opt, index) =>
            index === colorIndex ? { ...opt, HexValue } : opt,
        );

        updateQuestionField('optionColour', updated);
    }
};

const mapDispatchToProps = { updateQuestionField };

export default connect(null, mapDispatchToProps)(MultiOptionFormContainer);
