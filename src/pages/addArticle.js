
import React, { useState, useEffect } from 'react'
import marked from 'marked'
import moment from 'moment'
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import '../static/css/addArticle.css'
const { Option } = Select
const { TextArea } = Input

function AddArticle (props) {
    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')  // 文章标题
    const [contentMarked, setContentMarked] = useState('')  // 文章markdown
    const [contentHtml, setContentHtml] = useState('预览内容')  // 文章html
    const [introduceMarked, setIntroduceMarked] = useState()  // 简介的markdown内容
    const [introduceHtml, setIntroduceHtml] = useState('等待编辑')  // 简介html
    const [createTime, setCreateTime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'))  // 发布日期
    const [updateTime, setUpdateTime] = useState()  // 修改日志的日期
    const [typeInfo, setTypeInfo] = useState([])  // 文章类别信息
    const [selectedType, setSelectType] = useState('')  // 选择的文章类别

    marked.setOptions({
        renderer: marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false
    })

    useEffect(() => {
        React.$api.common.getTypeInfo().then(res => {
            if (res.code === 200) {
                setTypeInfo(res.data)
                res.data.length > 0 && setSelectType(res.data[0].Id)
            }
        })
    }, [])

    const contectId = props.match.params.id
    useEffect(() => {
        if (contectId) {
            React.$api.common.getArticleById({data: { id:contectId }}).then(res => {
                if (res.code === 200) {
                    const info = res.data[0]
                    setArticleId(info.id)
                    setArticleTitle(info.title)
                    setContentMarked(info.article_content)
                    setContentHtml(marked(info.article_content))
                    setIntroduceMarked(info.introduce)
                    setIntroduceHtml(marked(info.introduce))
                    setCreateTime(info.createTime)
                    setSelectType(info.typeId)
                }
            })
        }
    }, [contectId])

    // 更改文章内容生成markdown
    const changeContent = (e) => {
        setContentMarked(e.target.value)
        setContentHtml(marked(e.target.value))
    }

    // 更改文章简介生成markdown
    const changeIntroduce = (e) => {
        setIntroduceMarked(e.target.value)
        setIntroduceHtml(marked(e.target.value))
    }

    // 发布文章
    const saveArticle = () => {
        const data = {
            id: articleId,
            title: articleTitle,
            type_id: selectedType,
            article_content: contentMarked,
            introduce: introduceMarked,
            create_time: createTime,
            update_time: updateTime,
            view_count: parseInt(Math.random() * 10000)
        }
        const check = React.$utils.checkRequired([
            { code: data.title, message: '博客标题不能为空！' },
            { code: data.article_content, message: '文章内容不能为空！' },
            { code: data.introduce, message: '文章简介不能为空！' },
            { code: data.create_time, message: '发布日期不能为空！' }
        ])
        if (!check.type) { return message.error(check.message) }
        const url = data.id === 0 ? 'insertArticle' : 'updateArticle'
        articleId && setUpdateTime(moment().format('YYYY-MM-DD HH:mm:ss'))
        React.$api.common[url]({ data }).then(res => {
            if (res.code === 200) {
                data.id === 0 && setArticleId(res.data.insertId)
                message.success(res.message)
            }
        })
    }

    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input value={articleTitle} size="large" onChange={(e) => {setArticleTitle(e.target.value)}} placeholder="博客标题" />
                        </Col>
                        <Col span={4}>
                            &nbsp;
                            <Select value={selectedType} size="large" onChange={(value) => {setSelectType(value)}}>
                                {
                                    typeInfo.map(item => {
                                        return (
                                            <Option value={item.Id} key={item.Id}>{item.type_name}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <br/>
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea className="markdown-content" rows={35} value={contentMarked} placeholder="文章内容" onChange={changeContent} />
                        </Col>
                        <Col span={12}>
                            <div className="show-html" dangerouslySetInnerHTML={{__html: contentHtml}}></div>
                        </Col>
                    </Row>  
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
                            <br/>
                        </Col>
                        <Col span={24}>
                            <br/>
                            <TextArea rows={4} value={introduceMarked} placeholder="文章简介" onChange={changeIntroduce} />
                            <br/><br/>
                            <div className="introduce-html" dangerouslySetInnerHTML={{__html: introduceHtml}}></div>
                        </Col>
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker size="large" onChange={(date, dateString) => setCreateTime(dateString)} placeholder="发布日期" />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
export default AddArticle