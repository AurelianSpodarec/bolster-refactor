import React from 'react';
import { connect } from 'react-redux';

import TemplateSectionQuestionDetails from '../presentational/TemplateSectionQuestionDetails';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { formatQuestions, getQuestionDetails } from 'helpers/templates';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { COMPANY_EDIT_TEMPLATE_QUESTION } from 'constants/shared/modalTypes';

const TemplateSectionQuestionDetailsContainer = ({ question, showModal }) => (
    <BlockContainer>
        <TemplateSectionQuestionDetails
            question={question}
            details={question && getQuestionDetails(question)}
            showModal={() =>
                showModal(COMPANY_EDIT_TEMPLATE_QUESTION, { question })
            }
        />
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

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateSectionQuestionDetailsContainer);
