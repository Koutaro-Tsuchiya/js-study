import _ from "lodash"

const BLOCK_SIZE = 24
const BLOCK_ROWS = 22
const BLOCK_COLS = 12
// テトロミノのサイズを追加
const TETRO_SIZE = 4

const SCREEN_WIDTH = BLOCK_SIZE * BLOCK_COLS
const SCREEN_HEIGHT = BLOCK_SIZE * BLOCK_ROWS

const NON_BLOCK = 0
const NORMAL_BLOCK = 1
const WALL = 9
const LOCK_BLOCK = 2

const GAMEOVER = 0

const BLOCK_COLOR = "#00ffff"
const BACK_COLOR = "#f5f5f5"
const WALL_COLOR = "#000000"
const LOCK_COLOR = "#c0c0c0"

const KEY_LEFT = 37
const KEY_UP = 38
const KEY_RIGHT = 39
const KEY_DOWN = 40

const speed = 500
let lastUpdate = 0

const	BLOCKS = [
  [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
 ],
 [
   [0, 0, 1, 0],
   [0, 0, 1, 0],
   [0, 0, 1, 0],
   [0, 0, 1, 0],
 ],
 [
  [0, 0, 1, 0],
  [0, 1, 1, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 0],
],
[
  [0, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 0],
],
[
  [0, 0, 0, 0],
  [0, 1, 1, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
],
[
  [0, 0, 0, 0],
  [0, 1, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 1, 0],
],
[
  [0, 0, 0, 0],
  [0, 1, 0, 0],
  [1, 1, 1, 0],
  [0, 0, 0, 0],
]
]

const STAGE = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]


export default class Tetris {
  constructor (canvas) {
    canvas.width = SCREEN_WIDTH
    canvas.height = SCREEN_HEIGHT
    this.cxt = canvas.getContext("2d")
    this.stage = _.cloneDeep(STAGE)

    this.x = 0
    this.y = 0
    this.beforeX = 0
    this.beforeY = 0
    this.block = []

    this.mode = 1

    this.createBlock()
    this.updateBlock()
    this.draw()

    window.addEventListener("keydown", (evt) => {
      this.keyHandler(evt)
    })

    // 定期実行処理
    this.ticker = (timestamp) => {
      if (this.mode === GAMEOVER){
        return this.gameOver()
      }
      this.beforeX = this.x
      this.beforeY = this.y

      const diff = timestamp - lastUpdate
      // 500msごとにy座標をずらして落下させる
      if (diff > speed) {
        lastUpdate = timestamp
        this.clearBlock()
        this.y++

        // 衝突の場合は座標を戻して、新しくブロックを作成
         if (this.isHit()) {
           this.y = this.beforeY
           this.lockBlock()
           this.deleteLine()
           this.createBlock()
         }
         this.updateBlock()
      }
      this.draw()
      requestAnimationFrame(this.ticker)
    }
    requestAnimationFrame(this.ticker)
  }
// constructor終了

  draw () {
    for (let row = 0; row < BLOCK_ROWS; row++) {
      for (let col = 0; col < BLOCK_COLS; col++) {
        switch(this.stage[row][col]){
          case NON_BLOCK:
          this.cxt.fillStyle = BACK_COLOR
          break
          case WALL:
          this.cxt.fillStyle = WALL_COLOR
          break
          case LOCK_BLOCK:
          this.cxt.fillStyle = LOCK_COLOR
          break
        }
        this.cxt.fillRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE -1, BLOCK_SIZE - 1)
      }
    }
    this.updateBlock()
  }

  // ランダムにブロックを取得
  // 座標の初期値をセット
  createBlock () {
    // ランダムにブロックを取得
    let block_type
    = Math.floor(Math.random() * BLOCKS.length);
    this.block = BLOCKS[block_type]
    // 座標の初期値をセット
    this.x = BLOCK_COLS/2 - TETRO_SIZE/2
    this.y = 0

    if (this.isHit()) {
      this.mode = GAMEOVER
    }

  }


  // this.stageへblockの値を反映
  updateBlock () {
    for (let row = 0; row < TETRO_SIZE; row++) {
      for (let col = 0; col < TETRO_SIZE; col++) {
        switch(this.block[row][col]){
          case NORMAL_BLOCK:
            this.cxt.fillStyle = BLOCK_COLOR
            this.cxt.fillRect((col + this.x) * BLOCK_SIZE, (row + this.y) * BLOCK_SIZE, BLOCK_SIZE -1, BLOCK_SIZE -1)
          break
        }
      }
    }
  }

  // ブロックを0に戻す
  clearBlock () {
    for (let row = 0; row < BLOCK_ROWS; row++) {
      for (let col = 0; col < BLOCK_COLS; col++) {
        switch(this.stage[row][col]){
          case NON_BLOCK:
          this.stage[row][col] = 0
          break
        }
      }
    }
  }

  // 衝突判定
  isHit () {
    for (let row = 0; row < TETRO_SIZE; row++) {
      for (let col = 0; col < TETRO_SIZE; col++) {
        if (this.block[row][col] !== 0 && this.stage[row + this.y][col + this.x] !== 0){
            return true;
          }
        }
      }
      return false;
    }

  // LOCK_BLOCKの値を座標に代入
  lockBlock () {
    for (let row = 0; row < TETRO_SIZE; row++) {
      for (let col = 0; col < TETRO_SIZE; col++) {
          if (this.block[row][col] !== 0){
            this.stage[row + this.y][col + this.x] = LOCK_BLOCK
        }
      }
    }
  }

  keyHandler (e) {
    this.clearBlock()
    this.beforeX = this.x
    this.beforeY = this.y

    // キーを入力したときに座標を移動
    switch (e.keyCode) {
      case KEY_LEFT:
        this.x--
      break
      case KEY_RIGHT:
        this.x++
      break
      case KEY_DOWN:
        this.y++
      break
      case KEY_UP:
        this.rotateBlock()
      break
    }

    if (this.isHit()) {
      this.x = this.beforeX
      this.y = this.beforeY
    }

    this.updateBlock()
  }

  rotateBlock () {
    this.clearBlock()

    const beforeBlock = _.cloneDeep(this.block)
    const copy = new Array(this.block)
    // 回転処理
    for (let row = 0; row < TETRO_SIZE; row++) {
      for (let col = 0; col < TETRO_SIZE; col++) {
          this.block[row][col] = beforeBlock[3-col][row]
        }
      }

    if (this.isHit()) {
      this.block = beforeBlock
    }
  }

  // 行の削除処理
  deleteLine () {
    for (let row=1; row < BLOCK_ROWS-2; row++) {
      let count = 0
      for (let col = 0; col < BLOCK_COLS; col++) {
          if (this.stage[row][col] !== 0){
              count++
            }
          if(count > BLOCK_COLS-1){
            for (let v = row - 1; v > 0; v--) { // その行より上を
              for (let col = 0; col < BLOCK_COLS; col++) {
                this.stage[v + 1][col] = this.stage[v][col];
            }
          }
        }
      }
    }
  }

  gameOver () {
    for(let row = 0; row < BLOCK_ROWS; row++){
      for(let col = 0; col < BLOCK_COLS; col++){
        if(this.stage[row][col] && this.stage[row][col] != WALL){
          console.log("GAMEOVER!!!!");
          this.cxt.fillStyle = BLOCK_COLOR
          this.cxt.fillRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE -1, BLOCK_SIZE - 1)
        }
      }
    }
  }





}
