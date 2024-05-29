import React from 'react';
import './Register.css';

type RegisterProps = {
    id?: string[]
}

type RegisterState = {
    id?: number,
}

export default class Register extends React.Component<RegisterProps, RegisterState> {

    render() {
        return <div>Hello Register</div>
    }
}