export function useDateFormat() {
  //將  Unix 时间戳 轉換成 年/月/日格式
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}/${month}/${day}`
  }
  //年/月/日格式 轉換成 Unix 时间戳
  const dateChangeUnix = (dateString) => {
    const date = new Date(dateString)
    return Math.floor(date.getTime() / 1000)
  }
  return {
    formatTimestamp,
    dateChangeUnix
  }
}
