
// 格式化日期 
export function getDate(time) {
    if(!time) return 
    
    let date = new Date(time) 
    
    let dateRes = date.getFullYear() + '-'
    + getRightTime((date.getMonth() + 1)) + '-'
    + date.getDate() + ' '
    + getRightTime(date.getHours()) + ':'
    + getRightTime(date.getMinutes()) + ':'
    + getRightTime(date.getSeconds()) 
    return dateRes
}

function getRightTime(originTime) {
        return originTime < 10 ? '0' + originTime : originTime
}

