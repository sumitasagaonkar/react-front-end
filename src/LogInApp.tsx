
import { Form, notification, Checkbox } from 'antd';
import { Redirect } from 'react-router-dom'
import { Link } from "react-router-dom"
import { PageHeader, Tabs, Button, Statistic, Descriptions, Modal, Input } from 'antd';

import React from 'react';

export interface Iprops {

}
export interface Istate {
    dummy: string;
    BtnRef: boolean;
    success: boolean;
    detail: string;

}
export interface ILogInData {
    email: string;
    password: string;
    [key: string]: string;
}
class LogInApp extends React.Component<Iprops, Istate>{
    private LogInData: ILogInData;
    constructor(props: Iprops) {
        super(props);
        this.state = {
            dummy: '',
            BtnRef: false,
            success: false,
            detail: '',


        }
        this.LogInData = this.getEmpty();
    }
    public layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    public tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    public getEmpty = () => {
        const retval: ILogInData = {
            email: '',
            password: '',
        }
        return retval;

    }
    public HandelChange = (name: string, value: any) => {
        this.LogInData[name] = value;
    }
    public openNotificationWithIcon = (type: any) => {
        notification.success({
            message: 'Welcome Back',
            description:
                'Log IN succefull to the Blog Post Website ',
        });
    };
    public HandleSuccessRedirect = () => {
        return (
            <Redirect to={{ pathname: '/' }} />
        );
    }
    public openNotificationWithIconn = (type: any) => {
        notification.error({
            message: `Faild To Log in${type}`,
            description:
                'plase Check Email and Passsword  ',
        });
    };
    public LogInFunction = () => {
        console.log(this.LogInData.email + "data of the request" + this.LogInData.password)
        this.setState({ BtnRef: true });
        const BaseUrl = 'http://127.0.0.1:8000/api/token/'
        fetch(BaseUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.LogInData.email,
                password: this.LogInData.password
            })

        })
            .then(res => res.json())
            .then((res) => {
                console.log(" data of response", res.detail);
                this.setState({ detail: res.detail });
                localStorage.setItem('access_token', res.access);
                localStorage.setItem('refresh_token', res.refresh);


                // // this.SuccessNotification();
                // this.openNotificationWithIcon('success');
                // this.setState({ success: true });
                if (!this.state.detail) {
                    this.openNotificationWithIcon('success');
                    this.setState({ success: true });
                }
                else {
                    this.setState({ BtnRef: false });
                    this.openNotificationWithIconn(this.state.detail)

                }

            },
                (error) => {
                    this.setState({ BtnRef: false });
                    this.openNotificationWithIconn('failed');


                    console.log(error);
                })
    }

    public render() {
        return (
            <div>
                <PageHeader
                    className="site-page-header-responsive"
                    onBack={() => window.history.back()}
                    title="Blog Post"
                    subTitle="Log in to Blog Post"
                    extra={[
                        <Link to="login">
                            <Button key="3">LogIn</Button>
                        </Link>,
                        <Link to="Register">
                            <Button key="2">Register</Button>
                        </Link>,
                        <Link to="/">
                            <Button key="1" type="primary">
                                Home
        </Button>
                        </Link>
                        ,
                        <Link to="/logout">
                            <Button key="1" type="primary">
                                LogOut
        </Button>
                        </Link>,


                    ]}


                >
                </PageHeader>

                <hr></hr>
                <div style={{ textAlign: 'center' }}>
                    <h1>Log in </h1>

                </div>
                <Form
                    {...this.layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={this.LogInFunction}
                // onFinishFailed={onFinishFailed}
                >


                    <Form.Item name="email" label="Email Address" rules={[{ type: 'email', required: true, message: 'Email is not valid!' }]}>
                        <Input placeholder="User Name" style={{ width: '500px' }} name='email'
                            value={this.LogInData.email} onChange={(e) => this.HandelChange(e.target.name, e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Enter Password" style={{ width: '500px' }} name='password'
                            value={this.LogInData.password} onChange={(e) => this.HandelChange(e.target.name, e.target.value)} />
                    </Form.Item>

                    <Form.Item {...this.tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...this.tailLayout}>
                        <Button type="primary" htmlType="submit" loading={this.state.BtnRef}>
                            Log In
        </Button>
                    </Form.Item>
                </Form>
                {this.state.success ? this.HandleSuccessRedirect() : null}
            </div>


        );

    }
}

export default LogInApp;