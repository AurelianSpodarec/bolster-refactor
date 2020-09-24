import React from 'react';

import RegisterFormContainer from '../containers/RegisterFormContainer';
import ServerRoomBackgroundVideo from '_content/videos/frontend/Server_Room.mp4';
import Helmet from 'components/frontEnd/shared/meta/presentational/Helmet';

const Register = () => {
    return (
        <>
            <Helmet title="Register" />
            <div id="register">
                <div className="auth-background"></div>
                <video className="auth-background-video" autoPlay="autoplay" loop muted>
                    <source src={ServerRoomBackgroundVideo} type="video/mp4" />
                </video>
                <div className="auth-wrapper register">
                    <div className="heading-body-wrapper">
                        <div className="auth-heading">
                            <heading>
                                <h1>Registering with Bolster Systems</h1>
                            </heading>
                        </div>
                        <p>
                            Neque porro quisquam est qui do lorem amet
                            <br />
                            <br />
                            At vero eos et accusamus et iusto odio dignissimos ducimus qui
                            blanditiis praesentium voluptatum deleniti atque corrupti quos.
                            <br />
                            <br />
                            Dolores et quas molestias excepturi sint occaecati cupiditate non
                            provident, similique sunt in culpa qui officia deserunt mollitia animi,
                            id est laborum et dolorum fuga.
                            <br />
                            <br />
                            Et harum quidem rerum facilis est et expedita distinctio.
                        </p>
                    </div>
                    <RegisterFormContainer />
                </div>
            </div>
        </>
    );
};

export default Register;
