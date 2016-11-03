/**
 * @file:      ajax扩展
 * @author:    花夏(liubiao01@itoxs.com)
 * @version:   V0.0.1
 * @date:      2016-10-31 14:56:30
 */

var $ = require('jquery');
var host = require('../web-config').host;
module.exports = {
    /**
     * 请求拦截函数
     *
     * @param  {Object} params 请求参数
     * @return {Object} 返回请求的promise对象
     */
    doRequest: function (params) {
        var deferred = new $.Deferred();
        if (!(/^\//).test(params.url)) {
            params.url = document.location.protocol + '//' + params.url;
        } else if ((/^http:/).test(params.url)) {
            params.url = params.url;
        } else {
            // 为url拼接前缀
            params.url = host + params.url;
        }
        // ajax请求
        $.ajax(params).done(function (response) {
            var status = +response.status;
            // 状态为100 或者101，重定向到首页
            if (100 === status) {
                deferred.reject(response);
            } else if (101 === status) {
                deferred.reject(response);
            } else if (0 === status) {
                deferred.resolve(response);
            } else {
                deferred.reject(response);
            }
        }).fail(function (response) {
            deferred.reject(response);
        });
        return deferred.promise();
    },

    /**
     * 默认的请求函数
     *
     * @param  {string} path 请求路径
     * @param  {Object} params 请求参数
     * @return {Object} 返回请求的promise对象
     */
    request: function (path, params) {
        var requestParams = $.extend(true, {
            cache: false,
            url: path,
            data: {},
            type: 'GET',
            dataType: 'json'
        }, params);

        return this.doRequest(requestParams);
    },

    /**
     * GET请求
     *
     * @param  {string} path 请求路径
     * @param  {Object} opts 请求的数据
     * @return {Object} 返回请求的promise对象
     */
    requestGET: function (path, opts) {
        var args = {};
        args._ = +new Date();
        $.extend(opts || {}, args);
        return this.request(path, {
            data: opts
        });
    },

    /**
     * POST请求
     *
     * @param  {string} path 请求路径
     * @param  {Object} opts 请求的数据
     * @return {Object} 返回请求的promise对象
     */
    requestPOST: function (path, opts) {
        return this.request(path, {
            data: JSON.stringify(opts),
            type: 'POST',
            contentType: 'application/json'
        });
    },
    requestPOSTAsFormData: function (path, opts) {
        return this.request(path, {
            data: opts,
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        });
    },

    /**
     * DELETE请求
     *
     * @param  {string} path 请求路径
     * @param  {Object} opts 请求的数据
     * @return {Object} 返回请求的promise对象
     */
    requestDELETE: function (path, opts) {
        return this.request(path, {
            data: JSON.stringify(opts),
            type: 'DELETE',
            contentType: 'application/json'
        });
    },

    /**
     * PUT请求
     *
     * @param  {string} path 请求路径
     * @param  {Object} opts 请求的数据
     * @return {Object} 返回请求的promise对象
     */
    requestPUT: function (path, opts) {
        return this.request(path, {
            data: JSON.stringify(opts),
            type: 'PUT',
            contentType: 'application/json'
        });
    }
};