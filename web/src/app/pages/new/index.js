/**
 * @File:      新增页面
 * @Author:    花夏(liubiao01@itoxs.com)
 * @Version:   V0.0.1
 * @Date:      2016-06-05 19:35:07
 */
var Vue = require('vue');
require('./index.css');
var numToCn = require('../../common/numToCn');
module.exports = Vue.extend({
    ready: function () {
        this.date();
    },
    template: require('./index.tpl.html'),
    data: function () {
        return {
            writeType: {
                inputName: 'writeType', // 选择的name字段
                defaultText: '请选择', // 默认请选择
                checkedData: -1, // 默认选中value值
                data: [
                    {
                        text: '请选择',
                        value: -1
                    },
                    {
                        text: '诗',
                        value: 1
                    },
                    {
                        text: '词',
                        value: 2
                    },
                    {
                        text: '赋',
                        value: 3
                    }
                ]
            },
            initLineNum: 4, // 初始行数
            newLines: []
        };
    },
    events: {
        
    },
    components: {
        'v-select': require('../../components/v-select/'),
        'v-header': require('../../includes/header/'),
        'v-footer': require('../../includes/footer/')
    },
    watch: {
        
    },
    methods: {
        /**
         * date 初始化日期组件
         *
         */
        date: function () {
            laydate({
                elem: '#test1',
                format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
                festival: true, //显示节日
                choose: function(datas){
                    //选择日期完毕的回调
                }
            });
        },

        /**
         * newLine 新增一联
         *
         */
        newLine: function () {
            var initLineNum = this.$data.initLineNum;
            var newLineNum = initLineNum - 4;
            var cnNewLineNum = ++newLineNum + 4;
            if (cnNewLineNum >= 69) {
                alert('不能再添加了哦~~');
                return;
            }
            this.$data.initLineNum = cnNewLineNum;
            var cn = numToCn.get(cnNewLineNum);
            this.$data.newLines.push(cn);
        },

        /**
         * delLine 删除一联
         *
         */
        delLine: function () {
            var cnNewLineNum = this.$data.initLineNum;
            var newLineNum = cnNewLineNum - 4;
            --newLineNum;
            this.$data.initLineNum = (newLineNum + 4);
            var len = this.$data.newLines.length;
            if (len === 0) {
                alert('不能再删除了哦~~');
                return;
            }
            this.$data.newLines.splice(len - 1, len);
        }
    }
});