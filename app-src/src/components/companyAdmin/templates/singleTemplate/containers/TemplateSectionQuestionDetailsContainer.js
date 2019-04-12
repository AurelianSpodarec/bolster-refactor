import React, { Component } from 'react';
import TemplateSectionQuestionDetails from '../presentational/TemplateSectionQuestionDetails';
import { QUESTION_TYPE_VALUES as VALS } from 'constants/shared/templateBuilder';

export default class TemplateSectionQuestionDetailsContainer extends Component {
    render() {
        const { question } = this.props;
        const { companyCanEdit } = question;
        console.log(question);
        return (
            <TemplateSectionQuestionDetails
                question={question}
                details={this.getQuestionDetails(question)}
            />
        );
    }

    getQuestionDetails = () => {
        // shared: type, ishidden, isprefill, isrequired, groupkey
        const { question } = this.props;
        const {
            questionType,
            isHidden,
            isPrefill,
            isRequired,
            groupKey
        } = question;
        const options = {
            'Question type': questionType,
            Hidden: `${!isHidden && 'Not '}Hidden`,
            Prefill: `${!isPrefill && 'Not '}Prefilled`,
            Required: `${!isRequired && 'Not '}Required`,
            'Group Key': groupKey
        };
        switch (questionType) {
            case VALS.SINGLE_LINE:
            case VALS.MULTI_LINE:
                return { ...options, 'Character limit': question.charLimit };
            case VALS.NUMBER:
                return { ...options, 'Max number': question.maxNum };
            case VALS.DROPDOWN:
            case VALS.MULTI_DROPDOWN:
            case VALS.RADIO:
                // ! options, companyCanEdit
                // ? return [...options, {'Question options': question.options.map()}]
                break;
            case VALS.MULTI_PHOTO:
                return { ...options, 'Max photos': question.maxPhotos };
            default:
                return options;
            // empty obj
        }
    };
}
