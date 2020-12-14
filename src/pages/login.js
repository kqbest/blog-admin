import React, { useState } from 'react'
import { Card, Input, Button, Spin, message } from 'antd'
import { UserOutlined, KeyOutlined } from '@ant-design/icons'
import '../static/css/login.css'

function Login (props) {
    const [loading, setLoading] = useState(false)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const checkLogin = () => {
        const check = React.$utils.checkRequired([
            { code: userName, message: '用户名不能为空！' },
            { code: password, message: '密码不能为空！' }
        ])
        if (!check.type) { return message.error(check.message) }
        setLoading(true)
        React.$api.common.checkLogin({ data: { userName, password }}).then(res => {
            if (res.code === 200) {
                localStorage.setItem('openId', res.data.openId)
                setTimeout(() => {
                    props.history.push('/index')
                }, 0)
            }
        }).always(() => {
            setLoading(false)
        })
    }
    
    return (
        <div className="login-div">
            <div className="login-content">
                <Spin tip="Loading..." spinning={loading}>
                    <Card title="个人博客后台管理系统" bordered={true} style={{ width: 400 }} >
                        <Input
                            id="userName"
                            size="large"
                            placeholder="请输入用户名"
                            prefix={<UserOutlined style={{color:'rgba(0,0,0,.25)'}}/>}
                            onChange={e => {setUserName(e.target.value)}}
                        />
                        <br/><br/>
                        <Input.Password
                            id="password"
                            size="large"
                            placeholder="请输入密码"
                            prefix={<KeyOutlined style={{color:'rgba(0,0,0,.25)'}}/>}
                            onChange={e => {setPassword(e.target.value)}}
                            onKeyDown={e => {if(e.keyCode === 13){checkLogin()}}}
                        />
                        <br/><br/>
                        <Button type="primary" size="large" block onClick={checkLogin}>登录</Button>
                    </Card>
                </Spin>
            </div>
        </div>
    )
}

export default Login