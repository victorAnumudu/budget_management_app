import n2words from "rosaenlg-n2words"

// import { ToWords } from 'to-words';

// const numberToWords = new ToWords({
//   localeCode: 'en-IN',
//   converterOptions: {
//     currency: true,
//     ignoreDecimal: false,
//     ignoreZeroCurrency: false,
//     doNotAddOnly: false,
//     currencyOptions: {
//       // can be used to override defaults for the selected locale
//       name: 'Naira',
//       plural: 'Naira',
//       symbol: '₦',
//       fractionalUnit: {
//         name: 'Kobo',
//         plural: 'Kobo',
//         symbol: 'k',
//       },
//     },
//   },
// });

const numberToWords = (num, currency='en') => {
    let numberSplit = num.toString().split('.')
    let message = ''
    if(numberSplit.length > 1){
        message += `${n2words(Number(numberSplit[0]), {lang: currency})} Naira, ${n2words(Number(numberSplit[1]), {lang: currency})} Kobo Only`
    }else{
        message += `${n2words(num, {lang: currency})} Naira Only`
    }

    return message.toUpperCase()
}

 export default numberToWords