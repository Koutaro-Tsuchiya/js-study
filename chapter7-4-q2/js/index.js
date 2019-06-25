let ans = 0;
let tmp = 0;
let key = "";　
let keytmp = "";　
let Display = document.querySelector('.display');


function calcuInput(btn) {
    if (btn == '.') {
        if (Display.innerText.match(new RegExp("\\.")) != null) return 0;
    }
    if (keytmp != "") vDisplayClea();
    Display.innerText = Display.innerText + btn;
}

function calcuRun(keyinp) {
    tmp = Display.innerHTML;
    if (key != "") {
        ans = calcAny(ans, tmp, key);
        tmp = 0;
        Display.innerText = ans * 1;
    }
    // keyに前回押した演算子を保存
    key = keyinp;
    keytmp = keyinp;
    ans += tmp * 1;
}

function calcuInit() {
  document.querySelector('.display').innerText = "";
  ans = 0;
  tmp = 0;
  key = "";
}

function calcAny(ans, tmp, keyinp) {
    if (keyinp == '+') { return ans * 1 + tmp * 1 }
    if (keyinp == '-') { return ans * 1 - tmp * 1 }
    if (keyinp == '×') { return ans * 1 * tmp * 1 }
    if (keyinp == '÷') { return ans * 1 / tmp * 1 }
}

function calcuEqual(keyinp) {
  calcuRun();
}

function calcuNegated() {
    Display.innerText = Display.innerHTML * -1;
    tmp = Display.innerHTML;
}

function calcuPercent() {
    Display.innerText = Display.innerHTML * 0.01;
    tmp = Display.innerHTML;
}

function vDisplayClea() {
    document.querySelector('.display').innerText = "";
    keytmp = "";
}
