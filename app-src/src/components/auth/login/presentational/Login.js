import React from 'react';

import TextInputContainer from '../../../generic/containers/TextInputContainer';

const Login = (email, password) => (
    <div className="size-lg-12">
        <form>
            <TextInputContainer
                value={email}
                name="email"
                placeholder="email"
                required
            />
            <TextInputContainer
                value={password}
                name="password"
                placeholder="password"
                required
            />
            <button type="submit">Login</button>
        </form>
    </div>
);

export default Login;
