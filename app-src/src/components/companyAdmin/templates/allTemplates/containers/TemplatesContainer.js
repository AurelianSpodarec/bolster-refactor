import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchAllTemplates from 'actions/companyAdmin/templates/async/fetchAllTemplates';
import Templates from '../presentational/Templates';

class TemplatesContainer extends Component {
    render = () => <Templates />;

    componentDidMount = () => this.props.fetchAllTemplates();
}

const mapDispatchToProps = dispatch => ({
    fetchAllTemplates: () => dispatch(fetchAllTemplates())
});

export default connect(
    null,
    mapDispatchToProps
)(TemplatesContainer);
