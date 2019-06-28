let ans = 0;  //計算結果
let tmp = 0;  //前回の計算を取得
let key = "";　//演算子の取得
let keyTmp = "";　//１つ前の演算子の取得
let display = document.querySelector('.display');
let number = document.querySelectorAll('.number');
let operator = document.querySelectorAll('.operator')
const clear = document.querySelector('.clear')
const sign = document.querySelector('.sign')
const percent = document.querySelector('.percent')

// 「数字」「.」が押された場合
number.forEach(index => {
  index.addEventListener('click', () => {
    if(index.innerText == "."){
      if(display.innerText.match(new RegExp("\\.")) != null){
      return;
      }
      if(display.innerText == ""){
        display.innerText = 0;
      }
    }
    //演算子が既に入力されていた場合
    if (keyTmp != "")displayClear();
    //入力された数字を表示
    //1回目の数字の入力はここに飛ぶ
    display.innerText += index.innerText;
  })
})

function displayClear() {
  display.innerText = "";
  keyTmp = "";
}

//演算子が押された場合
operator.forEach(index => {
  index.addEventListener('click', () => {
    //tmpに数字を保存
    tmp = display.innerText;
    //keyに演算子が入っている場合
    if (key != "") {
        ans = calcAny(ans, tmp, key);
        tmp = 0;
        display.innerText = ans;
    }
    // 「＝」を押した場合
    if (index.innerText == '='){
      key = "";
      keyTmp = "";
      ans = "";
      }
    // １回目の演算子の入力はここに飛ぶ
    // keyに前回押した演算子を保存
    else {
      key = index.innerText;
      keyTmp = index.innerText;
      //計算結果
      ans += tmp;
    }
  })
})

function calcAny(ans, tmp, key) {
  if (key == '+') { return parseInt(ans) + parseInt(tmp) }
  if (key == '-') { return parseInt(ans)  - parseInt(tmp)}
  if (key == '×') { return parseInt(ans) * parseInt(tmp) }
  if (key == '÷') { return parseInt(ans)  / parseInt(tmp) }
}

// ACを押した場合
clear.addEventListener('click', () =>{
  display.innerText = "";
  ans = 0;
  tmp = 0;
  key = "";
})

class calc{
    static calcSpecial(x){
    display.innerText = display.innerText * x;
    tmp = display.innerText;
  }
}

// +/-を押した場合
sign.addEventListener('click', () =>{
  calc.calcSpecial(-1);
})

// %を押した場合
percent.addEventListener('click', () =>{
  calc.calcSpecial(0.01);
})
