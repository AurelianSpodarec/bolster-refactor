import React from 'react';
import { QUESTION_TYPE_NUMBERS as TYPES } from 'constants/shared/templateBuilder';
import { FILE_STORAGE_URL } from 'config';
import { PIN_STATUS_TYPES } from 'constants/companyAdmin/enums';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { PIN_IMAGE } from 'constants/shared/modalTypes';
import { connect } from 'react-redux';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';

const PinAnswer = ({
    trimmedAnswer,
    type,
    questions,
    answers,
    status,
    dispatch,
    question
}) => {
    const curAnswer = answers.find(item => +item.id === +trimmedAnswer.id);
    const notFoundResponse = null;
    let inner;
    if (!curAnswer && type !== TYPES.STATUS) return notFoundResponse;
    switch (type) {
        case TYPES.SINGLE_LINE:
        case TYPES.MULTI_LINE:
        case TYPES.NUMBER:
        case TYPES.DROPDOWN_OPTIONS:
            inner = <p>{curAnswer.answer}</p>;
            break;
        case TYPES.MULTI_DROPDOWN_OPTIONS:
            inner = <p>{curAnswer.answer.join(', ')}</p>;
            break;
        case TYPES.MULTI_MULTI_DROPDOWN:
        case TYPES.MULTI_MULTI_DROPDOWN_OPTIONS:
            inner = <p>{formatMultiMulti(curAnswer.answer)}</p>;
            break;
        case TYPES.DROPDOWN:
        case TYPES.RADIO:
            var relevantQuestion = questions.find(
                ({ id }) => +id === +curAnswer.templateQuestionID
            );
            if (!relevantQuestion) return notFoundResponse;

            var relevantOption = relevantQuestion.options.find(
                ({ id }) => id === curAnswer.answer
            );
            if (!relevantOption) return notFoundResponse;

            inner = <p>{relevantOption.text}</p>;
            break;
        case TYPES.MULTI_DROPDOWN:
            var { options } = questions.find(
                item => +item.id === curAnswer.templateQuestionID
            );
            var relevantOptions = options.filter(({ id }) =>
                curAnswer.answer.includes(id)
            );
            inner = <p>{relevantOptions.map(({ text }) => text).join(', ')}</p>;
            break;
        case TYPES.CHECKBOX:
            inner = <p>{curAnswer.answer ? 'Yes' : 'No'}</p>;
            break;
        case TYPES.SIGNATURE:
            var answerString = curAnswer.answer;

            if (!answerString.startsWith('data:')) {
                answerString = `data: image/jpeg;base64${answerString}`;
            }

            inner = (
                <img className="signature" alt="signature" src={answerString} />
            );

            break;
        case TYPES.SINGLE_PHOTO:
            var URL = `${FILE_STORAGE_URL}/${curAnswer.answer}`;
            inner = (
                <img
                    style={{ cursor: 'zoom-in' }}
                    alt=""
                    src={URL + '?width=100'}
                    onClick={() =>
                        dispatch(showModal(PIN_IMAGE, { image: URL }))
                    }
                />
            );
            break;
        case TYPES.MULTI_PHOTO:
            inner = curAnswer.answer.map((item, i) => {
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
            break;
        case TYPES.STATUS:
            inner = <p>{PIN_STATUS_TYPES[status]}</p>;
            break;
        default:
            return notFoundResponse;
    }
    return (
        <FieldOutput
            title={question.name}
            key={question.id}
            sizeClass="size-lg-4 flex-row-item"
        >
            {inner}
        </FieldOutput>
    );
};

export default connect()(PinAnswer);

function formatMultiMulti(answer) {
    const formatted = answer.map(item => {
        const count = answer.filter(x => item === x).length;
        return count > 1 ? `${item} (${count})` : item;
    });

    return [...new Set(formatted)].join(', ');
}
