import axios from 'axios'

const baseURL = 'http://localhost:9200'
const cognitionApi = '/doc/cognition'

const http = axios.create({
    baseURL: baseURL,
    timeout: 20000,
    headers : {
        'Content-Type': 'application/json',
        // 'Cache-Control': 'no-cache'
    }
});

// 创建或更新文档
export const upsert = async (obj) => {
    var opStr = ''
    if(obj.id) {
        opStr = '/' + obj.id
        delete obj.id
    }
    const res = await http.post(cognitionApi + opStr, obj)
    return res
}

// 根据 id 删除文档
export const del = async (id) => {
    const res = await http.delete(cognitionApi + '/' + id)
    return res
}

// 分页查询
export const list = async (pageNo, pageSize) => {
    var param = {

    }
    const res = await http.get(cognitionApi + '/_search', param)
    console.debug("res", res)
    return res
}

export const cognitionService = {
    upsert,
    del,
    list
}

export default cognitionService
