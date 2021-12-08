const calculateBtn = document.getElementById("calculateBtn");

calculateBtn.addEventListener('click', calculate);

function calculate() {

    const snipeAmount = parseFloat(document.getElementById("snipeAmount").value);
    const buy_gasAmount = parseFloat(document.getElementById("buy_gasAmount").value);
    const buy_gasPrice = parseFloat(document.getElementById("buy_gasPrice").value);
    const sell_gasAmount = parseFloat(document.getElementById("sell_gasAmount").value);
    const sell_gasPrice = parseFloat(document.getElementById("sell_gasPrice").value);
    const maxBuyFee = parseFloat(document.getElementById("maxBuyFee").value) / 100;
    const maxSellFee = parseFloat(document.getElementById("maxSellFee").value) / 100;
    const autoSellMultiplier = parseFloat(document.getElementById("autoSellMultiplier").value);

    const devFee = 0.1;

    const buyGwei = buy_gasPrice * 0.000000001;
    const sellGwei = sell_gasPrice * 0.000000001;

    const buyPriceInBnb100 = buy_gasAmount * buyGwei;
    const buyPriceInBnb75 = buyPriceInBnb100 - (buyPriceInBnb100 * (1 - 0.75));
    const buyPriceInBnb50 = buyPriceInBnb100 - (buyPriceInBnb100 * (1 - 0.50));

    const sellPriceInBnb100 = sell_gasAmount * sellGwei;
    const sellPriceInBnb75 = sellPriceInBnb100 - (sellPriceInBnb100 * (1 - 0.75));
    const sellPriceInBnb50 = sellPriceInBnb100 - (sellPriceInBnb100 * (1 - 0.50));

    const totalFee = maxSellFee + maxBuyFee;

    const beforeFees = snipeAmount * autoSellMultiplier;

    const afterFees100 = (beforeFees * (1 - totalFee)) - (buyPriceInBnb100 + sellPriceInBnb100);
    const afterFees75 = (beforeFees * (1 - totalFee)) - (buyPriceInBnb75 + sellPriceInBnb75);
    const afterFees50 = (beforeFees * (1 - totalFee)) - (buyPriceInBnb50 + sellPriceInBnb50);


    const beforeDevFee100 = afterFees100 - snipeAmount;
    const beforeDevFee75 = afterFees75 - snipeAmount;
    const beforeDevFee50 = afterFees50 - snipeAmount;

    const profit100 = (beforeDevFee100 * (1 - devFee)).toFixed(9);
    const profit75 = (beforeDevFee75 * (1 - devFee)).toFixed(9);
    const profit50 = (beforeDevFee50 * (1 - devFee)).toFixed(9);

    document.getElementById("result-100").innerHTML = profit100.toString();
    document.getElementById("result-75").innerHTML = profit75.toString();
    document.getElementById("result-50").innerHTML = profit50.toString();

    const results = document.getElementsByClassName("result");

    for (let i = 0; i < results.length; i++) {

        if (results[i].innerHTML.includes("-")) {
            results[i].style.color = "rgb(223,24,32)";
        }
    }
}

