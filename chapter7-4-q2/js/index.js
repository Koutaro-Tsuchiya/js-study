let ans = 0;  //計算結果
let tmp = 0;  //前回の計算を取得
let key = "";　//演算子の取得
let keytmp = "";　//１つ前の演算子の取得
let Display = document.querySelector('.display');

// 「数字」「.」を押した場合
function calcuInput(btn) {
    // ここの挙動が不明
    if (btn == '.') {
        if (Display.innerText.match(new RegExp("\\.")) != null) return 0;
    }
    //演算子が既に入力されていた場合
    if (keytmp != "")vDisplayClea();
    //入力された数字を表示
    //1回目の数字の入力はここに飛ぶ
    Display.innerText = Display.innerText + btn;
}

//数字の入力が行われた時に演算子が既に入力されているタイミングで表示画面の値をクリア
function vDisplayClea() {
  document.querySelector('.display').innerText = "";
  keytmp = "";
}

//演算子が押された場合
function calcuRun(keyinp) {
    //tmpに数字を保存
    tmp = Display.innerHTML;
    //keyに演算子が入っている場合
    if (key != "") {
        ans = calcAny(ans, tmp, key);
        tmp = 0;
        Display.innerText = ans * 1;
    }
    // 「＝」を押した場合
    if (keyinp == '='){
      key = "";
      keytmp = "";
      ans = "";
    }
    // １回目の演算子の入力はここに飛ぶ
    // keyに前回押した演算子を保存
    else {
      key = keyinp;
      keytmp = keyinp;
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
function calcuInit() {
  document.querySelector('.display').innerText = "";
  ans = 0;
  tmp = 0;
  key = "";
}

// +/-を押した場合
function calcuNegated() {
    Display.innerText = Display.innerHTML * -1;
    tmp = Display.innerHTML;
}

// %を押した場合
function calcuPercent() {
    Display.innerText = Display.innerHTML * 0.01;
    tmp = Display.innerHTML;
}
