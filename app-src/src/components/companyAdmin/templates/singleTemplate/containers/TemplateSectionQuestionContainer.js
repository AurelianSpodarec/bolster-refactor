import React from 'react';
import { connect } from 'react-redux';

import TemplateSectionQuestion from '../presentational/TemplateSectionQuestion';
import selectQuestion from 'actions/companyAdmin/templates/sync/selectQuestion';

const TemplateSectionQuestionContainer = ({ question, dispatch }) => (
    <TemplateSectionQuestion
        question={question}
        selectQuestion={id => dispatch(selectQuestion(id))}
    />
);

export default connect()(TemplateSectionQuestionContainer);
