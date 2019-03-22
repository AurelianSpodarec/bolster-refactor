import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'components/shared/generic/tables/presentational/Table';
import TemplateFieldList from '../presentational/TemplateFieldList';

class TemplateSectionTableContainer extends Component {
    render() {
        return (
            <Table
                withActions
                headers={['Reorder', 'Name', 'Type', 'Show', '']}
            >
                <TemplateFieldList />
            </Table>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateSectionTableContainer);
