import React from 'react';
import { connect } from 'react-redux';

import TemplateSectionQuestionDetails from '../presentational/TemplateSectionQuestionDetails';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { formatQuestions, getQuestionDetails } from 'helpers/templates';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { COMPANY_EDIT_TEMPLATE_QUESTION } from 'constants/shared/modalTypes';
import { QUESTION_TYPE_NUMBERS as TYPES } from 'constants/shared/templateBuilder';

class TemplateSectionQuestionDetailsContainer extends React.Component {
    render = () => {
        const { question, showModal, pinOptions, pinOptionVersions } = this.props;

        return (
            <BlockContainer>
                <TemplateSectionQuestionDetails
                    question={question}
                    details={
                        question && getQuestionDetails(question, pinOptions, pinOptionVersions)
                    }
                    showModal={() => showModal(COMPANY_EDIT_TEMPLATE_QUESTION, { question })}
                />
            </BlockContainer>
        );
    };
}

const mapStateToProps = ({
    companyAdmin: {
        templateQuestionsReducer: { selectedQuestionID, questions },
        pinOptionsReducer: { options },
        pinOptionVersionsReducer: { versions },
    },
}) => {
    const question =
        formatQuestions(Object.values(questions)).find(({ id }) => id === selectedQuestionID) || {};
    const optionsTypes = [
        TYPES.PIN_OPTION_TYPES,
        TYPES.MULTI_PIN_OPTION_TYPES,
        TYPES.MULTI_MULTI_PIN_OPTION_TYPES,
    ];
    const shouldFetchOptions = question && optionsTypes.includes(question.type);
    return {
        question,
        shouldFetchOptions,
        pinOptions: Object.values(options),
        pinOptionVersions: Object.values(versions),
    };
};

const mapDispatchToProps = { showModal };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TemplateSectionQuestionDetailsContainer);
