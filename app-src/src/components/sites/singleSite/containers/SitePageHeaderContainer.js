import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

class SitePageHeaderContainer extends Component {
    render() {
        return (
            <PageHeading title={'Site:'}>
                <Link to="/site">Change Ownership</Link>
            </PageHeading>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SitePageHeaderContainer);
