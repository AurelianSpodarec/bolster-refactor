import React, { memo } from 'react';
import { connect, useSelector } from 'react-redux';

import { QUESTION_TYPE_NUMBERS as TYPES } from 'constants/shared/templateBuilder';
import { FILE_STORAGE_URL, RAW_S3_STORAGE_URL } from 'config';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { PIN_IMAGE } from 'constants/shared/modalTypes';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import { boolToYesNo, isEmpty, isObjEmpty } from 'helpers/generic';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import { selectPinOptionVersions } from '../../../../../selectors/companyAdmin/pinOptionVersions';

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
    const versions = useSelector(selectPinOptionVersions);
    console.log({ curAnswer });
    const notFoundResponse = null;
    let inner;

    // if ((!curAnswer || isEmpty(curAnswer.answer)) && type !== TYPES.STATUS) {
    //     return notFoundResponse;
    // }
    if (!curAnswer?.answerValues || curAnswer.answerValues.length === 0) {
        return notFoundResponse;
    }
    const curAnswerValues = curAnswer.answerValues.map(value => {
        if (!value.pinOptionVersionID) return value;
        // todo add pin option version text
        return {
            ...value,
            pinOptionVersionName: versions[value.pinOptionVersionID]?.name,
        };
    });
    console.log({ curAnswerValues });

    switch (type) {
        case TYPES.SINGLE_LINE:
        case TYPES.MULTI_LINE:
        case TYPES.DROPDOWN:
        case TYPES.RADIO:
        case TYPES.MULTI_DROPDOWN: {
            const answerText = curAnswerValues.map(value => value.textValue).join(', ');
            inner = <p>{answerText}</p>;
            break;
        }
        case TYPES.NUMBER: {
            const answerText = curAnswerValues
                .map(value => value.numericValue.toString())
                .join(', ');
            inner = <p>{answerText} </p>;
            break;
        }
        case TYPES.PIN_OPTION_TYPES:
        case TYPES.MULTI_PIN_OPTION_TYPES: {
            const answerText = curAnswerValues.map(value => value.pinOptionVersionName).join(', ');
            inner = <p>{answerText}</p>;
            break;
        }
        case TYPES.MULTI_MULTI_DROPDOWN: {
            const answerText = formatMultiMulti(curAnswerValues.map(value => value.textValue));
            inner = <p>{answerText}</p>;
            break;
        }
        case TYPES.MULTI_MULTI_PIN_OPTION_TYPES: {
            const answerText = formatMultiMulti(
                curAnswerValues.map(value => value.pinOptionVersionName),
            );
            inner = <p>{answerText}</p>;
            break;
        }
        case TYPES.CHECKBOX: {
            const answerText = curAnswerValues.map(value => boolToYesNo(value.booleanValue));
            inner = <p>{answerText}</p>;
            break;
        }
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
