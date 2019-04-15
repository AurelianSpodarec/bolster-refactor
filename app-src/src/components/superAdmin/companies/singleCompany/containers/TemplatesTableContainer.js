import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import TemplatesTable from '../presentational/TemplatesTable';

class TemplatesTableContainer extends Component {
    render() {
        const { templates, isFetching, error } = this.props;

        return (
            <BlockContainer>
                <TemplatesTable
                    headers={['Name', '']}
                    templates={templates}
                    isFetching={isFetching}
                    error={error}
                />
            </BlockContainer>
        );
    }
}

const mapStateToProps = (
    {
        superAdmin: {
            templatesReducer: { templates, isFetching, error }
        }
    },
    { match }
) => ({
    templates: Object.values(templates).filter(
        temp => +temp.companyID === +match.params.id
    ),
    isFetching,
    error
});

const TableWithConnect = connect(mapStateToProps)(TemplatesTableContainer);

export default withRouter(TableWithConnect);
