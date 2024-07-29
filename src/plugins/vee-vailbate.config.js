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

export const userSchema = {
    category: 'required',//種類
    content: 'required',//內容
    description: 'required',//描述
    imageUrl: 'required',//主要大圖
    origin_price: 'required',//原始價格
    price: 'required',//最後價格
    title: 'required',//產品標題
    unit: 'required'//產品單位
}

export const couponSchema = {
    'couponTitle': 'required',
    'couponCode': 'required',
    'discount': 'required',
}

