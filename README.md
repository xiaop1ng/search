# 关于认知

这里的认知指的是个人积累和收集的信息集合，这个信息集合经常需要整理和更新，所以想要制造一个认知搜索引擎系统。

> 慢慢其修远兮，吾将上下而求索。
The way ahead is long; I see no ending, yet high and low I will search with my will unbending.

简单的说，我想制作的是一个搜寻自我的工具。

# 功能点概述
- 全文索引的搜索
- 搜索时的自动补全
- 搜索历史记录
- 认知管理（查看、添加、更新、导入、导出）

# 初步技术选择

后端
- Elasticsearch
- SpringBoot

前端组件选择
- Vue

# 扩展

后面可能会制作的功能
- 定制化的爬虫（认知充能）
- 热点数据（加入到缓存数据中，瞅瞅热点数据是否真的符合正太分布的规律）
- 认知分词分析（自动分类，AutoTag）：想做但是目前不知道怎么做的事
- 数据分析

# 安装

首先需要安装 Elasticsearch & Node

修改 es 配置地址 `/src/service/cognitionService.js`  baseURL 
es 接口跨域问题：
配置 config\elasticsearch.yml

http.cors.enabled: true
http.cors.allow-origin: "*"

> npm install
npm run serve