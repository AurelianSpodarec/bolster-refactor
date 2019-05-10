import React from 'react';
import { QUESTION_TYPE_NUMBERS as TYPES } from 'constants/shared/templateBuilder';
import { FILE_STORAGE_URL } from 'config';
import { PIN_STATUS_TYPES } from 'constants/companyAdmin/enums';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { PIN_IMAGE } from 'constants/shared/modalTypes';
import { connect } from 'react-redux';

const PinAnswer = ({
    trimmedAnswer,
    type,
    questions,
    answers,
    status,
    dispatch,
    dropdownOptions
}) => {
    let relevantQuestion;
    let relevantOption;
    let relevantOptions;
    let curAnswer = answers.find(item => +item.id === +trimmedAnswer.id);
    const notFoundResponse = <p>Not Found</p>;

    if (!curAnswer) return notFoundResponse;
    switch (type) {
        case TYPES.SINGLE_LINE:
        case TYPES.MULTI_LINE:
        case TYPES.NUMBER:
        case TYPES.DROPDOWN_OPTIONS:
            return <p>{curAnswer.answer}</p>;
        case TYPES.MULTI_DROPDOWN_OPTIONS:
            return <p>{curAnswer.answer.join(', ')}</p>;
        case TYPES.DROPDOWN:
        case TYPES.RADIO:
            relevantQuestion = questions.find(
                ({ id }) => +id === +curAnswer.templateQuestionID
            );
            if (!relevantQuestion) return notFoundResponse;

            relevantOption = relevantQuestion.options.find(
                ({ id }) => id === curAnswer.answer
            );
            if (!relevantOption) return notFoundResponse;

            return <p>{relevantOption.text}</p>;
        case TYPES.MULTI_DROPDOWN:
            var { options } = questions.find(
                item => +item.id === curAnswer.templateQuestionID
            );
            relevantOptions = options.filter(({ id }) =>
                curAnswer.answer.includes(id)
            );
            return <p>{relevantOptions.map(({ text }) => text).join(', ')}</p>;
        case TYPES.CHECKBOX:
            return <p>{curAnswer.answer ? 'Yes' : 'No'}</p>;
        case TYPES.SIGNATURE:
            return (
                <img
                    className="signature"
                    alt="signature"
                    src={`data: image/jpeg;base64, ${curAnswer.answer}`}
                />
            );
        case TYPES.SINGLE_PHOTO:
            var URL = `${FILE_STORAGE_URL}/${curAnswer.answer}`;
            return (
                <img
                    style={{ cursor: 'zoom-in' }}
                    alt=""
                    src={URL + '?width=100'}
                    onClick={() =>
                        dispatch(showModal(PIN_IMAGE, { image: URL }))
                    }
                />
            );
        case TYPES.MULTI_PHOTO:
            return curAnswer.answer.map((item, i) => {
                var URL = `${FILE_STORAGE_URL}/${item}`;
                return (
                    <img
                        style={{ cursor: 'zoom-in' }}
                        alt={`${i + 1} of ${curAnswer.answer.length}`}
                        key={item}
                        src={URL + '?width=100'}
                        onClick={() =>
                            dispatch(showModal(PIN_IMAGE, { image: URL }))
                        }
                    />
                );
            });
        case TYPES.STATUS:
            return <p>{PIN_STATUS_TYPES[status]}</p>;
        default:
            return notFoundResponse;
    }
};

const mapStateToProps = ({
    companyAdmin: {
        addPinDropdownOptions: { dropdownOptions }
    }
}) => ({
    dropdownOptions
});

export default connect(mapStateToProps)(PinAnswer);
