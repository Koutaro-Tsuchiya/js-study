let ans = 0;  //計算結果
let tmp = 0;  //前回の計算を取得
let key = "";　//演算子の取得
let keyTmp = "";　//１つ前の演算子の取得
let display = document.querySelector('.display');

// 「数字」「.」を押した場合
function calcInput(btn) {
    // ここの挙動が不明
    if (btn == '.') {
        if (display.innerText.match(new RegExp("\\.")) != null) return;
    }
    //演算子が既に入力されていた場合
    if (keyTmp != "")displayClear();
    //入力された数字を表示
    //1回目の数字の入力はここに飛ぶ
    display.innerText = display.innerText + btn;
}

//数字の入力が行われた時に演算子が既に入力されているタイミングで表示画面の値をクリア
function displayClear() {
  document.querySelector('.display').innerText = "";
  keyTmp = "";
}

//演算子が押された場合
function calcRun(keyInp) {
    //tmpに数字を保存
    tmp = display.innerHTML;
    //keyに演算子が入っている場合
    if (key != "") {
        ans = calcAny(ans, tmp, key);
        tmp = 0;
        display.innerText = ans * 1;
    }
    // 「＝」を押した場合
    if (keyInp == '='){
      key = "";
      keyTmp = "";
      ans = "";
    }
    // １回目の演算子の入力はここに飛ぶ
    // keyに前回押した演算子を保存
    else {
      key = keyInp;
      keyTmp = keyInp;
      //計算結果
      ans += tmp * 1;
    }
}

function calcAny(ans, tmp, key) {
  if (key == '+') { return ans * 1 + tmp * 1 }
  if (key == '-') { return ans * 1 - tmp * 1 }
  if (key == '×') { return ans * 1 * tmp * 1 }
  if (key == '÷') { return ans * 1 / tmp * 1 }
}

// ACを押した場合
function calcInit() {
  document.querySelector('.display').innerText = "";
  ans = 0;
  tmp = 0;
  key = "";
}

// +/-を押した場合
function calcNegated() {
    display.innerText = display.innerHTML * -1;
    tmp = display.innerHTML;
}

// %を押した場合
function calcPercent() {
    display.innerText = display.innerHTML * 0.01;
    tmp = display.innerHTML;
}
