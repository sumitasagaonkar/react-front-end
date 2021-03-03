import React from 'react';
import { Redirect } from 'react-router-dom';
import axiosInstance from './axios';

export interface Iprops {

}
export interface Istate {

}
class LogOut extends React.Component<Iprops, Istate>{
    constructor(props: Iprops) {
        super(props);

        this.state = {

        }
    }
    public renderRedirect = () => {
        return (
            <Redirect to={{ pathname: '/login' }} />
        );
    }
    public ApiCall = () => {
        const response = axiosInstance.post('user/logout/blacklist/', {
            refresh_token: localStorage.getItem('refresh_token'),
        });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

    }

    public render() {
        return (
            <div>
                {this.ApiCall()}
                {this.renderRedirect()}
            </div>
        );
    }
}


export default LogOut;