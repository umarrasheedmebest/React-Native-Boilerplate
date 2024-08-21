import * as React from 'react';
import LoginComponents from './index';
import LoginServiceComponent from './index.service';

/** container for login screen view/business logic */
function LoginScreen(props) {
    return (
        <LoginServiceComponent {...props}>
            {props => (
                <LoginComponents
                    {...props}
                />
            )}
        </LoginServiceComponent>
    );
}

export default LoginScreen;
