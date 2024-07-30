import { defineRule, configure } from 'vee-validate'
import { all } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

setLocale('zh_TW') //設置 繁體中文
configure({
  generateMessage: (context) => {
    const defaultMessage = localize({
      zh_TW: zhTW
    })(context)
    const keyName = context.field
    return defaultMessage.replace(`${keyName} `, '')
  },
  validateOnInput: true
})

Object.entries(all).forEach(([name, rule]) => {
  // console.log(typeof name)
  defineRule(name, rule)
})

//自定義規則
defineRule('validPositiveNumber', (value) => {
  // 允許空值，因為 'required' 規則會處理必填檢查
  //   console.log(value)
  if (value === null || value === undefined || value === '') {
    return true
  }
  // 使用正則表達式檢查格式
  const regex = /^(0|[1-9]\d*)(\.\d+)?$/
  if (!regex.test(value)) {
    return '請輸入有效的非負數'
  }
  // 確保數值不小於 0
  const num = Number(value)
  if (isNaN(num) || num < 0) {
    return '數值必須大於或等於 0'
  }

  return true
})

export const userSchema = {
  category: 'required', //種類
  content: 'required', //內容
  description: 'required', //描述
  imageUrl: 'required|url', //主要大圖
  origin_price: 'required|validPositiveNumber', //原始價格
  price: 'required|validPositiveNumber', //最後價格
  title: 'required', //產品標題
  unit: 'required' //產品單位
}

export const couponSchema = {
  couponTitle: 'required',
  couponCode: 'required',
  discount: 'required'
}
