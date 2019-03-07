import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BuildingsTableContainer extends Component {
    render() {
        return (
            <div className="size-lg-12">
                <h1 className="heading heading-1 size-lg-12">
                    BuildingsTableContainer
                </h1>
                <Link className="button" to="/buildings/1">
                    View building
                </Link>
            </div>
        );
    }
}

export default BuildingsTableContainer;
