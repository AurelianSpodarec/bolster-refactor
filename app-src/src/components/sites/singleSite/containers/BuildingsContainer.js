import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BuildingsContainer extends Component {
    render() {
        return (
            <div className="content-container size-lg-12">
                <div className="content-area size-lg-12">
                    <h1 className="heading heading-1 size-lg-12">
                        BuildingsTableContainer
                    </h1>
                    <Link className="button" to="/buildings/1">
                        View building
                    </Link>
                </div>
            </div>
        );
    }
}

export default BuildingsContainer;
