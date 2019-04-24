import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class ButtonNoClickContainer extends Component {
    state = {
        hover: false
    };

    render() {
        const {
            children,
            companySettings,
            to = '',
            type = 'buttton',
            className = ''
        } = this.props;
        const { hover } = this.state;

        const normalStyle = {
            backgroundColor: '#939393'
        };

        const hoverStyle = {
            backgroundColor: companySettings.colourCode
        };

        return to && to.length ? (
            <div
                className={`link-holder ${className}`}
                onMouseLeave={() => this.handleMouseLeave()}
                onMouseOver={() => this.handleMouseOver()}
                style={hover ? hoverStyle : normalStyle}
            >
                <Link to={to}>{children}</Link>
            </div>
        ) : (
            <button
                className={`button ${className}`}
                onMouseLeave={() => this.handleMouseLeave()}
                onMouseOver={() => this.handleMouseOver()}
                style={hover ? hoverStyle : normalStyle}
                type={type}
            >
                {children}
            </button>
        );
    }

    handleMouseOver = () => {
        this.setState({
            hover: true
        });
    };

    handleMouseLeave = () => {
        this.setState({
            hover: false
        });
    };
}

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: { companySettings }
    }
}) => ({
    companySettings
});

export default withRouter(connect(mapStateToProps)(ButtonNoClickContainer));
