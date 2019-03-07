import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FloorDrawingsTableContainer extends Component {
    render() {
        return (
            <div className="size-lg-12">
                <h1 className="heading heading-1 size-lg-12">
                    DrawingsTableContainer
                </h1>
                <Link className="button" to="/drawings/1">
                    View drawing
                </Link>
            </div>
        );
    }
}

export default FloorDrawingsTableContainer;
