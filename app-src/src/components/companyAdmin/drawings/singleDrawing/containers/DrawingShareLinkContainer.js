import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import DrawingShareLink from '../presentational/DrawingShareLink';
import { componentDidMount } from 'helpers/generic';
import fetchDrawingShareLink from 'actions/companyAdmin/drawings/async/fetchDrawingShareLink';
import createDrawingShareLink from 'actions/companyAdmin/drawings/async/createDrawingShareLink';

const DrawingShareLinkContainer = ({
    drawingID,
    shareLink,
    fetchDrawingShareLink,
    createDrawingShareLink
}) => {
    componentDidMount(() => fetchDrawingShareLink(drawingID));

    return (
        <DrawingShareLink shareLink={shareLink} postShareLink={postShareLink} />
    );

    async function postShareLink() {
        await createDrawingShareLink(drawingID);
        fetchDrawingShareLink(drawingID);
    }
};

const mapStateToProps = (
    {
        companyAdmin: {
            drawingsReducer: { shareLinks }
        }
    },
    { match: { params } }
) => {
    const shareLink = Object.values(shareLinks).find(
        link => +link.drawingID === +params.id
    );
    return { shareLink, drawingID: params.id };
};

const mapDispatchToProps = { fetchDrawingShareLink, createDrawingShareLink };

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(DrawingShareLinkContainer)
);
