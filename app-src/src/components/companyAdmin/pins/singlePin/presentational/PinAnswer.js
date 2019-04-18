import React from 'react';
import { QUESTION_TYPE_NUMBERS as TYPES } from 'constants/shared/templateBuilder';
import { FILE_STORAGE_URL } from 'config';

const PinAnswer = ({ trimmedAnswer, type, questions, answers }) => {
    let contentDisplay = '';
    let relevantQuestion;
    let relevantOption;
    let relevantOptions;
    let tmpAnswer = answers.filter(item => +item.id === +trimmedAnswer.id);

    if (!tmpAnswer || !tmpAnswer.length) {
        return <p>Not Found</p>;
    }

    let curAnswer = tmpAnswer[0];

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

            relevantOption = relevantQuestion.options.filter(
                option => option.id === curAnswer.answer
            )[0];

            contentDisplay = relevantOption.text;
            return <p>{contentDisplay}</p>;
        case TYPES.MULTI_DROPDOWN:
            relevantQuestion = questions.filter(
                item => +item.id === curAnswer.templateQuestionID
            )[0];

            relevantOptions = relevantQuestion.options.filter(option =>
                curAnswer.answer.includes(option.id)
            );

            relevantOptions.forEach(x => {
                contentDisplay += x.text + ', ';
            });

            return <p>{contentDisplay}</p>;
        case TYPES.CHECKBOX:
            contentDisplay = curAnswer.answer ? 'Yes' : 'No';
            return <p>{contentDisplay}</p>;
        case TYPES.SIGNATURE:
            contentDisplay = <img alt="" src={curAnswer.answer} />;
            return <p>{contentDisplay}</p>;
        case TYPES.SINGLE_PHOTO:
            contentDisplay = curAnswer.answer;
            return (
                <img alt="" src={FILE_STORAGE_URL + '/' + curAnswer.answer} />
            );
        case TYPES.MULTI_PHOTO:
            curAnswer.answer.forEach(x => {
                contentDisplay = (
                    <img alt="" src={FILE_STORAGE_URL + '/' + x} />
                );
            });
            return curAnswer.answer.map(item => {
                return (
                    <img
                        alt=""
                        key={item}
                        src={FILE_STORAGE_URL + '/' + item}
                    />
                );
            });

        default:
            contentDisplay = curAnswer.answer;
    }

    return <p>Not Found</p>;
};

export default PinAnswer;
