import { formatCurrency } from "../scripts/utils/money.js";

console.log('Testing format currency:')
console.log('Work with normal')
if (formatCurrency(2089) === '20.89') {
    console.log("Passed")
} else {
    console.log("Failed")
}

console.log('Work with round number')
if (formatCurrency(2000.5) === "20.01") {
    console.log('Passed')
} else {
    console.log('Failed')
}

console.log('Work with 0')
if (formatCurrency(0) === "0.00") {
    console.log('Passed')
} else {
    console.log('Failed')
}