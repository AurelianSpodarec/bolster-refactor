import React from 'react';
import { QUESTION_TYPE_NUMBERS as TYPES } from 'constants/shared/templateBuilder';
import { FILE_STORAGE_URL, RAW_S3_STORAGE_URL } from 'config';
import { isEmpty, isObjEmpty } from 'helpers/generic';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { PIN_IMAGE } from 'constants/shared/modalTypes';
import { connect } from 'react-redux';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const PinAnswer = ({
    trimmedAnswer,
    type,
    questions,
    answers,
    dispatch,
    question,
    optionValuesLookup,
}) => {
    const curAnswer = { ...answers.find(item => +item.id === +trimmedAnswer.id) };

    const notFoundResponse = null;
    let inner;

    if (!isObjEmpty(optionValuesLookup) && !!curAnswer.answer) {
        if (type === TYPES.DROPDOWN_OPTIONS && optionValuesLookup[curAnswer.answer]) {
            curAnswer.answer = optionValuesLookup[curAnswer.answer].name;
        } else if (
            type === TYPES.MULTI_DROPDOWN_OPTIONS ||
            type === TYPES.MULTI_MULTI_DROPDOWN_OPTIONS
        ) {
            curAnswer.answer = curAnswer.answer.map(ans => {
                if (!ans) {
                    return null;
                }
                // handles manufacturer option
                if (+ans && optionValuesLookup[ans]) {
                    return optionValuesLookup[ans].name;
                }
                // handle other
                return ans;
            });
        }
    }

    if ((!curAnswer || isEmpty(curAnswer.answer)) && type !== TYPES.STATUS) {
        return notFoundResponse;
    }

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
                ({ id }) => +id === +curAnswer.templateQuestionID,
            );
            if (!relevantQuestion) return notFoundResponse;

            var relevantOption = relevantQuestion.options.find(({ id }) => {
                if (id === curAnswer.answer) return true;
                // radio button answers are used as their ID,
                // but when going into db the answer has special quote chars replaced
                if (typeof id === 'string') {
                    const apostropheRegex = /[‘’]/gi;
                    return (
                        curAnswer.answer ===
                        id.replace(apostropheRegex, "'").replace(apostropheRegex, "'")
                    );
                }
                return false;
            });

            if (!relevantOption) return notFoundResponse;

            inner = <p>{relevantOption.text}</p>;
            break;
        case TYPES.MULTI_DROPDOWN:
            var { options } = questions.find(item => +item.id === curAnswer.templateQuestionID);
            var relevantOptions = options.filter(({ id }) => curAnswer.answer.includes(id));
            inner = <p>{relevantOptions.map(({ text }) => text).join(', ')}</p>;
            break;
        case TYPES.CHECKBOX:
            inner = <p>{curAnswer.answer ? 'Yes' : 'No'}</p>;
            break;
        case TYPES.SIGNATURE:
            var answerString = curAnswer.answer;

            if (
                !answerString.startsWith('data:') &&
                !answerString.endsWith('.png') &&
                !answerString.endsWith('.jpg')
            ) {
                answerString = `data: image/jpeg;base64,${answerString}`;
            }

            if (answerString.endsWith('.png') || answerString.endsWith('.jpg')) {
                answerString = `${FILE_STORAGE_URL}/${answerString}`;
            }
            if (
                answerString.endsWith('.doc') ||
                answerString.endsWith('.pdf') ||
                answerString.endsWith('.docx')
            ) {
                var docURL = `${RAW_S3_STORAGE_URL}/${curAnswer.answer}`;
                inner = (
                    <ButtonContainer to={docURL} isAnchor className="btn blue" openNewTab>
                        <i className="table-icon far fa-eye" />
                        View pdf
                    </ButtonContainer>
                );
            } else {
                inner = <img className="signature" alt="signature" src={answerString} />;
            }

            break;
        case TYPES.SINGLE_PHOTO:
            var URL = `${RAW_S3_STORAGE_URL}/${curAnswer.answer}`;
            inner = (
                <img
                    style={{ cursor: 'zoom-in' }}
                    alt=""
                    src={URL + '?width=100'}
                    onClick={() => dispatch(showModal(PIN_IMAGE, { image: URL + '?width=1500' }))}
                />
            );
            break;
        case TYPES.DOCUMENT_UPLOAD:
            var docURL = `${FILE_STORAGE_URL}/${curAnswer.answer}`;
            inner = (
                <p>
                    <a
                        href={docURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link"
                    >
                        <i className="table-icon far fa-file-alt" /> {curAnswer.answer}
                    </a>
                </p>
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
                            dispatch(showModal(PIN_IMAGE, { image: URL + '?width=1500' }))
                        }
                    />
                );
            });
            break;
        default:
            return notFoundResponse;
    }

    return (
        <FieldOutput title={question.name} key={question.id} sizeClass="size-lg-4 flex-row-item">
            {inner}
        </FieldOutput>
    );
};

export default connect()(PinAnswer);

function formatMultiMulti(answer) {
    if (!Array.isArray(answer)) return answer;
    const formatted = answer.map(item => {
        const count = answer.filter(x => item === x).length;
        return count > 1 ? `${item} x ${count}` : item;
    });

    return [...new Set(formatted)].join(', ');
}
