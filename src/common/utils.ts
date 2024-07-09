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
export {
    throttle,
    debounce
}