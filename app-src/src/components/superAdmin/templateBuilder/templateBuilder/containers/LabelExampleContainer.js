import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BolsterLabelFieldsExample from 'components/shared/generic/form/presentational/BolsterLabelFieldsExample';

class LabelExampleContainer extends Component {
    render() {
        const { labelFields } = this.props;

        return <BolsterLabelFieldsExample fields={labelFields} />;
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
