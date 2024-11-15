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
const uploadFile: (file: File) => Promise<string | ArrayBuffer | null> = (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = function () {
            resolve(reader.result);
            return
        };
        // 根据文件类型进行不同处理
        if (file.type.startsWith('image/')) {
            // 处理图片文件
            reader.readAsDataURL(file);
        } else if (file.type.startsWith('text/') || file.type.endsWith('/json') || file.type === '') {
            reader.readAsText(file);
        } else {
            reject('不支持的文件类型')
        }
    })
}
interface uploadOptions {
    accept?: string,
    multiple?: boolean,
    uploader?: (file: File) => Promise<string | ArrayBuffer | null>
}
interface file {
    name?: string,
    type?: string,
    size?: number,
    data: string | ArrayBuffer | null
}
const upload: (uploadOptions) => Promise<file> = (options: uploadOptions = { accept: 'image/*', multiple: false, uploader: uploadFile }) => {
    return new Promise((resolve, reject) => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = options.accept || '';
        fileInput.multiple = options.multiple || false;
        // 隐藏 fileInput 元素
        fileInput.style.display = 'none';
        fileInput.addEventListener('change', function (e) {
            // 假设event是某个文件输入元素的change事件
            const inputElement = e.target as HTMLInputElement;
            const file = inputElement.files && inputElement.files[0];
            // 检查是否选择了文件
            if (!file) {
                reject("请选择一个文件");
                return;
            }
            // 检查文件大小
            const MAX_FILE_SIZE = 5 * 1024 * 1024; // 最大文件大小为 5MB
            if (file?.size > MAX_FILE_SIZE) {
                reject(`文件大小超过限制 (${MAX_FILE_SIZE / (1024 * 1024)} MB)`)
                return;
            }
            options.uploader = options.uploader || uploadFile;
            if (!options.uploader) {
                reject("未设置上传函数")
                return;
            }
            options.uploader(file).then((result) => {
                document.body.removeChild(fileInput);
                resolve({ type: file?.type, name: file?.name, data: result });
            }).catch(
                err => {
                    document.body.removeChild(fileInput);
                    reject(err)
                }
            );
        });
        document.body.appendChild(fileInput);
        // 触发文件选择框
        fileInput.click();
    })
}
const getTimeDifference = (t1, t2) => {
    // 将时间转换为日期对象
    var date1 = new Date(t1);
    var date2 = new Date(t2);

    // 将日期转换为毫秒
    var time1 = date1.getTime();
    var time2 = date2.getTime();

    // 计算两个时间的差值（毫秒）
    var difference = time2 - time1;

    // 转换差值为秒
    var seconds = Math.floor(Math.abs(difference / 1000));

    // 转换差值为分钟
    var minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;

    // 转换差值为小时
    var hours = Math.floor(minutes / 60);
    minutes = minutes % 60;

    // 返回格式化的时间差
    return {
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
}
const getPassTimeText = (date)=>{
    let {hours, minutes, seconds} = getTimeDifference(date, new Date());
    if (hours) {
        return `${hours}小时前更新`
    } else if (minutes) {
        return `${minutes}分前更新`
    } else if (seconds) {
        return `${seconds}秒前更新`
    } else {
        return '刚刚更新'
    }
}
const getAssetsFile = (fileName) => {
    return new URL(`../assets/${fileName}`, import.meta.url).href;
}
export {
    throttle,
    debounce,
    isMobile,
    copyTextToClipboard,
    upload,
    getPassTimeText,
    getAssetsFile
}