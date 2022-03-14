import React, { memo } from 'react';
import { connect } from 'react-redux';

import { QUESTION_TYPE_NUMBERS as TYPES } from 'constants/shared/templateBuilder';
import { FILE_STORAGE_URL, RAW_S3_STORAGE_URL } from 'config';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { PIN_IMAGE } from 'constants/shared/modalTypes';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import { isEmpty, isObjEmpty } from 'helpers/generic';
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
            if (typeof curAnswer.answer === 'number' && optionValuesLookup[curAnswer.answer]) {
                curAnswer.answer = optionValuesLookup[curAnswer.answer].name;
            }
        } else if (
            type === TYPES.MULTI_DROPDOWN_OPTIONS ||
            type === TYPES.MULTI_MULTI_DROPDOWN_OPTIONS
        ) {
            if (Array.isArray(curAnswer.answer)) {
                curAnswer.answer = curAnswer.answer.map(ans => {
                    if (!ans) {
                        return null;
                    }
                    // handles manufacturer option
                    if (optionValuesLookup[+ans]) {
                        return optionValuesLookup[+ans].name;
                    }
                    // handle other
                    return ans;
                });
            }
        }
    }

    if ((!curAnswer || isEmpty(curAnswer.answer)) && type !== TYPES.STATUS) {
        return notFoundResponse;
    }

    switch (type) {
        case TYPES.SINGLE_LINE:
        case TYPES.MULTI_LINE:
        case TYPES.NUMBER:
            inner = <p>{curAnswer.answer}</p>;
            break;
        case TYPES.DROPDOWN_OPTIONS:
            inner = <p>{curAnswer.answer}</p>;
            break;
        case TYPES.MULTI_DROPDOWN_OPTIONS:
            if (Array.isArray(curAnswer.answer)) {
                inner = <p>{curAnswer.answer.join(', ')}</p>;
            } else {
                inner = <p>{curAnswer.answer}</p>;
            }
            break;
        case TYPES.MULTI_MULTI_DROPDOWN:
        case TYPES.MULTI_MULTI_DROPDOWN_OPTIONS:
            inner = <p>{formatMultiMulti(curAnswer.answer)}</p>;
            break;
        case TYPES.DROPDOWN:
        case TYPES.RADIO: {
            const relevantQuestion = questions.find(
                ({ id }) => +id === +curAnswer.templateQuestionID,
            );

            if (!relevantQuestion) return notFoundResponse;

            const relevantOption = relevantQuestion.options.find(({ id }) => {
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
        }
        case TYPES.MULTI_DROPDOWN: {
            const { options } = questions.find(item => +item.id === curAnswer.templateQuestionID);
            const relevantOptions = options.filter(({ id }) => curAnswer.answer.includes(id));
            inner = <p>{relevantOptions.map(({ text }) => text).join(', ')}</p>;
            break;
        }
        case TYPES.CHECKBOX:
            inner = <p>{curAnswer.answer ? 'Yes' : 'No'}</p>;
            break;
        case TYPES.SIGNATURE: {
            let answerString = curAnswer.answer;
            if (
                !answerString.startsWith('data:') &&
                !answerString.endsWith('.png') &&
                !answerString.endsWith('.jpg') &&
                !answerString.endsWith('.jpeg')
            ) {
                answerString = `data: image/jpeg;base64,${answerString}`;
            }

            if (
                answerString.endsWith('.png') ||
                answerString.endsWith('.jpg') ||
                answerString.endsWith('.jpeg')
            ) {
                answerString = `${FILE_STORAGE_URL}/${answerString}`;
            }
            if (
                answerString.endsWith('.doc') ||
                answerString.endsWith('.pdf') ||
                answerString.endsWith('.docx')
            ) {
                const docURL = `${RAW_S3_STORAGE_URL}/${curAnswer.answer}`;
                inner = (
                    <ButtonContainer to={docURL} isAnchor className="btn blue" openNewTab>
                        <i className="table-icon far fa-eye" />
                        View file
                    </ButtonContainer>
                );
            } else {
                inner = <img className="signature" alt="signature" src={answerString} />;
            }

            break;
        }
        case TYPES.SINGLE_PHOTO: {
            const URL = `${FILE_STORAGE_URL}/${curAnswer.answer}`;
            inner = (
                <img
                    style={{ cursor: 'zoom-in' }}
                    alt=""
                    src={URL + '?width=100'}
                    onClick={() => dispatch(showModal(PIN_IMAGE, { image: URL + '?width=1500' }))}
                />
            );
            break;
        }
        case TYPES.MULTI_PHOTO:
            if (Array.isArray(curAnswer.answer)) {
                inner = curAnswer.answer.map((item, i) => {
                    const URL = `${FILE_STORAGE_URL}/${item}`;
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
            } else {
                const URL = `${FILE_STORAGE_URL}/${curAnswer.answer}`;
                inner = (
                    <img
                        style={{ cursor: 'zoom-in' }}
                        alt=""
                        src={URL + '?width=100'}
                        onClick={() =>
                            dispatch(showModal(PIN_IMAGE, { image: URL + '?width=1500' }))
                        }
                    />
                );
            }
            break;
        case TYPES.DOCUMENT_UPLOAD: {
            const docURL = `${RAW_S3_STORAGE_URL}/${curAnswer.answer}`;
            inner = (
                <ButtonContainer to={docURL} isAnchor className="btn blue" openNewTab>
                    <i className="table-icon far fa-eye" />
                    View pdf
                </ButtonContainer>
            );
            break;
        }
        default:
            return notFoundResponse;
    }
    return (
        <FieldOutput
            title={question.name}
            key={question.id}
            sizeClass="size-lg-4 size-md-12 flex-row-item"
        >
            {inner}
        </FieldOutput>
    );
};

export default memo(connect()(PinAnswer));

function formatMultiMulti(answer) {
    if (!Array.isArray(answer)) return answer;
    const formatted = answer.map(item => {
        const count = answer.filter(x => item === x).length;
        return count > 1 && item ? `${item} (${count})` : item;
    });

    return [...new Set(formatted)].join(', ');
}
