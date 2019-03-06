import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DRAWING_TABS } from 'constants/tabNames';
import setTabs from 'actions/generic/tabs/sync/setTabs';

import SingleDrawing from '../presentational/SingleDrawing';

class SingleDrawingContainer extends Component {
    render() {
        return <SingleDrawing />;
    }

    componentDidMount = () => {
        this.props.dispatch(
            setTabs(Object.values(DRAWING_TABS), DRAWING_TABS.GENERAL_OVERVIEW)
        );
    };
}

export default connect()(SingleDrawingContainer);
