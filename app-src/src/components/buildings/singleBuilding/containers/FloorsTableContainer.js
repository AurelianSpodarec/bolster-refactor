import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FloorsTableContainer extends Component {
    render() {
        return (
            <div className="size-lg-12">
                <h1 className="heading heading-1 size-lg-12">
                    FloorsTableContainer
                </h1>
                <Link className="button" to="/floors/1">
                    View floor
                </Link>
            </div>
        );
    }
}

export default FloorsTableContainer;
