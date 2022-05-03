import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { QUESTION_TYPE_NUMBERS as TYPES } from 'constants/shared/templateBuilder';
import { FILE_STORAGE_URL, RAW_S3_STORAGE_URL } from 'config';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { PIN_IMAGE } from 'constants/shared/modalTypes';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import { boolToYesNo } from 'helpers/generic';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import { selectPinOptionVersions } from '../../../../../selectors/companyAdmin/pinOptionVersions';

const PinAnswer = ({ trimmedAnswer, type, answers, question }) => {
    const dispatch = useDispatch();
    const curAnswer = { ...answers.find(item => +item.id === +trimmedAnswer.id) };
    const versions = useSelector(selectPinOptionVersions);

    const notFoundResponse = null;
    let inner;

    if (!curAnswer?.answerValues || curAnswer.answerValues.length === 0) {
        return notFoundResponse;
    }
    const curAnswerValues = curAnswer.answerValues.map(value => {
        if (!value.pinOptionVersionID) return value;
        return {
            ...value,
            // map version name to textValue for output
            textValue: versions[value.pinOptionVersionID]?.name,
        };
    });

    switch (type) {
        case TYPES.SINGLE_LINE:
        case TYPES.MULTI_LINE:
        case TYPES.DROPDOWN:
        case TYPES.RADIO:
        case TYPES.MULTI_DROPDOWN:
        case TYPES.PIN_OPTION_TYPES:
        case TYPES.MULTI_PIN_OPTION_TYPES: {
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
        case TYPES.MULTI_MULTI_DROPDOWN:
        case TYPES.MULTI_MULTI_PIN_OPTION_TYPES: {
            const answerText = formatMultiMulti(
                curAnswerValues.map(value => value.textValue).filter(Boolean),
            );
            inner = <p>{answerText}</p>;
            break;
        }
        case TYPES.CHECKBOX: {
            const answerText = curAnswerValues
                .map(value => boolToYesNo(value.booleanValue))
                .join(', ');
            inner = <p>{answerText}</p>;
            break;
        }
        case TYPES.SIGNATURE: {
            const [answerValue] = curAnswerValues;
            let answerString = '';
            if (answerValue.base64Value) {
                if (!answerValue.base64Value.startsWith('data:')) {
                    answerString = `data: image/jpeg;base64,${answerValue.base64Value}`;
                } else {
                    answerString = answerValue.base64Value;
                }
            } else if (answerValue.s3KeyValue) {
                const extension = answerValue.s3KeyValue.split('.').pop().toLowerCase();
                const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(extension);
                const isDocument = ['pdf', 'doc', 'docx'].includes(extension);
                const storageURL = isImage ? FILE_STORAGE_URL : RAW_S3_STORAGE_URL;
                answerString = `${storageURL}/${answerValue.s3KeyValue}`;
                if (isDocument) {
                    inner = (
                        <ButtonContainer to={answerString} isAnchor className="btn blue" openNewTab>
                            <i className="table-icon far fa-eye" />
                            View file
                        </ButtonContainer>
                    );
                    break;
                }
            }
            inner = <img src={answerString} alt="signature" className="signature" />;
            break;
        }
        case TYPES.SINGLE_PHOTO:
        case TYPES.MULTI_PHOTO:
            {
                inner = curAnswerValues.map((item, i, arr) => {
                    const isOnlyItem = arr.length === 1;
                    const altText = isOnlyItem ? 'Photo' : `Photo ${i + 1}`;
                    const URL = `${FILE_STORAGE_URL}/${item.s3KeyValue}`;
                    return (
                        <img
                            style={{ cursor: 'zoom-in' }}
                            alt={altText}
                            key={item}
                            src={URL + '?width=100'}
                            onClick={() =>
                                dispatch(showModal(PIN_IMAGE, { image: URL + '?width=1500' }))
                            }
                        />
                    );
                });
            }
            break;
        case TYPES.DOCUMENT_UPLOAD: {
            const [answerValue] = curAnswerValues;
            const docURL = `${RAW_S3_STORAGE_URL}/${answerValue.s3KeyValue}`;
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

    let measurementOutputs = [];

    curAnswer.measurements?.forEach(measurement => {
        const answerValue = curAnswerValues.find(
            ({ id }) => id === measurement.pinHistoryAnswerValueID,
        );
        const measurementOutput = (
            <div key={measurement.id} className="pin-answer-measurements">
                <p className="pin-answer-measurements-heading">
                    {answerValue.textValue} measurements:
                </p>
                {measurement.length && <p>Length: {measurement.length}</p>}
                {measurement.width && <p>Width: {measurement.width}</p>}
                {measurement.height && <p>Height: {measurement.height}</p>}
                {measurement.radius && <p>Radius: {measurement.radius}</p>}
                {measurement.volume && <p>Volume: {measurement.volume}</p>}
            </div>
        );
        measurementOutputs.push(measurementOutput);
    });
    return (
        <FieldOutput
            title={question.name}
            key={question.id}
            sizeClass="size-lg-4 size-md-12 flex-row-item"
        >
            {inner}
            {measurementOutputs}
        </FieldOutput>
    );
};

export default memo(PinAnswer);

function formatMultiMulti(answer) {
    const answerCounts = answer.reduce((acc, cur) => {
        acc[cur] = (acc[cur] ?? 0) + 1;
        return acc;
    }, {});
    return Object.entries(answerCounts)
        .map(([name, count]) => (count === 1 ? name : `${name} (${count})`))
        .join(', ');
}
