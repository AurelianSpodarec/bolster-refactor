import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DrawingsTableContainer extends Component {
    render() {
        return (
            <div className="content-container size-lg-12">
                <div className="content-area size-lg-12">
                    <h1 className="heading heading-1 size-lg-12">
                        DrawingsTableContainer
                    </h1>
                    <Link className="button" to="/drawings/1">
                        View drawing
                    </Link>
                </div>
            </div>
        );
    }
}

export default DrawingsTableContainer;
