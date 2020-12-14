import { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd'
import { DesktopOutlined, PieChartOutlined, FileOutlined } from '@ant-design/icons'
import AddArticle from './addArticle'
import ArticleList from './articleList'
import '../static/css/home.css'

const { Content, Footer, Sider } = Layout
const { SubMenu } = Menu

function Home (props) {
    const [menu] = useState([
        { pathName: '/index/add', path: 'add', title: '添加文章', parent: '1' },
        { pathName: '/index/list', path: 'list', title: '文章列表', parent: '1' },
        { pathName: '/index', path: 'index', title: '工作台', parent: '' }
    ])

    let [defaultPath, defaultName, defaultOpen] = ['', '', '']
    const hrefObj = menu.find(k => props.location.pathname.startsWith(k.pathName))
    hrefObj && (defaultPath = hrefObj.path) && (defaultOpen = hrefObj.parent) &&  (defaultName = hrefObj.title)

    const [collapsed, setCollapsed] = useState(false)
    const [defaultSelectedKeys] = useState([defaultPath])
    const [defaultOpenKeys] = useState([defaultOpen])
    const [selectedKeys, setSelectedKeys] = useState([defaultPath])

    const pathname = props.history.location.pathname
    useEffect(() => {
        // 监听pathname变化设置当前选中菜单
        let pathArr = pathname.split('/')
        let pathLen = pathArr.length
        let curPath = pathArr[pathLen - 1]
        var reg = /^[0-9]+.?[0-9]*$/
        if (reg.test(pathArr[pathLen - 1])) {
            curPath = `${pathArr[pathLen - 2]}`
        } else {
            curPath = pathArr[pathLen - 1]
        }
        setSelectedKeys([curPath])
    }, [pathname])

    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    }

    const handleClickArticle = e => {
        let obj = menu.find(k => k.path === e.key)
        obj && props.history.push(obj.pathName)
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={defaultSelectedKeys} defaultOpenKeys={defaultOpenKeys} selectedKeys={selectedKeys} onClick={handleClickArticle} mode="inline">
                    <Menu.Item key="index" icon={<PieChartOutlined />}>工作台</Menu.Item>
                    <SubMenu key="1" icon={<DesktopOutlined />} title="文章管理">
                        <Menu.Item key="add">添加文章</Menu.Item>
                        <Menu.Item key="list">文章列表</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="2" icon={<FileOutlined />}>留言管理</Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                        <Breadcrumb.Item>{ defaultName }</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <div>
                            <Route path="/index" exact component={AddArticle}></Route>
                            <Route path="/index/add" exact component={AddArticle}></Route>
                            <Route path="/index/add/:id" component={AddArticle}></Route>
                            <Route path="/index/list" exact component={ArticleList}></Route>
                        </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>系统由 React+Node+Ant Desgin驱动</Footer>
            </Layout>
        </Layout>
    )
}
export default Home