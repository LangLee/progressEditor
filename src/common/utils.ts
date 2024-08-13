const throttle = (fn, delay) => {
    let lastExecutionTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        if (currentTime - lastExecutionTime >= delay) {
            fn(...args);
            lastExecutionTime = currentTime;
        }
    };
}
const debounce = (fn, delay) => {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}
const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
//复制
const fallbackCopyTextToClipboard = (text) => {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? '成功拷贝!' : '拷贝失败!';
        console.log(msg);
    } catch (err) {
        console.error('拷贝到剪贴板失败:', err);
    }
    document.body.removeChild(textArea);
}
const copyTextToClipboard = (text, cb) => {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        cb && cb();
        console.log('成功拷贝!');
    }, function (err) {
        console.error('拷贝到剪贴板失败:', err);
    }
    )
}
export {
    throttle,
    debounce,
    isMobile,
    copyTextToClipboard
}