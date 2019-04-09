<template>
  <div class="result-box">
    <!-- 
      文档详情页  
    -->
    <el-card class="box-card" shadow="always">
      <div slot="header" class="clearfix">
        <h1 type="text">{{ data.title }}</h1>
      </div>
      <div class="text item" v-html="data.body">
      </div>
    </el-card>
  </div>
</template>

<style scope>
  .result-box {
    margin-top: 20px;
    padding-left: 200px;
    padding-right: 200px;
  }
  .el-select .el-input {
    width: 100px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
    word-break: break-word;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    margin-top: 5px;
  }
  .el-card__header {
    padding: 5px 20px;
  }


  .box-card  /deep/  *:not('#mkdbuttons') {
    margin: 0;
    padding: 0; }

  .box-card  /deep/  #wrapper {
    font: 15px "Frutiger", Helvetica, sans-serif;

    -webkit-font-smoothing: antialiased;
    line-height: 1.7;
    padding: 3px;
    background: #fff;
    border-radius: 3px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px; 
  }

  .box-card  /deep/  p {
    margin: 1em 0; 
  }

  .box-card  /deep/  a {
    color: #4183c4;
    text-decoration: none; }

  .box-card  /deep/  #wrapper {
    background-color: #fff;
    padding: 30px;
    margin: 15px;
    font-size: 15px;
    line-height: 1.6; }
    .box-card  /deep/  #wrapper > *:first-child {
      margin-top: 0 !important; }
    .box-card  /deep/  #wrapper > *:last-child {
      margin-bottom: 0 !important; }

  @media screen {
    .box-card  /deep/  #wrapper {
      box-shadow: 0 0 0 1px #cacaca, 0 0 0 4px #eee; } }
  .box-card  /deep/  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.0;
    cursor: text;
    position: relative;
    margin: 1em 0 15px;
    padding: 0; }


  .box-card  /deep/  p, blockquote, table, pre {
    margin: 3px 0; }

  .box-card  /deep/  ul {
    padding-left: 30px; }

  .box-card  /deep/  ol {
    padding-left: 30px; }
    .box-card  /deep/  ol li ul:first-of-type {
      margin-top: 0px; }

  .box-card  /deep/  hr {
    background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAECAYAAACtBE5DAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OENDRjNBN0E2NTZBMTFFMEI3QjRBODM4NzJDMjlGNDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OENDRjNBN0I2NTZBMTFFMEI3QjRBODM4NzJDMjlGNDgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4Q0NGM0E3ODY1NkExMUUwQjdCNEE4Mzg3MkMyOUY0OCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4Q0NGM0E3OTY1NkExMUUwQjdCNEE4Mzg3MkMyOUY0OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqqezsUAAAAfSURBVHjaYmRABcYwBiM2QSA4y4hNEKYDQxAEAAIMAHNGAzhkPOlYAAAAAElFTkSuQmCC) repeat-x 0 0;
    border: 0 none;
    color: #ccc;
    height: 4px;
    margin: 15px 0;
    padding: 0; }

  .box-card  /deep/  #wrapper > h2:first-child {
    margin-top: 0;
    padding-top: 0; }
  .box-card  /deep/  #wrapper > h1:first-child {
    margin-top: 0;
    padding-top: 0; }
    .box-card  /deep/  #wrapper > h1:first-child + h2 {
      margin-top: 0;
      padding-top: 0; }
  .box-card  /deep/  #wrapper > h3:first-child, #wrapper > h4:first-child, #wrapper > h5:first-child, #wrapper > h6:first-child {
    margin-top: 0;
    padding-top: 0; }

  .box-card  /deep/  a:first-child h1, a:first-child h2, a:first-child h3, a:first-child h4, a:first-child h5, a:first-child h6 {
    margin-top: 0;
    padding-top: 0; }

  .box-card  /deep/  h1 + p, h2 + p, h3 + p, h4 + p, h5 + p, h6 + p, ul li > :first-child, ol li > :first-child {
    margin-top: 0; }

  .box-card  /deep/  dl {
    padding: 0; }
    .box-card  /deep/  dl dt {
      font-size: 14px;
      font-weight: bold;
      font-style: italic;
      padding: 0;
      margin: 15px 0 5px; }
      .box-card  /deep/  dl dt:first-child {
        padding: 0; }
      .box-card  /deep/  dl dt > :first-child {
        margin-top: 0; }
      .box-card  /deep/  dl dt > :last-child {
        margin-bottom: 0; }
    .box-card  /deep/  dl dd {
      margin: 0 0 15px;
      padding: 0 15px; }
      .box-card  /deep/  dl dd > :first-child {
        margin-top: 0; }
      .box-card  /deep/  dl dd > :last-child {
        margin-bottom: 0; }

  .box-card  /deep/  blockquote {
    border-left: 4px solid #DDD;
    padding: 0 15px;
    color: #777; }
    .box-card  /deep/  blockquote > :first-child {
      margin-top: 0; }
    .box-card  /deep/  blockquote > :last-child {
      margin-bottom: 10px; }

  .box-card  /deep/  em {
    font-style: normal;
    border: 1px solid #f00;
    border-radius: 3px;
    background-color: #efefef;
    padding-left: 3px;
    padding-right: 3px;
    margin-left: 1px;
    margin-right: 1px;

  }

  .box-card  /deep/  img {
    max-width: 100%; }

  .box-card  /deep/  code, tt {
    margin: 0 2px;
    padding: 0 5px;
    white-space: nowrap;
    border: 1px solid #eaeaea;
    background-color: #f8f8f8;
    border-radius: 3px;
    font-family: "Source Code Pro", Consolas, Courier, monospace;
    font-size: 80%;
    color: #333333; }

  .box-card  /deep/  pre > code {
    margin: 0;
    padding: 0;
    white-space: pre;
    border: none;
    background: transparent; }

  .box-card  /deep/  .highlight pre {
    background-color: #f8f8f8;
    border: 1px solid #ccc;
    font-size: 80%;
    line-height: 19px;
    overflow: auto;
    padding: 6px 10px;
    border-radius: 3px; }

  .box-card  /deep/  pre {
    background-color: #f8f8f8;
    border: 1px solid #ccc;
    font-size: 110%;
    line-height: 19px;
    overflow: auto;
    padding: 6px 10px;
    border-radius: 3px;
    margin: 26px 0; }
    .box-card  /deep/  pre code, pre tt {
      background-color: transparent;
      border: none; }

  .box-card  /deep/  .poetry pre {
    font-family: Garamond, Georgia, serif !important;
    font-style: italic;
    font-size: 110% !important;
    line-height: 1.6em;
    display: block;
    margin-left: 1em; }
    .box-card  /deep/  .poetry pre code {
      font-family: Garamond, Georgia, serif !important;
      word-break: break-all;
      word-break: break-word;
      /* Non standard for webkit */
      -webkit-hyphens: auto;
      -moz-hyphens: auto;
      hyphens: auto;
      white-space: pre-wrap; }

  .box-card  /deep/  sup, sub, a.footnote {
    font-size: 1.4ex;
    height: 0;
    line-height: 1;
    vertical-align: super;
    position: relative; }

  .box-card  /deep/  sub {
    vertical-align: sub;
    top: -1px; }

  @media print {
    .box-card  /deep/  body {
      background: #fff; }

    .box-card  /deep/  img, pre, blockquote, table, figure {
      page-break-inside: avoid; }

    .box-card  /deep/  #wrapper {
      background: #fff;
      border: none; }

    .box-card  /deep/  pre code {
      overflow: visible; } }
  @media screen {
    .box-card  /deep/  body.inverted {
      color: #eee !important;
      border-color: #555;
      box-shadow: none; }

    .box-card  /deep/  .inverted #wrapper, .inverted hr, .inverted p, .inverted td, .inverted li, .inverted h1, .inverted h2, .inverted h3, .inverted h4, .inverted h5, .inverted h6, .inverted th, .inverted .math, .inverted caption, .inverted dd, .inverted dt, .inverted blockquote {
      color: #eee !important;
      border-color: #555;
      box-shadow: none; }
    .box-card  /deep/  .inverted td, .inverted th {
      background: #333; }
    .box-card  /deep/  .inverted pre, .inverted code, .inverted tt {
      background: #eeeeee !important;
      color: #111; }
    .box-card  /deep/  .inverted h2 {
      border-color: #555555; }
    .box-card  /deep/  .inverted hr {
      border-color: #777;
      border-width: 1px !important; }

    .box-card  /deep/  ::selection {
      background: rgba(157, 193, 200, 0.5); }

    .box-card  /deep/  h1::selection {
      background-color: rgba(45, 156, 208, 0.3); }

    .box-card  /deep/  h2::selection {
      background-color: rgba(90, 182, 224, 0.3); }

    .box-card  /deep/  h3::selection, h4::selection, h5::selection, h6::selection, li::selection, ol::selection {
      background-color: rgba(133, 201, 232, 0.3); }

    .box-card  /deep/  code::selection {
      background-color: rgba(0, 0, 0, 0.7);
      color: #eeeeee; }
    .box-card  /deep/  code span::selection {
      background-color: rgba(0, 0, 0, 0.7) !important;
      color: #eeeeee !important; }

    .box-card  /deep/  a::selection {
      background-color: rgba(255, 230, 102, 0.2); }

    .box-card  /deep/  .inverted a::selection {
      background-color: rgba(255, 230, 102, 0.6); }

    .box-card  /deep/  td::selection, th::selection, caption::selection {
      background-color: rgba(180, 237, 95, 0.5); }

    .box-card  /deep/  .inverted {
      background: #0b2531;
      background: #252a2a; }
      .box-card  /deep/  .inverted #wrapper {
        background: #252a2a; }
      .box-card  /deep/  .inverted a {
        color: #acd1d5; } }
    .box-card  /deep/  .highlight .c {
      color: #998;
      font-style: italic; }
    .box-card  /deep/  .highlight .err {
      color: #a61717;
      background-color: #e3d2d2; }
    .box-card  /deep/  .highlight .k, .highlight .o {
      font-weight: bold; }
    .box-card  /deep/  .highlight .cm {
      color: #998;
      font-style: italic; }
    .box-card  /deep/  .highlight .cp {
      color: #999;
      font-weight: bold; }
    .box-card  /deep/  .highlight .c1 {
      color: #998;
      font-style: italic; }
    .box-card  /deep/  .highlight .cs {
      color: #999;
      font-weight: bold;
      font-style: italic; }
    .box-card  /deep/  .highlight .gd {
      color: #000;
      background-color: #fdd; }
      .highlight .gd .x {
        color: #000;
        background-color: #faa; }
    .box-card  /deep/  .highlight .ge {
      font-style: italic; }
    .box-card  /deep/  .highlight .gr {
      color: #a00; }
    .box-card  /deep/  .highlight .gh {
      color: #999; }
    .box-card  /deep/  .highlight .gi {
      color: #000;
      background-color: #dfd; }
      .box-card  /deep/  .highlight .gi .x {
        color: #000;
        background-color: #afa; }
    .box-card  /deep/  .highlight .go {
      color: #888; }
    .box-card  /deep/  .highlight .gp {
      color: #555; }
    .box-card  /deep/  .highlight .gs {
      font-weight: bold; }
    .box-card  /deep/  .highlight .gu {
      color: #800080;
      font-weight: bold; }
    .box-card  /deep/  .highlight .gt {
      color: #a00; }
    .box-card  /deep/  .highlight .kc, .highlight .kd, .highlight .kn, .highlight .kp, .highlight .kr {
      font-weight: bold; }
    .box-card  /deep/  .highlight .kt {
      color: #458;
      font-weight: bold; }
    .box-card  /deep/  .highlight .m {
      color: #099; }
    .box-card  /deep/  .highlight .s {
      color: #d14; }
    .box-card  /deep/  .highlight .na {
      color: #008080; }
    .box-card  /deep/  .highlight .nb {
      color: #0086B3; }
    .box-card  /deep/  .highlight .nc {
      color: #458;
      font-weight: bold; }
    .box-card  /deep/  .highlight .no {
      color: #008080; }
    .box-card  /deep/  .highlight .ni {
      color: #800080; }
    .box-card  /deep/  .highlight .ne, .highlight .nf {
      color: #900;
      font-weight: bold; }
    .box-card  /deep/  .highlight .nn {
      color: #555; }
    .box-card  /deep/  .highlight .nt {
      color: #000080; }
    .box-card  /deep/  .highlight .nv {
      color: #008080; }
    .box-card  /deep/  .highlight .ow {
      font-weight: bold; }
    .box-card  /deep/  .highlight .w {
      color: #bbb; }
    .box-card  /deep/  .highlight .mf, .highlight .mh, .highlight .mi, .highlight .mo {
      color: #099; }
    .box-card  /deep/  .highlight .sb, .highlight .sc, .highlight .sd, .highlight .s2, .highlight .se, .highlight .sh, .highlight .si, .highlight .sx {
      color: #d14; }
    .box-card  /deep/  .highlight .sr {
      color: #009926; }
    .box-card  /deep/  .highlight .s1 {
      color: #d14; }
    .box-card  /deep/  .highlight .ss {
      color: #990073; }
    .box-card  /deep/  .highlight .bp {
      color: #999; }
    .box-card  /deep/  .highlight .vc, .highlight .vg, .highlight .vi {
      color: #008080; }
    .box-card  /deep/  .highlight .il {
      color: #099; }
    .box-card  /deep/  .highlight .gc {
      color: #999;
      background-color: #EAF2F5; }

    .box-card  /deep/  .type-csharp .highlight .k, .type-csharp .highlight .kt {
      color: #00F; }
    .box-card  /deep/  .type-csharp .highlight .nf {
      color: #000;
      font-weight: normal; }
    .box-card  /deep/  .type-csharp .highlight .nc {
      color: #2B91AF; }
    .box-card  /deep/  .type-csharp .highlight .nn {
      color: #000; }
    .box-card  /deep/  .type-csharp .highlight .s, .type-csharp .highlight .sc {
      color: #A31515; }

    .box-card  /deep/  body.dark #wrapper {
      background: transparent !important;
      box-shadow: none !important; }
</style>

<script>
  import cognitionService from '../service/cognitionService.js'
  var marked = require('marked')

  export default {
    data() {
      return {
        data: {},
        id: ''
      }
    },
    mounted: function() {
      this.id = this.$route.params.id
      if(this.id.trim().length == 0) {
        this.$router.push('/')
        return
      }
      this.getData()

    },
    methods: {
      getData: async function() {
        // 开始搜索
        const loading = this.$loading({
          lock: true
        })
        var res = await cognitionService.get(this.id)
        loading.close()
        console.debug(res)
        this.data = res.data._source
        this.data.body = marked(this.data.body)
      }
    }
  };
</script>