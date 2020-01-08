import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { withRouter } from "react-router-dom";

import App from "../presentational/App";

import setMobileWidth from "actions/shared/generic/mobile/sync/setMobileWidth";
import setIsIE10 from "actions/shared/generic/ieDetection/sync/setIsIE10";

class AppContainer extends Component {
    render() {
        return <App />;
    }
    componentDidMount = () => {
        this.checkMobileWidth();
        window.addEventListener("resize", this.checkMobileWidth);

        this.isIE10();
    };

    //effects onMobile reducer
    checkMobileWidth = _.throttle(() => {
        const { setMobileWidth } = this.props;

        if (window.innerWidth < 1025) {
            setMobileWidth(true);
        } else {
            setMobileWidth(false);
        }
    }, 1000);

    isIE10 = () => {
        const { setIsIE10 } = this.props;
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        // IE 10 or older
        if (msie > 0) {
            setIsIE10(true);
        }
    };
}

const mapDispatchToProps = dispatch => ({
    setMobileWidth: isMobile => dispatch(setMobileWidth(isMobile)),
    setIsIE10: isIE10 => dispatch(setIsIE10(isIE10))
});

export default withRouter(connect(null, mapDispatchToProps)(AppContainer));
