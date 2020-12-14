import server from '../request/server'

const common = {
    checkLogin: { type: 'post', url: 'checkLogin' },
    getTypeInfo: { type: 'get', url: 'getTypeInfo' },
    insertArticle: { type: 'post', url: 'insertArticle' },
    updateArticle: { type: 'post', url: 'updateArticle' },
    getArticleList: { type: 'get', url: 'getArticleList' },
    deleteArticle: { type: 'get', url: 'deleteArticle' },
    getArticleById: { type: 'get', url: 'getArticleById' }
}

server.addRequest('common', common)
export default server