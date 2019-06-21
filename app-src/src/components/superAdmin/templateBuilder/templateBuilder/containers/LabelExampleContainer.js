import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class LabelExampleContainer extends Component {
    render() {
        return <div className="size-lg-12">Test</div>;
    }
}

const mapStateToProps = (
    {
        superAdmin: {
            templatesReducer: { templates },
            templateLabelFieldsReducer: { labelFields }
        }
    },
    {
        match: {
            params: { uuid, companyID }
        }
    }
) => ({
    companyID,
    template: templates[uuid],
    labelFields: Object.values(labelFields).filter(
        ({ templateUUID }) => templateUUID === uuid
    )
});

const WithConnect = connect(
    mapStateToProps,
    null
)(LabelExampleContainer);

export default withRouter(WithConnect);
