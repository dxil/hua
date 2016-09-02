/**
 * @File:      新增页面
 * @Author:    花夏(liubiao01@itoxs.com)
 * @Version:   V0.0.1
 * @Date:      2016-06-05 19:35:07
 */
var Vue = require('vue');
require('./index.css');
var numToCn = require('../../common/numToCn');
var rule = require('./rule-setting');
module.exports = Vue.extend({
    ready: function () {
        this.init();
        this.date();
    },
    template: require('./index.tpl.html'),
    data: function () {
        return {
            genres: {
                inputName: 'poem_genres', // 选择的name字段
                defaultText: '请选择', // 默认请选择
                checkedData: '', // 默认选中value值
                data: [
                    {
                        text: '请选择',
                        value: ''
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
            newLines: [
                {
                    title: '壹',
                    value: ''
                },
                {
                    title: '贰',
                    value: ''
                },
                {
                    title: '叁',
                    value: ''
                },
                {
                    title: '肆',
                    value: ''
                }
            ]
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
        init: function () {
            var me = this;
            $('[name = poem-form]').form({
                fields:    rule,
                inline:    true,
                on:        'submit',
                onSuccess: function () {
                    var validate = me.validation();
                    // 所有验证通过则提交数据并保存
                    if (validate) {
                        me.post();
                    }
                }
            });
        },
        /**
         * date 初始化日期组件
         *
         */
        date: function () {
            laydate({
                elem:     '#test1',
                format:   'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
                festival: true, //显示节日
                choose:   function(datas){
                    //选择日期完毕的回调
                }
            });
        },

        /**
         * newLine 新增一联
         *
         */
        newLine: function () {
            var initLineNum  = this.$data.initLineNum;
            var newLineNum   = initLineNum - 4;
            var cnNewLineNum = ++newLineNum + 4;
            if (cnNewLineNum >= 69) {
                alert('不能再添加了哦~~');
                return;
            }
            this.$data.initLineNum = cnNewLineNum;
            var cn = numToCn.get(cnNewLineNum);
            var obj = {
                title: cn,
                value: ''
            }
            this.$data.newLines.push(obj);
        },

        /**
         * delLine 删除一联
         *
         */
        delLine: function () {
            var cnNewLineNum = this.$data.initLineNum;
            var newLineNum   = cnNewLineNum - 4;
            if (newLineNum === 0) {
                alert('不能再删除了哦~~');
                return;
            }
            var len = this.$data.newLines.length;
            this.$data.newLines.splice(len - 1, len);
            this.$data.initLineNum = this.$data.newLines.length;
        },

        /**
         * validation 自定义校验每一行
         *
         */
        validation: function () {
            var data = this.$data.newLines;
            var validateNum = 0;
            data.forEach(function (item, index) {
                if (!item.value && (item.value !== 0 || item.value !== '0')) {
                    var errEl = $('.ui.segment.field').eq(index).find('.prompt.label');
                    if (errEl.length <= 0) {
                        $('.ui.segment.field').eq(index).append('<div class="ui basic red pointing prompt label transition visible">再想想又是一好辞！</div>');
                    }
                    validateNum++;
                }else {
                    $('.ui.segment.field').eq(index).find('.prompt.label').remove();
                }
            });
            return validateNum <= 0;
        },

        post: function () {
            alert(1);
        }
    }
});