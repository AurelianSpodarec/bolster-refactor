import React from 'react';
import { connect } from 'react-redux';

import ShareLinkDrawing from '../presentational/ShareLinkDrawing';
import fetchDrawingByShareLink from 'actions/frontEnd/drawings/async/fetchDrawingByShareLink';
import { componentDidMount } from 'helpers/generic';

const ShareLinkDrawingContainer = ({ shareKey, fetchDrawingByShareLink }) => {
    componentDidMount(() => fetchDrawingByShareLink(shareKey));
    return <ShareLinkDrawing />;
};

const mapStateToProps = ({ frontEnd }, { match: { params } }) => ({
    shareKey: params.shareKey
});

const mapDispatchToProps = { fetchDrawingByShareLink };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShareLinkDrawingContainer);
