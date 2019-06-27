import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FormExample from 'components/superAdmin/templateBuilder/templateBuilder/presentational/FormExample';

class FormExampleContainer extends Component {
    render() {
        const { sections } = this.props;

        return <FormExample sections={sections} />;
    }
}

const mapStateToProps = (
    {
        superAdmin: {
            templateSectionsReducer: { sections }
        }
    },
    {
        match: {
            params: { uuid, companyID }
        }
    }
) => ({
    companyID,
    temmplateUUID: uuid,
    sections: Object.values(sections)
        .filter(section => section.templateUUID === uuid)
        .sort((a, b) => a.sort - b.sort)
});
const WithConnect = connect(
    mapStateToProps,
    null
)(FormExampleContainer);

export default withRouter(WithConnect);
