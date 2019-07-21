class Calculator {
  constructor() {
    this.ans = 0;
    this.tmp = 0;
    this.key = "";
    this.keyTmp = "";
    this.display = document.querySelector('.display');
    this.number = document.querySelectorAll('.number');
    this.operator = document.querySelectorAll('.operator');
    this.clear = document.querySelector('.clear');
    this.sign = document.querySelector('.sign');
    this.percent = document.querySelector('.percent');
    this.init();
  }

  init(){
    // 数値を入力した場合
    this.number.forEach(element=>{
      element.addEventListener('click',()=>this.onNumber(element))
    })

    //演算子を押した場合
    this.operator.forEach(element=>{
      element.addEventListener('click',()=>this.onOperator(element))
    })

    // ACを押した場合
    this.clear.addEventListener('click',()=>this.onClear())

    // +/-を押した場合
    this.sign.addEventListener('click',()=>{
      this.display.innerText = this.display.innerHTML * -1;
      this.tmp = this.display.innerHTML;
    });

    // %を押した場合
    this.percent.addEventListener('click',()=>{
      this.display.innerText = this.display.innerText * 0.01;
      // 計算結果(ans)が９桁以上の場合は"Error"を返す
      if(this.display.innerText.length > 8){
        this.display.innerText = "Error";
      }
      this.tmp = this.display.innerText;
    });
  }

  onNumber(element){
    // ９桁以上は入力できない(レイアウトが崩れないようにするため)
    // 演算子を押した後(keyTmpに演算子が入った状態)は入力可能
    if(this.display.innerText.length > 7 && this.keyTmp == ""){
      return;
    }

    //演算子が入力された後(keyTmpに演算子が入っている状態)の操作
    //画面をクリアする
    if(this.keyTmp != ""){
      this.display.innerText = "";
      this.keyTmp = "";
    }

    // 画面が「０」のみの場合は続けて数値は入力できない
    // 「.」は入力できる
    if(element.innerText != "." && this.display.innerText == "0"){
      return;
    }

    // 「.」が入力された場合
    if(element.innerText == "."){
      // ２つ以上「.」を入力できない
      if(this.display.innerText.match(new RegExp("\\.")) != null){
        return;
      }
      // 画面に何も入力されていなかった場合は「0.」と表示する
      if(this.display.innerText == ""){
        this.display.innerText = 0;
      }
    }

    //入力された数値を表示
    this.display.innerText += element.innerText;
  }

  onOperator(element){
    //演算子を連続で押した場合は
    // 前回押した演算子が「=」だった場合のみ動く(keyTmpが「=」)
    if(this.keyTmp == "" || this.keyTmp == "="){

      //tmpに画面上の数値を保存
      this.tmp = this.display.innerText;

      //keyに演算子が入っている場合
      if(this.key != ""){
        this.ans = this.calcRun();
        // 計算結果(ans)が8桁以上の場合は"Error"を返す
        if(String(this.ans).length > 8){
          this.display.innerText = "Error";
        }
        // 計算結果を画面に表示する
        else{
          this.display.innerText = this.ans;
        }
        this.tmp = 0;
      };

      // 「=」を押した場合
      if(element.innerText == '='){
        this.key = "";
        // 画面上の計算結果に続いて、数値が入力できる動きを防ぐため、keyTmpに「=」を入れた。
        this.keyTmp = "=";
        this.ans = "";
      }
      // １回目の演算子の入力はここに飛ぶ
      // key、keyTmpに押した演算子を保存
      else{
        this.key = element.innerText;
        this.keyTmp = element.innerText;
        this.ans += this.tmp;
      }
    }
    // 連続で四則演算子を押した場合、
    // 最後に押した演算子を採用
    else {
      this.key = element.innerText;
    }
  }

  onClear(){
    this.display.innerText = "";
    this.ans = 0;
    this.tmp = 0;
    this.key = "";
  }

  calcRun(){
    if (this.key == '+') { return parseFloat(this.ans) + parseFloat(this.tmp) }
    if (this.key == '-') { return parseFloat(this.ans)  - parseFloat(this.tmp)}
    if (this.key == '×') { return parseFloat(this.ans) * parseFloat(this.tmp) }
    if (this.key == '÷') { return parseFloat(this.ans)  / parseFloat(this.tmp) }
  }
}

const calculator = new Calculator();
