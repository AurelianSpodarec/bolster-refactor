import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import TemplatesTable from '../presentational/TemplatesTable';

class TempaltesTableContainer extends Component {
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

const mapStateToProps = ({
    superAdmin: {
        templatesReducer: { templates, isFetching, error }
    }
}) => ({
    templates: Object.values(templates),
    isFetching,
    error
});

const TableWithConnect = connect(mapStateToProps)(TempaltesTableContainer);

export default withRouter(TableWithConnect);
