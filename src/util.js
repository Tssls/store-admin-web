export function getDate(date) {
    switch (date) {
        case 'mon':
            return '周一';
        case 'tue':
            return '周二';
        case 'wed':
            return '周三';
        case 'thu':
            return '周四';
        case 'fri':
            return '周五';
        case 'sat':
            return '周六';
        case 'sun':
            return '周日';
        default:
            return date;
    }
}

export function getParams(str) {
    const url = window.location.search;
    let s = url.slice(url.indexOf('?') + 1).split('&');
    let obj = {};
    s.forEach(item => {
        let l = item.split('=');
        obj[l[0]] = l[1]
    })
    if (str) return obj[str] || null;
    return obj;
}
