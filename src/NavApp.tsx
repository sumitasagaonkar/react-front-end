import React from "react";
import { Link } from "react-router-dom"
import { Form, notification, Checkbox } from 'antd';
import { PageHeader, Tabs, Button, Statistic, Descriptions, Modal, Input } from 'antd';
import { isConstructSignatureDeclaration } from "typescript";
import reportWebVitals from "./reportWebVitals";
import HomeApp from "./HomeApp";

const { TabPane } = Tabs;
export interface Iprops {

}
export interface Istate {
    dummy: string;
    IsAddStckOpneModal: boolean;
    addData: IAddData;
    AddBtnLOder: boolean;
}
export interface IAddData {
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
class NavApp extends React.Component<Iprops, Istate>{

    public Userdata: IUserDetail;
    constructor(props: Iprops) {
        super(props);
        this.state = {
            dummy: "",
            IsAddStckOpneModal: false,
            addData: this.Empydata(),
            AddBtnLOder: false,

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

    public EmptyUserDetail = () => {
        const retval: IUserDetail = {
            UserId: "",
            Email: "",
            UserName: "",
            auth: "",

        }
        return retval;
    }
    public layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    public tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    public extraContent = (
        <div
            style={{
                display: 'flex',
                width: 'max-content',
                justifyContent: 'flex-end',
            }}
        >
            <Statistic
                title="Status"
                value="Pending"
                style={{
                    marginRight: 32,
                }}
            />
            <Statistic title="Price" prefix="$" value={568.08} />
        </div>
    );

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
                author: this.state.addData.author,

            })
        })
            .then(res => res.json())
            .then((res) => {
                console.log('AddModaldata' + res);
                this.openNotificationWithIcon('success');
                this.setState({ AddBtnLOder: false })

                this.ToggleAddStockModal();



            }, (error) => {
                console.log('Error IN add Modal' + error)
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
    public componentDidMount = () => {
        this.GetUserDetail();
    }
    public RenderAddStookModal = () => {
        return (
            <Modal
                title="Add Stock"
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
    public ToggleAddStockModal = () => {
        console.log("ckick to add stock Button");
        this.setState({ IsAddStckOpneModal: !this.state.IsAddStckOpneModal });
    }
    public render() {
        return (
            <div>
                <PageHeader
                    className="site-page-header-responsive"
                    onBack={() => window.history.back()}
                    title="Title"
                    subTitle="This is a subtitle"
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
                            Add Stock
        </Button>

                    ]}


                >
                </PageHeader>

                {this.state.IsAddStckOpneModal ? this.RenderAddStookModal() : null}
            </div>

        );
    }


}
export default NavApp;