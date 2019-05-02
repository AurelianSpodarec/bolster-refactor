import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    LABEL_QUES_TYPES,
    LABEL_QUES_TYPES_NUMS,
    LABEL_STATIC_FIELDS
} from 'constants/shared/templateBuilder';
import LabelFieldItem from '../presentational/LabelFieldItem';

class LabelFieldItemContainer extends Component {
    render() {
        const { field, question } = this.props;
        const { title, source, staticField } = field.config;
        const { STATIC, DYNAMIC } = LABEL_QUES_TYPES_NUMS;
        let content;
        if (source + '' === STATIC + '')
            content = LABEL_STATIC_FIELDS[staticField];
        if (source + '' === DYNAMIC + '' && question) content = question.name;

        return (
            <LabelFieldItem
                source={LABEL_QUES_TYPES[source]}
                title={title}
                content={content}
            />
        );
    }
}

const mapStateToProps = (
    {
        superAdmin: {
            templateQuestionsReducer: { questions }
        }
    },
    { field: { config } }
) => ({
    question: questions[config.questionUUID]
});

export default connect(mapStateToProps)(LabelFieldItemContainer);
