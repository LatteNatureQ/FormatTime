// szj新增
// 获取当月最后一天
const getCurrentMonthLast = date => {

  let currentMonth = date.getMonth()
  let nextMonth = ++currentMonth
  let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
  let oneDay = 1000 * 60 * 60 * 24
  return new Date(nextMonthFirstDay - oneDay)
}

// 获取当月第一天
const getCurrentMonthFirst = date => {

  const currentMonth = date.getMonth()
  const currentMonthFirstDay = new Date(date.getFullYear(), currentMonth, 1)
  return currentMonthFirstDay
}

// 格式化时间获取最近一周
// format [{oDate:26,createTime:'2019-12-26 00:00:01',endTime:'2019-12-26 23:59:59'}]
const getWeekRecent = date => {
  let nMonthLast = getCurrentMonthLast(date).getDate()
  let year = date.getFullYear()
  let month = (date.getMonth() + 1).toString().padStart(2, '0')
  let oDate = date.getDate()
  let timeArr = []
  for (let i = 0; i < 7; i++) {
    let currentDate = oDate + i
    if (currentDate > nMonthLast) {
      currentDate = currentDate - nMonthLast
      month = (date.getMonth() + 2).toString().padStart(2, '0')
    }
    if (+month > 12) {
      month = '01'
      year = +year + 1
    }
    timeArr.push({
      oDate: currentDate,
      createTime: year + '-' + month + '-' + currentDate.toString().padStart(2, '0') + ' 00:00:01',
      endTime: year + '-' + month + '-' + currentDate.toString().padStart(2, '0') + ' 23:59:59'
    })
  }
  return timeArr
}

// 补0
const formatPadStart = str => {
  return str.padStart(2, '0')
}

// 获取年月日时分秒
const getCurrentDateAndTime = date => {
  let dayCycle = date.getDay()
  const dayCycleArray = ["日", "一", "二", "三", "四", "五", "六"]
  for (let i = 0; i < 7; i++) {
    if (dayCycle === i) {
      dayCycle = dayCycleArray[i]
    }
  }
  return {
    year: date.getFullYear(),
    month: formatPadStart((date.getMonth() + 1).toString()),
    date: formatPadStart(date.getDate().toString()),
    week: dayCycle,
    hours: formatPadStart(date.getHours().toString()),
    minutes: formatPadStart(date.getMinutes().toString()),
    seconds: formatPadStart(date.getSeconds().toString())
  }
}

// 获取毫秒戳
const getMsStamp = day => {
  let now = new Date()
  let targetday_milliseconds = now.getTime() + 1000 * 60 * 60 * 24 * day;
  return targetday_milliseconds
}

// 格式化时间返回年月日时分秒

const getMoment = (date, format = 'YYYY-MM-DD hh:mm:ss') => {
  const dateAndTimeObj = getCurrentDateAndTime(date)
  format = format.replace(/YYYY/g, dateAndTimeObj.year)
  format = format.replace(/MM/g, dateAndTimeObj.month)
  format = format.replace(/DD/g, dateAndTimeObj.date)
  format = format.replace(/hh/g, dateAndTimeObj.hours)
  format = format.replace(/mm/g, dateAndTimeObj.minutes)
  format = format.replace(/ss/g, dateAndTimeObj.seconds)
  return format
}

export {
  getCurrentMonthLast,
  getCurrentMonthFirst,
  getWeekRecent,
  getCurrentDateAndTime,
  getMoment
}
