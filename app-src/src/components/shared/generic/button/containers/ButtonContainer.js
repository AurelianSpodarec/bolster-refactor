import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class ButtonContainer extends Component {
    state = {
        hover: false
    };

    render() {
        const {
            children,
            companySettings,
            to = '',
            type = 'buttton',
            handleClick = function() {}
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
                className="link-holder"
                onMouseLeave={() => this.handleMouseLeave()}
                onMouseOver={() => this.handleMouseOver()}
                style={hover ? hoverStyle : normalStyle}
                onClick={handleClick}
            >
                <Link to={to}>{children}</Link>
            </div>
        ) : (
            <button
                className="button"
                onMouseLeave={() => this.handleMouseLeave()}
                onMouseOver={() => this.handleMouseOver()}
                style={hover ? hoverStyle : normalStyle}
                onClick={handleClick}
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

    // handleClick = e => {
    //     this.props.handleClick(e);
    // };
}

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: { companySettings }
    }
}) => ({
    companySettings
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ButtonContainer)
);
