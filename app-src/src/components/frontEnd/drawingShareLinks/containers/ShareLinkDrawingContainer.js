import React from 'react';
import { connect } from 'react-redux';

import ShareLinkDrawing from '../presentational/ShareLinkDrawing';
import fetchDrawingByShareLink from 'actions/frontEnd/drawings/async/fetchDrawingByShareLink';
import { componentDidMount } from 'helpers/generic';
import fetchPinsByShareLink from 'actions/frontEnd/pins/async/fetchPinsByShareLink';

const ShareLinkDrawingContainer = ({
    fetchDrawingByShareLink,
    fetchPinsByShareLink,
    match: {
        params: { shareKey }
    },
    drawing,
    pins
}) => {
    componentDidMount(() => {
        fetchDrawingByShareLink(shareKey);
        fetchPinsByShareLink(shareKey);
    });

    const { siteName, buildingName, floorName, name } = drawing;
    const headerText = [siteName, buildingName, floorName, name]
        .filter(exists => exists)
        .join('/ ');
    return <ShareLinkDrawing drawing={drawing} pins={pins} headerText={headerText} />;
};

const mapStateToProps = ({
    frontEnd: {
        drawingsReducer: { drawing },
        pinsReducer: { pins }
    }
}) => {
    const drawingPins = Object.values(pins).filter(pin => pin.drawingID === drawing.id);
    return { drawing, pins: drawingPins };
};

const mapDispatchToProps = { fetchDrawingByShareLink, fetchPinsByShareLink };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShareLinkDrawingContainer);
