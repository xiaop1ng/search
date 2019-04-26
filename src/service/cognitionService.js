/**
 *                             _ooOoo_
 *                            o8888888o
 *                            88" . "88
 *                            (| -_- |)
 *                            O\  =  /O
 *                         ____/`---'\____
 *                       .'  \\|     |//  `.
 *                      /  \\|||  :  |||//  \
 *                     /  _||||| -:- |||||-  \
 *                     |   | \\\  -  /// |   |
 *                     | \_|  ''\---/''  |   |
 *                     \  .-\__  `-`  ___/-. /
 *                   ___`. .'  /--.--\  `. . __
 *                ."" '<  `.___\_<|>_/___.'  >'"".
 *               | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *               \  \ `-.   \_ __\ /__ _/   .-` /  /
 *          ======`-.____`-.___\_____/___.-`____.-'======
 *                             `=---='
 *          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *                     佛祖保佑        永无BUG
 */

import axios from 'axios'

const baseURL = 'http://localhost:9200' // es 接口地址
const cognitionApi = '/doc/cognition'
const uuid = require('uuid/v1');

const http = axios.create({
    baseURL: baseURL,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// 创建或更新文档
export const upsert = async (obj) => {
    var opStr = ''
    if(obj.id) {
        opStr = '/' + obj.id
        delete obj.id // 更新的时候删除 id 键
    }
    const res = await http.post(cognitionApi + opStr, obj)
    return res
}

// 根据 id 删除文档
export const del = async (id) => {
    const res = await http.delete(cognitionApi + '/' + id)
    return res
}

// 批量删除
export const delBatch = async (ids) => {
    var body = ''
    ids.forEach(T => {
        body += '{"delete":{"_index":"doc","_type":"cognition","_id":"' + T._id + '"}}\n'
    })
    const res = await http.post('/_bulk', body)
    return res
}

// 批量导入
export const addBatch = async (objArr) => {
    var body = ''
    objArr.forEach(T => {
        body += '{"create":{"_index":"doc","_type":"cognition","_id":"' + uuid() + '"}}\n' + JSON.stringify(T) + '\n'
    })
    const res = await http.post('/_bulk', body)
    return res
}

// 分页查询
export const list = async (pageNo, pageSize) => {
    const res = await http.post(cognitionApi + '/_search', {
        "size": pageSize,
        "from": (pageNo - 1) * pageSize,
        "sort": {date: {order: "desc" }}
    })
    return res
}

// 业务搜索🔍
export const search = async (keyword, pageNo, pageSize) => {
    const res = await http.post(cognitionApi + '/_search', {
        "size": pageSize,
        "from": (pageNo - 1) * pageSize,
        "query": {
            "multi_match": {
                "query": keyword,
                "type": "most_fields",
                "fields": [ "title^2", "body" ] // 匹配字段，标题匹配得分优先级更高
            }
        },
        "highlight": {
            "fields" : {
                "title" : {},
                "body": {}
            }
        }
    })
    console.debug("res", res)
    return res
}

export const get = async (id) => {
    const res = await http.get(cognitionApi + '/' + id)
    return res
}

export const cognitionService = {
    upsert,
    del,
    delBatch,
    addBatch,
    list,
    search,
    get
}

export default cognitionService
