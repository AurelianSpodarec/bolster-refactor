import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'components/shared/generic/tables/presentational/Table';
import TemplateQuestionList from '../presentational/TemplateQuestionList';

class TemplateQuestionListContainer extends Component {
    render() {
        return (
            <Table
                withActions
                headers={['Reorder', 'Name', 'Type', 'Is required', '']}
            >
                <TemplateQuestionList questions={this.props.questions} />
            </Table>
        );
    }
}

export default connect()(TemplateQuestionListContainer);
