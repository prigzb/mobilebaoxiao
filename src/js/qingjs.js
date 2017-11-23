var _CUSTOM_PROTOCOL_SCHEME = 'xuntong',
    callbacksCount = 1,
    callbacks = {}

function _handleMessageFromXT(callbackId, message) {
    try {
        var callback = callbacks[callbackId]
        if (!callback) return
        callback.apply(null, [message])
    } catch (e) {
        alert(e)
    }
}

/**
 * 获取用户ua信息,判断OS
 * @returns {string}
 */
function getOS() {
    var userAgent = navigator.userAgent
    return userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? 'ios' : userAgent.match(/Android/i) ? 'android' : userAgent.match(/Qing/i) ? 'Qing' : ''
}
/**
 * 判断用户是否在云之家桌面端中
 * @returns {Array|{index: number, input: string}}
 */
function isCloudHub() {
    var userAgent = navigator.userAgent
    return userAgent.match(/App\/cloudhub/)
}

// Use this in javascript to request native objective-c code
// functionName : string (I think the name is explicit :p)
// args : array of arguments
// callback : function with n-arguments that is going to be called when the native code returned
function _call(functionName, message, callback) {
    // 只有在手机或电脑端云之家中才允许调用Xuntong JSBridge
    if (!(getOS() || isCloudHub())) return false
    var hasCallback = callback && typeof callback === 'function'
    var callbackId = hasCallback ? callbacksCount++ : 0

    if (hasCallback) {
        callbacks[callbackId] = callback
    }

    var iframe = document.createElement('IFRAME')
    iframe.setAttribute('src', _CUSTOM_PROTOCOL_SCHEME + ':' + functionName + ':' + callbackId + ':' + encodeURIComponent(JSON.stringify(message)))
    // For some reason we need to set a non-empty size for the iOS6 simulator...
    iframe.setAttribute('height', '1px')
    iframe.setAttribute('width', '1px')
    document.documentElement.appendChild(iframe)
    iframe.parentNode.removeChild(iframe)
    iframe = null
}

var __XuntongJSBridge = {
    // public
    invoke: _call,
    call: _call,
    handleMessageFromXT: _handleMessageFromXT,
    getOS: getOS
}
export {__XuntongJSBridge as XuntongJSBridge}
