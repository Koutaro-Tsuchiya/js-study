class Calculator {
  constructor() {
    this.ans = 0;
    this.tmp = 0;
    this.key = "";
    this.keyTmp = "";
    this.display = document.querySelector('.display');
    this.number = document.querySelectorAll('.number');
    this.operator = document.querySelectorAll('.operator');
    this.clear = document.querySelector('.clear')
    this.sign = document.querySelector('.sign')
    this.percent = document.querySelector('.percent')
    this.int=()=>{
      // 数値が押された場合
      this.number.forEach(input => {
        input.addEventListener('click',()=>this.onNumber(input))
      })

      //演算子が押された場合
      this.operator.forEach(input => {
        input.addEventListener('click', ()=>this.onOperator(input))
      })

      // ACを押した場合
      this.clear.addEventListener('click', this.onClear);

      // +/-を押した場合
      this.sign.addEventListener('click',()=>{
        this.display.innerText = this.display.innerHTML * -1;
        this.tmp = this.display.innerHTML;
      });

      // %を押した場合
      this.percent.addEventListener('click',()=>{
        this.display.innerText = this.display.innerHTML * 0.01;
        this.tmp = this.display.innerHTML;
      });
    }
  }

  onNumber=(input)=>{
    if(input.innerText == "."){
      if(this.display.innerText.match(new RegExp("\\.")) != null){
        return;
      }
      if(this.display.innerText == ""){
        this.display.innerText = 0;
      }
    }
    //演算子が既に入力されていた場合
    if (this.keyTmp != ""){
      this.display.innerText = "";
      this.keyTmp = "";
    }
    //入力された数字を表示
    //1回目の数字の入力はここに飛ぶ
    this.display.innerText += input.innerText;
  }

  onOperator=(input)=>{
    //tmpに数字を保存
    this.tmp = this.display.innerText;
    //keyに演算子が入っている場合
    if (this.key != "") {
      this.ans = this.calcRun();
      this.tmp = 0;
      this.display.innerText = this.ans;
    }
    // 「＝」を押した場合
    if (input.innerText == '='){
      this.key = "";
      this.keyTmp = "";
      this.ans = "";
    }
    // １回目の演算子の入力はここに飛ぶ
    // keyに前回押した演算子を保存
    else {
      this.key = input.innerText;
      this.keyTmp = input.innerText;
      //計算結果
      this.ans += this.tmp;
    }
  }

  onClear=()=>{
    this.display.innerText = "";
    this.ans = 0;
    this.tmp = 0;
    this.key = "";
  }

  calcRun=()=>{
    if (this.key == '+') { return parseInt(this.ans) + parseInt(this.tmp) }
    if (this.key == '-') { return parseInt(this.ans)  - parseInt(this.tmp)}
    if (this.key == '×') { return parseInt(this.ans) * parseInt(this.tmp) }
    if (this.key == '÷') { return parseInt(this.ans)  / parseInt(this.tmp) }
  }

}

const calculator = new Calculator()
calculator.int()
