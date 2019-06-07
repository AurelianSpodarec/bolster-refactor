import React from 'react';
import { connect } from 'react-redux';

import TemplateSectionQuestionDetails from '../presentational/TemplateSectionQuestionDetails';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { formatQuestions, getQuestionDetails } from 'helpers/templates';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { COMPANY_EDIT_TEMPLATE_QUESTION } from 'constants/shared/modalTypes';
import { QUESTION_TYPE_NUMBERS as TYPES } from 'constants/shared/templateBuilder';
import fetchAllDropdownOptions from 'actions/companyAdmin/dropdownOptions/async/fetchAllDropdownOptions';

class TemplateSectionQuestionDetailsContainer extends React.Component {
    render = () => {
        const { question, options, showModal } = this.props;

        return (
            <BlockContainer>
                <TemplateSectionQuestionDetails
                    question={question}
                    details={question && getQuestionDetails(question, options)}
                    showModal={() =>
                        showModal(COMPANY_EDIT_TEMPLATE_QUESTION, { question })
                    }
                />
            </BlockContainer>
        );
    };
    componentDidUpdate = prevProps => {
        const {
            shouldFetchOptions,
            fetchAllDropdownOptions,
            question
        } = this.props;
        if (
            shouldFetchOptions &&
            question.optionType !== prevProps.question.optionType
        ) {
            fetchAllDropdownOptions(question.optionType);
        }
    };
}

const mapStateToProps = ({
    companyAdmin: {
        templateQuestionsReducer: { selectedQuestionID, questions },
        dropdownOptionsReducer: { dropdownOptions }
    }
}) => {
    const question =
        formatQuestions(Object.values(questions)).find(
            ({ id }) => id === selectedQuestionID
        ) || {};
    const optionsTypes = [
        TYPES.DROPDOWN_OPTIONS,
        TYPES.MULTI_DROPDOWN_OPTIONS,
        TYPES.MULTI_MULTI_DROPDOWN_OPTIONS
    ];
    const shouldFetchOptions = question && optionsTypes.includes(question.type);
    const options = Object.values(dropdownOptions).filter(
        ({ type }) => type === question.optionType
    );
    return {
        question,
        options,
        shouldFetchOptions
    };
};

const mapDispatchToProps = { showModal, fetchAllDropdownOptions };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateSectionQuestionDetailsContainer);
