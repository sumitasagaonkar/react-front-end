import React from 'react';
import { Form, Input, Button, Checkbox, notification, Empty } from 'antd';
import axiosInstance from './axios'
import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom"
import { PageHeader, Tabs, Statistic, Descriptions, Modal } from 'antd';
export interface Iprops {
    histroyy: any;

}
export interface Istate {
    dummy: string;
    succes: boolean;
    btnRef: boolean;

}
export interface ILogInData {
    email: string;
    user_name: string;
    password: string;
    [key: string]: string;
}


class RegisterApp extends React.Component<Iprops, Istate>{


    public LogInData: ILogInData;
    public responsedata: ILogInData;
    public emtyData: ILogInData;
    constructor(props: Iprops) {
        super(props);
        this.state = {
            dummy: '',
            succes: false,
            btnRef: false,

        }
        this.LogInData = this.getEmpty();
        this.responsedata = this.getEmpty();
        this.emtyData = this.getEmpty();
    }
    private getEmpty = () => {
        const retval: ILogInData = {
            user_name: "",
            email: "",
            password: ""
        };
        return retval;
    }
    public layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    public tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    // public history = useHistory();

    public openNotification = (placement: any, type: any) => {
        notification.success({
            message: `Success ${type}`,
            description:
                'Your Account is created .',
            placement,
        });
    };
    public openNotificationm = (placement: any, type: string) => {
        notification.error({
            message: `error ${type}`,
            description:
                'Your Account is not created .',
            placement,
        });
    };

    public render() {
        return (
            <div>
                <PageHeader
                    className="site-page-header-responsive"
                    onBack={() => window.history.back()}
                    title="Register To BlogPost"
                    subTitle="BlogPost"
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
                <div>
                    <hr></hr>
                    <br></br>
                    <div style={{ textAlign: 'center' }}>
                        <h1>Register</h1><br></br>
                        <h3>Blog Post</h3>
                    </div>
                    <Form
                        {...this.layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={this.OnSubmit}
                    // onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}

                        >

                            <Input placeholder="User Name" style={{ width: '500px' }} name="user_name"
                                value={this.LogInData.user_name} onChange={(e) => this.handalChange(e.target.value, e.target.name)} />
                        </Form.Item>

                        <Form.Item name="email" label="Email Address" rules={[{ type: 'email', required: true, message: 'Email is not valid!' }]}>
                            <Input placeholder="Email Address" style={{ width: '500px' }} name='email'
                                value={this.LogInData.password} onChange={(e) => this.handalChange(e.target.value, e.target.name)} />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password placeholder="Enter Password" style={{ width: '500px' }}
                                name="password" value={this.LogInData.password} onChange={(e) => this.handalChange(e.target.value, e.target.name)} />
                        </Form.Item>

                        <Form.Item {...this.tailLayout} name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item {...this.tailLayout}>
                            <Button type="primary" htmlType="submit" loading={this.state.btnRef}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>

                </div>
        );
                {this.state.succes ? this.RedirectFunction() : null}
            </div>
        );
    }
    public RedirectFunction = () => {
        return (
            <Redirect to={{ pathname: '/login' }} />
        );
    }
    public handalChange = (value: any, name: string) => {
        this.LogInData[name] = value;

    }
    public OnSubmit = () => {

        console.log(this.LogInData);
        this.setState({ btnRef: true });

        // axiosInstance
        //     .post(`user/register/`, {
        //         email: this.LogInData.email,
        //         user_name: this.LogInData.user_name,
        //         password: this.LogInData.password,
        //     })
        //     .then((res) => {
        //         { this.setState({ succes: true }) };
        //         { this.setState({ btnRef: false }) }
        //         { this.openNotification('topLeft') }

        //         console.log(res);
        //         console.log(res.data);
        //     });
        console.log(this.LogInData.email + "data of the request" + this.LogInData.password)

        const BaseUrl = 'http://127.0.0.1:8000/api/user/register/'
        fetch(BaseUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.LogInData.email,
                user_name: this.LogInData.user_name,
                password: this.LogInData.password,
            })

        })
            .then(res => res.json())
            .then((res) => {
                console.log(" data of response", res.detail);
                // console.log(" data of response", res.email[0]);
                // console.log(" data of response", res.user_name[0]);
                // console.log(" data of response", res.password[0]);
                if (res.email) {
                    this.responsedata.email = res.email[0];
                }
                else {
                    this.responsedata.email = "";
                }
                if (res.user_name) {
                    this.responsedata.user_name = res.user_name[0];
                }
                else {
                    this.responsedata.user_name = "";
                }
                if (res.password) {
                    this.responsedata.password = res.password[0];
                } else {
                    this.responsedata.password = "";
                }







                localStorage.setItem('access_token', res.access);
                localStorage.setItem('refresh_token', res.refresh);


                // // this.SuccessNotification();
                // this.openNotificationWithIcon('success');
                // this.setState({ success: true });


                if (this.responsedata.user_name) {
                    this.openNotificationm('topLeft', this.responsedata.user_name);
                    { this.setState({ succes: false }) };
                    this.setState({ btnRef: false });


                }
                if (this.responsedata.email) {
                    this.openNotificationm('topLeft', this.responsedata.email)
                    { this.setState({ succes: false }) };
                    this.setState({ btnRef: false });

                }
                if (!this.responsedata.email) {
                    console.log("one pass");
                    if (!this.responsedata.user_name) {
                        console.log("ywo pass");
                        if (!this.responsedata.password) {
                            this.openNotification('topLeft', "");
                            { this.setState({ succes: true }) };
                            this.setState({ btnRef: false });
                        }

                    }

                }

                if (this.responsedata == this.emtyData) {
                    this.openNotification('topLeft', "");
                    { this.setState({ succes: true }) };
                    this.setState({ btnRef: false });

                }

            },
                (error) => {

                    this.openNotificationm('topLeft', '')


                    console.log(error);
                })
    }


}

export default RegisterApp;

