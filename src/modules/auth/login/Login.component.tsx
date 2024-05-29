import React from 'react';
import './Login.css';

type LoginProps = {
    id?: string[]
}

type LoginState = {
    id?: number,
}

export default class Login extends React.Component<LoginProps, LoginState> {

    render() {
        return <div>Hello Login</div>
    }
}