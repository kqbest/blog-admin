import React,{useState, useEffect} from 'react'
import '../static/css/articleList.css'
import { List, Row, Col, Modal, message, Button } from 'antd'
const { confirm } = Modal

function ArticleList(props){
    const [list, setList] = useState([])

    useEffect(() => {
        React.$api.common.getArticleList().then(res => {
            if (res.code === 200) {
                setList(res.data || [])
            }
        })
    }, [])

    const deleteArticle = id => {
        confirm({
            title: '确定要删除这篇博客文章吗?',
            content: '如果你点击OK按钮，文章将会永远被删除，无法恢复。',
            onOk () {
                React.$api.common.deleteArticle({data: { id }}).then(res => {
                    if (res.code === 200) {
                        let oldList = React.$utils.copy(list)
                        oldList.splice(oldList.findIndex(k => k.id === id), 1)
                        setList(oldList)
                        message.success('删除成功！')
                    }
                })
            },
            onCancel () {
                message.success('操作已取消！')
            }
        })
    }

    const updateArticle = id => {
        props.history.push('/index/add/' + id)
    }

    return (
        <div>
             <List
                header={
                    <Row className="list-div">
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={4}>
                            <b>类别</b>
                        </Col>
                        <Col span={4}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={4}>
                            <b>浏览量</b>
                        </Col>
                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>
                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8}>
                                {item.title}
                            </Col>
                            <Col span={4}>
                                {item.typeName}
                            </Col>
                            <Col span={4}>
                                {item.createTime}
                            </Col>
                            <Col span={4}>
                                {item.view_count}
                            </Col>
                            <Col span={4}>
                              <Button type="primary" onClick={() => {updateArticle(item.id)}}>修 改</Button>&nbsp;
                              <Button onClick={() => {deleteArticle(item.id)}}>删 除</Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default ArticleList