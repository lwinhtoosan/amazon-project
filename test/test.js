import { formatCurrency } from "../scripts/utils/money.js";

if (formatCurrency(2089) === '20.89') {
    console.log("Passed")
} else {
    console.log("Failed")
}

if (formatCurrency(2000.5) === "20.01") {
    console.log('Passed')
} else {
    console.log('Failed')
}

if (formatCurrency(2456.678) === "24.57") {
    console.log('Passed')
} else {
    console.log('Failed')
}