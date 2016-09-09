/**
 * @File:      瀑布流list
 * @Author:    花夏(liubiao01@itoxs.com)
 * @Version:   V0.0.1
 * @Date:      2016-09-09 21:38:48
 */
var Vue = require('vue');
require('./index.css');
// require('./waterfall.css');
// require('./handlebars.js');
// require('./waterfall.min.js');
module.exports = Vue.extend({
    ready: function () {
        this.init();
    },
    props: {
        waterdata: []
    },
    template: require('./index.tpl.html'),
    data: function () {
        return {

        };
    },
    events: {
        
    },
    components: {
        
    },
    watch: {
        waterdata: {
            handler: function (val) {
                this.init();
            }
        }
    },
    methods: {
        init: function () {
            var me = this;
            console.log(me.waterdata);
        }
    }
});