import React from 'react';
import { connect } from 'react-redux';

import TemplateSectionQuestionDetails from '../presentational/TemplateSectionQuestionDetails';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { formatQuestions, getQuestionDetails } from 'helpers/templates';

const TemplateSectionQuestionDetailsContainer = ({ question }) => (
    <BlockContainer>
        {question && (
            <TemplateSectionQuestionDetails
                question={question}
                details={getQuestionDetails(question)}
                canCompanyEdit={question.canCompanyEdit}
            />
        )}
    </BlockContainer>
);

const mapStateToProps = ({
    companyAdmin: {
        templateQuestionsReducer: { selectedQuestionID, questions }
    }
}) => ({
    question: formatQuestions(Object.values(questions)).find(
        ({ id }) => id === selectedQuestionID
    )
});

export default connect(mapStateToProps)(
    TemplateSectionQuestionDetailsContainer
);
