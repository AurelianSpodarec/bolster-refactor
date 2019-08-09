import React from 'react';
import { connect } from 'react-redux';

import ShareLinkDrawing from '../presentational/ShareLinkDrawing';
import fetchDrawingByShareLink from 'actions/frontEnd/drawings/async/fetchDrawingByShareLink';
import { componentDidMount, componentWillUnmount } from 'helpers/generic';
import fetchPinsByShareLink from 'actions/frontEnd/pins/async/fetchPinsByShareLink';
import setHideFrontEndHeader from 'actions/frontEnd/layout/setHideFrontEndHeader';

const ShareLinkDrawingContainer = ({
    fetchDrawingByShareLink,
    fetchPinsByShareLink,
    setHideFrontEndHeader,
    match: {
        params: { shareKey }
    },
    drawing,
    pins
}) => {
    componentDidMount(() => {
        setHideFrontEndHeader(true);
        fetchDrawingByShareLink(shareKey);
        fetchPinsByShareLink(shareKey);
    });

    componentWillUnmount(setHideFrontEndHeader);

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

const mapDispatchToProps = { fetchDrawingByShareLink, fetchPinsByShareLink, setHideFrontEndHeader };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShareLinkDrawingContainer);
