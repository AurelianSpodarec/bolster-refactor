import React from 'react';
import { connect } from 'react-redux';

import TemplateSectionQuestion from '../presentational/TemplateSectionQuestion';
import selectQuestion from 'actions/companyAdmin/templates/sync/selectQuestion';

const TemplateSectionQuestionContainer = ({
    question,
    dispatch,
    onMobile,
    headers
}) => (
    <TemplateSectionQuestion
        question={question}
        onMobile={onMobile}
        headers={headers}
        selectQuestion={id => dispatch(selectQuestion(id))}
    />
);

const mapStateToProps = ({
    shared: {
        mobileReducer: { onMobile }
    }
}) => ({
    onMobile
});
export default connect(mapStateToProps)(TemplateSectionQuestionContainer);
