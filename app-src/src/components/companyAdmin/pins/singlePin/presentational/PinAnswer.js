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
    dispatch
}) => {
    let contentDisplay = '';
    let relevantQuestion;
    let relevantOption;
    let relevantOptions;
    const tmpAnswer = answers.filter(item => +item.id === +trimmedAnswer.id);
    const notFoundResponse = <p>Not Found</p>;

    if (!tmpAnswer || !tmpAnswer.length) return notFoundResponse;

    const curAnswer = tmpAnswer[0];

    switch (type) {
        case TYPES.SINGLE_LINE:
        case TYPES.MULTI_LINE:
        case TYPES.NUMBER:
            contentDisplay = curAnswer.answer;
            return <p>{contentDisplay}</p>;
        case TYPES.DROPDOWN:
        case TYPES.RADIO:
            relevantQuestion = questions.filter(
                item => +item.id === +curAnswer.templateQuestionID
            )[0];
            if (!relevantQuestion) return notFoundResponse;

            relevantOption = relevantQuestion.options.filter(
                option => option.id === curAnswer.answer
            )[0];
            if (!relevantOption) return notFoundResponse;

            contentDisplay = relevantOption.text;
            return <p>{contentDisplay}</p>;
        case TYPES.MULTI_DROPDOWN:
            relevantQuestion = questions.filter(
                item => +item.id === curAnswer.templateQuestionID
            )[0];

            relevantOptions = relevantQuestion.options.filter(({ id }) =>
                curAnswer.answer.includes(id)
            );
            contentDisplay = relevantOptions.join(', ');
            return <p>{contentDisplay}</p>;
        case TYPES.CHECKBOX:
            contentDisplay = curAnswer.answer ? 'Yes' : 'No';
            return <p>{contentDisplay}</p>;
        case TYPES.SIGNATURE:
            contentDisplay = <img alt="signature" src={curAnswer.answer} />;
            return <p>{contentDisplay}</p>;
        case TYPES.SINGLE_PHOTO:
            contentDisplay = curAnswer.answer;
            var URL = `${FILE_STORAGE_URL}/${contentDisplay}`;
            return (
                <img
                    alt=""
                    src={URL + '?width=100'}
                    onClick={() =>
                        dispatch(showModal(PIN_IMAGE, { image: URL }))
                    }
                />
            );
        case TYPES.MULTI_PHOTO:
            return curAnswer.answer.map(item => {
                var URL = `${FILE_STORAGE_URL}/${item}`;
                return (
                    <img
                        alt=""
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
            contentDisplay = curAnswer.answer;
    }

    return notFoundResponse;
};

export default connect()(PinAnswer);
