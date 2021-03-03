
import React from "react";
import { Progress } from 'antd';
import { Spin, Space } from 'antd';
import 'antd/dist/antd.css';
import { Link } from "react-router-dom"
import { Popconfirm, Skeleton, TimePicker } from 'antd';
import { PageHeader, Tabs, Button, Statistic, Descriptions, Modal, Input } from 'antd';
import "./myStyle.css";
import { Form, notification, Checkbox } from 'antd';
import NavApp from './NavApp';
import LogInApp from './LogInApp';
import RegisterApp from './RegisterApp';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import { Content, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";

export interface Istate {
    dummy: string;
    loading: boolean;
    isEditModal: boolean;
    IsAddStockModalOpne: boolean;
    IsAddStckOpneModal: boolean;
    AddBtnLOder: boolean;
    addData: IAddData;
    selctedList: IResult;
    EditBTNloader: boolean;
    LogIn: boolean;
    collapsed: boolean;
}
export interface Iprops {

}
export interface IResult {
    id: number;
    title: string;
    author: number;
    status: string;
    excerpt: string;
    content: string;
    [key: string]: string | number;
}
export interface IAddData {
    title: string;
    author: string;
    content: string;
    [key: string]: string;
}
export interface ISelectedList {
    title: string;
    author: string;
    content: string;
    [key: string]: string;
}
export interface IUserDetail {
    UserId: string;
    Email: string;
    UserName: string;
    auth: string;
}

class HomeApp extends React.Component<Iprops, Istate>{
    private ResultList: IResult[] = [];
    public Userdata: IUserDetail;



    constructor(props: Iprops) {
        super(props);
        this.state = {
            dummy: "",
            loading: true,
            isEditModal: false,
            IsAddStockModalOpne: false,
            IsAddStckOpneModal: false,
            AddBtnLOder: false,
            addData: this.Empydata(),
            selctedList: this.EmptySelectedList(),
            EditBTNloader: false,
            LogIn: false,
            collapsed: false,
        }
        this.Userdata = this.EmptyUserDetail();



    }


    public Empydata = () => {
        const add: IAddData = {
            title: '',
            author: '',
            content: '',
        }

        return add;
    }
    public EmptySelectedList = () => {
        const add: IResult = {
            id: 0,
            title: '',
            author: 0,
            status: '',
            excerpt: '',
            content: '',
        }

        return add;
    }

    public EmptyUserDetail = () => {
        const retval: IUserDetail = {
            UserId: "",
            Email: "",
            UserName: "",
            auth: "",

        }
        return retval;
    }
    public async componentDidMount() {
        this.getData();
        this.GetUserDetail();
    }
    public GetUserDetail = () => {

        const URL = "http://127.0.0.1:8000/api/get/";
        fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + localStorage.getItem('access_token')
            }
        })
            .then(res => res.json())
            .then((data) => {
                console.log("data is the ,", data);
                this.Userdata = data;
                this.state.addData.author = this.Userdata.UserId;
                console.log("Data is in Userdata list", this.Userdata);

            },
                (error) => {
                    console.log(error);
                    this.setState({ AddBtnLOder: false })
                })

    }
    public getData() {
        this.setState({ loading: true });
        const url = "http://127.0.0.1:8000/api/"
        fetch(url,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'JWT ' + localStorage.getItem('access_token')
                }
            }
        )
            .then(res => res.json())
            .then((data) => {
                console.log("data is the ,", data);
                if (!data.detail) {
                    this.ResultList = [...data]
                    this.setState({ LogIn: true });


                }
                if (data.detail) {
                    this.setState({ LogIn: false });

                }

                this.setState({ loading: false });
                console.log("Data is in result list", this.ResultList);
            },
                (error) => {
                    console.log(error);
                })
    }
    public RenderEditStcokModal = () => {
        return (
            <Modal
                visible={true}
                title="Update Selected Item"
                // onOk={this.handleOk}
                onCancel={this.CloseEditModal}
                footer={[
                    <Popconfirm placement="topLeft" title='Are you sure to delete this task?' okText="Yes" cancelText="No" onConfirm={this.HandleDelete}>
                        <Button key="submit" type="primary" danger >
                            Delete
            </Button></Popconfirm>,
                    <Button key="back" onClick={this.CloseEditModal} >
                        Back
            </Button>,
                    <Button key="submit" type="primary" loading={this.state.EditBTNloader} onClick={this.HandleeditSubmit} >
                        Update
            </Button>

                ]}
            >
                <div style={{ marginBottom: 16 }}>
                    <b>Enter Title</b>
                    <Input
                        placeholder="Enter Title"
                        allowClear
                        value={this.state.selctedList.title}
                        name="title"
                        onChange={(e) => this.HandleEditInputChange(e.target.name, e.target.value)}
                    />
                </div>
                <b>Enter Content</b>
                <Input
                    placeholder="Enter content"
                    allowClear
                    value={this.state.selctedList.content}
                    name="content"
                    onChange={(e) => this.HandleEditInputChange(e.target.name, e.target.value)} />
            </Modal>
        );
    }
    public render() {
        return (
            <div>
                <PageHeader
                    className="site-page-header-responsive"
                    onBack={() => window.history.back()}
                    title="Blog Post API"
                    subTitle="React and Django Rest framework"
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
                        <Button key="1" type="primary" onClick={this.ToggleAddStockModal}>
                            Add Post
        </Button>

                    ]}


                >
                    <Descriptions size="small" column={3}>
                        <Descriptions.Item label="Created"><b>{this.Userdata.UserName}</b></Descriptions.Item>
                        <Descriptions.Item label="Email Id">
                            <a>{this.Userdata.Email}</a>
                        </Descriptions.Item>
                        <Descriptions.Item label="Creation Time">2020-01-10</Descriptions.Item>
                        <Descriptions.Item label="Effective Time">2020-11-10</Descriptions.Item>
                        <Descriptions.Item label="Remarks">
                            110 Sai Sadan, Market Road sangli-416416
                    </Descriptions.Item>
                    </Descriptions>
                    <hr></hr>
                </PageHeader>
                <div>

                    {this.state.loading ? this.renderLoder() : this.renderItems()}
                    {this.state.LogIn ? null : this.renderNotLogIN()}

                    {this.state.isEditModal ? this.RenderEditStcokModal() : null}
                    {this.state.IsAddStckOpneModal ? this.RenderAddStookModal() : null}
                </div>


                {/* <Router>
                    <NavApp />
                    <Switch>
                        <Route path='/' exact component={this.renderLoder} />
                        <Route path='/login' component={LogInApp} />
                        <Route path='/Register' component={RegisterApp} />
                    </Switch>
                </Router> */}
            </div>
        );
    }
    public renderNotLogIN = () => {
        return (
            <div style={{ textAlign: 'center', flexDirection: 'column', display: 'flex' }} >
                <div>
                    <Spin size="large" />
                </div>


                <div>
                    <h1>Log in to see data</h1>
                </div>


            </div>
        )
            ;

    }

    public HandleSubmit = () => {
        this.setState({ AddBtnLOder: true });
        console.log("Click to submit")
        const BaseUrl = 'http://127.0.0.1:8000/api/admin/create/'

        fetch(BaseUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + localStorage.getItem('access_token'),



            },
            body: JSON.stringify({
                title: this.state.addData.title,
                content: this.state.addData.content,
                author: this.Userdata.UserId,

            })
        })
            .then(res => res.json())
            .then((res) => {
                console.log('AddModaldata' + res);
                this.openNotificationWithIcon('success');
                this.setState({ AddBtnLOder: false });
                this.setState({ addData: this.Empydata() });

                this.ToggleAddStockModal();
                this.getData();



            }, (error) => {
                console.log('Error IN add Modal' + error);
                this.setState({ addData: this.Empydata() });
            })
        this.forceUpdate();

    }
    public openNotificationWithIcon = (type: any) => {
        notification.success({
            message: 'You Blog Post adde succesfuly',
            description:
                ' You Blog Post adde succesfuly thank you for the submition your response',
        });
    };
    public RenderAddStookModal = () => {
        return (
            <Modal
                title="Add Post"
                visible={true}
                width={800}
                maskClosable={false}
                // onOk={this.handleOk}
                onCancel={this.ToggleAddStockModal}
                footer={[
                    <Button key="back" onClick={this.ToggleAddStockModal}>
                        Back
                    </Button>,
                    <Button key="submit" type="primary" loading={this.state.AddBtnLOder} onClick={this.HandleSubmit}>
                        Add
                    </Button>,
                ]}
            >
                <div style={{ marginBottom: 16 }}>
                    <b>Enter Title</b>
                    <Input
                        placeholder="Enter Title"
                        allowClear
                        value={this.state.addData.title}
                        name="title"
                        onChange={(e) => this.HandelChange(e.target.name, e.target.value)}
                    />
                </div>
                <b>Enter Content</b>
                <Input
                    placeholder="Enter content"
                    allowClear
                    value={this.state.addData.content}
                    name="content"
                    onChange={(e) => this.HandelChange(e.target.name, e.target.value)} />

            </Modal>
        );
    }
    public HandelChange = (name: string, value: string) => {
        this.state.addData[name] = value;
        this.setState({
            addData: this.adddataTo()
        });

        console.log(this.state.addData)
    }
    public adddataTo = () => {
        const add: IAddData = {
            title: this.state.addData.title,
            author: this.state.addData.author,
            content: this.state.addData.content,
        }
        return add;
    }
    public renderLoder = () => {
        return (
            <div><h1>loding</h1>
                <Skeleton /></div>

        );
    }
    public renderItems = () => {
        return (
            <div className="row">
                {this.ResultList.map(this.renderList)}
            </div>
        )
    }
    public ToggleAddStockModal = () => {
        console.log("ckick to add stock Button");
        this.setState({ IsAddStckOpneModal: !this.state.IsAddStckOpneModal });
    }
    public renderList = (item: IResult, index: number) => {
        return (
            <div className="column" onClick={() => { this.OpenEditStockModal(item) }} >
                <div className="card" >
                    <div className="container">
                        <h4><b>Title-</b>&nbsp;&nbsp;{item.title}</h4>

                        {/* <p>{item.author}</p> */}
                        <p><b>Content-</b>&nbsp;&nbsp;{item.content}</p>
                        <p><b>Status-</b>&nbsp;&nbsp; {item.status}</p>
                    </div>
                </div>
            </div>
        );

    }

    public OpenEditStockModal = (item: IResult) => {
        this.state.selctedList.id = item.id;
        this.state.selctedList.title = item.title;
        this.state.selctedList.author = item.author;
        this.state.selctedList.status = item.status;
        this.state.selctedList.excerpt = item.excerpt;
        this.state.selctedList.content = item.content;

        this.setState({ isEditModal: true });
    }
    public CloseEditModal = () => {
        this.setState({ isEditModal: false });
    }
    public HandleEditInputChange = (name: string, value: string) => {
        this.state.selctedList[name] = value;
        this.setState({
            selctedList: this.AddToSelectedList()
        });

        console.log(this.state.addData)
    }
    public AddToSelectedList = () => {
        const add: IResult = {
            id: this.state.selctedList.id,
            title: this.state.selctedList.title,
            author: this.state.selctedList.author,
            status: this.state.selctedList.status,
            excerpt: this.state.selctedList.excerpt,
            content: this.state.selctedList.content,
        }
        return add;
    }
    public HandleeditSubmit = () => {
        this.setState({ EditBTNloader: true });
        console.log("Click to submit")
        const BaseUrl = `http://127.0.0.1:8000/api/admin/edit/${this.state.selctedList.id}`

        fetch(BaseUrl, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + localStorage.getItem('access_token'),



            },
            body: JSON.stringify({
                title: this.state.selctedList.title,
                content: this.state.selctedList.content,
                author: this.state.selctedList.author,

            })
        })
            .then(res => res.json())
            .then((res) => {
                console.log('AddModaldata' + res);
                this.EditSuccesNoti('success');
                this.setState({ EditBTNloader: false });
                this.setState({ selctedList: this.EmptySelectedList() });

                this.CloseEditModal();
                this.getData();



            }, (error) => {
                console.log('Error IN add Modal' + error);
                this.setState({ selctedList: this.EmptySelectedList() });
            })
        this.forceUpdate();

    }
    public EditSuccesNoti = (type: any) => {
        notification.success({
            message: 'You Blog Post adde succesfuly',
            description:
                ' You Blog Post adde succesfuly thank you for the submition your response',
        });
    };

    public HandleDelete = () => {
        console.log("Click to submit")
        const BaseUrl = `http://127.0.0.1:8000/api/admin/delete/${this.state.selctedList.id}`

        fetch(BaseUrl, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + localStorage.getItem('access_token'),



            },
            body: JSON.stringify({
                title: this.state.selctedList.title,
                content: this.state.selctedList.content,
                author: this.state.selctedList.author,

            })
        })
            .then(res => res.json())
            .then((res) => {
                this.getData();
                console.log('AddModaldata' + res);
                this.deleteNoti('success');
                this.getData();
                this.setState({ selctedList: this.EmptySelectedList() });

                this.CloseEditModal();
                this.getData();



            }, (error) => {
                console.log('Error IN add Modal' + error);
                this.setState({ selctedList: this.EmptySelectedList() });
            })
        this.getData();
        this.deleteNoti('success');
        this.setState({ selctedList: this.EmptySelectedList() });

        this.CloseEditModal();
        this.getData();

        this.forceUpdate();
        this.forceUpdate();
        this.forceUpdate();
        this.forceUpdate();
        this.forceUpdate();
        this.forceUpdate();
        this.forceUpdate();
        this.forceUpdate();
        this.forceUpdate();
        this.forceUpdate();

    }
    public deleteNoti = (type: any) => {
        notification.success({
            message: 'You Blog Post Deleted succesfuly',
            description:
                ' You Blog Post Deleted succesfuly thank you for the submition your response',
            className: 'custom-class',
            style: {
                width: 600,
            },


        });
    };
}

export default HomeApp