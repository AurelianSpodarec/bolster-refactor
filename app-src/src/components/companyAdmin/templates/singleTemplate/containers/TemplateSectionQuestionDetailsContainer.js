import React, { Component } from 'react';
import { connect } from 'react-redux';

import TemplateSectionQuestionDetails from '../presentational/TemplateSectionQuestionDetails';
import { QUESTION_TYPE_VALUES as VALS } from 'constants/shared/templateBuilder';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { formatQuestions } from 'helpers/templates';

class TemplateSectionQuestionDetailsContainer extends Component {
    render() {
        const { isFetching, question = null } = this.props;
        return (
            <BlockContainer isFetching={isFetching}>
                <TemplateSectionQuestionDetails
                    question={question}
                    details={question && this.getQuestionDetails(question)}
                />
            </BlockContainer>
        );
    }

    getQuestionDetails = question => {
        const {
            name,
            questionType,
            isHidden,
            isPrefill,
            isRequired,
            groupKey,
            type
        } = question;
        const options = {
            Name: name,
            'Question type': questionType,
            Hidden: `${!isHidden ? 'Not ' : ''}Hidden`,
            Prefill: `${!isPrefill ? 'Not ' : ''}Prefilled`,
            Required: `${!isRequired ? 'Not ' : ''}Required`,
            'Group Key': groupKey
        };
        switch (String(type)) {
            case VALS.SINGLE_LINE:
            case VALS.MULTI_LINE:
                return { ...options, 'Character limit': question.charLimit };
            case VALS.NUMBER:
                return { ...options, 'Max number': question.maxNum };
            case VALS.DROPDOWN:
            case VALS.MULTI_DROPDOWN:
            case VALS.RADIO:
                return {
                    ...options,
                    'Question options': question.options
                        .map(({ text }) => `"${text}"`)
                        .join(', ')
                };

            case VALS.MULTI_PHOTO:
                return { ...options, 'Max photos': question.maxPhotos };
            default:
                return options;
            // empty obj
        }
    };
}

const mapStateToProps = ({
    companyAdmin: {
        templateQuestionsReducer: { selectedQuestionID, questions },
        templatesReducer: { isFetching }
    }
}) => ({
    questions: Object.values(questions),
    selectedQuestionID,
    isFetching,
    question: (formatQuestions(Object.values(questions)) || []).find(
        ({ id }) => id === selectedQuestionID
    )
});

export default connect(mapStateToProps)(
    TemplateSectionQuestionDetailsContainer
);
