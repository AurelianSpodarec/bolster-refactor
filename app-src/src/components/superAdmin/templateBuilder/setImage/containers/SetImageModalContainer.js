import React, { useState } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import SetImageModal from '../presentational/SetImageModal';
import { QUESTION_TYPE_NUMBERS } from 'constants/shared/templateBuilder';
import setQuestion from 'actions/superAdmin/templateBuilder/sync/setQuestion';

const SetImageModalContainer = ({
    sectionUUID,
    templateUUID,
    sort,
    hideModal,
    setQuestion
}) => {
    const [formValues, updateForm] = useState({ name: '', file: '' });

    return (
        <SetImageModal
            {...formValues}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            handleSubmit={handleSubmit}
            hideModal={hideModal}
        />
    );

    function handleChange(name, value) {
        updateForm({ ...formValues, [name]: value });
    }

    function handleFileChange(name, value) {
        if (formValues[name] === value) handleChange(name, '');
        else handleChange(name, value);
    }

    function handleSubmit() {
        const { name, file } = formValues;
        const newQuestion = {
            uuid: uuid(),
            templateUUID,
            sectionUUID,
            questionType: QUESTION_TYPE_NUMBERS.STATIC_IMAGE,
            name,
            file,
            sort
        };

        setQuestion(newQuestion);
        hideModal();
    }
};

const mapDispatchToProps = { setQuestion };

export default connect(
    null,
    mapDispatchToProps
)(SetImageModalContainer);
