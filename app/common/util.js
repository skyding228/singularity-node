/**
 *
 * 作者：weich
 * 邮箱：1329555958@qq.com
 * 日期：2016/12/29
 *
 * 未经作者本人同意，不允许将此文件用作其他用途。违者必究。
 *
 * @ngdoc
 * @author          weich
 * @name            Role
 * @description
 */
var placeholder = '{}';
var _ = require('lodash');

function stringify(p) {
    return _.isObject(p) ? JSON.stringify(p) : p;
}
/**
 * 根据参数格式化字符串
 * @param str 包含{}的字符串，根据后面参数的位置替换{}
 */
exports.formatString = function (str) {
    var segments = str.split(placeholder);
    var message = [];
    for (var i = 0; i < Math.min(segments.length - 1, arguments.length - 1); i++) {
        message.push(segments[i]);
        //arguments第一个是带有占位符的字符串
        message.push(stringify(arguments[i + 1]));
    }
    message = message.concat(segments.slice(i));
    return message.join('');
};

/**
 * 将命令行参数转换为json对象，
 * @param params {[string]} key=value分隔的键值对的数组列表
 * @return {{}}
 */
exports.commandLineParamsToJSON = function (params) {
    var obj = {};
    params.forEach(function (p) {
        var splitIndex = p.indexOf('=');
        if (splitIndex !== -1) {
            obj[p.substring(0, splitIndex)] = p.substring(splitIndex + 1);
        }
    });
    return obj
};
/**
 * 将一个对象obj中的一些属性sourceProperties移动到destProperty上
 * @param obj {{}}
 * @param destProperty {string}
 * @param sourceProperties {[string]}
 */
exports.moveProperties = function (obj, destProperty, sourceProperties) {
    obj[destProperty] = _.pick(obj, sourceProperties);
    sourceProperties.forEach(function (k) {
        delete  obj[k];
    });
};

console.log(exports.formatString("my name={},age={}", "wch", "26", "sss"));