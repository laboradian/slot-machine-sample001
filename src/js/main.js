/* global */
import '../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import 'babel-polyfill'

//import _ from 'lodash'

// index.html ファイルをコピーする
require('file-loader?name=../../dist/[name].[ext]!../index.html');

console.log('%c 🌈 Laboradian.com 🌈 %c http://laboradian.com ',
  'background: #2383BF; color: #fff; font-size: 1.4em;',
  'background: #e3e3e3; color: #000; margin-bottom: 1px; padding-top: 4px; padding-bottom: 1px;');


// 回転する要素数
const NUM = 7;
// 回転する要素の高さ
const HEIGHT = 50;
// 画面に表示する要素数
const SHOW_MAX = 5;
// 要素の配列
const elements = [];
// requestAnimationFrame の戻り値
let reqId;
let speed = 10;

window.onload = () => {
  let i, elm;
  for (i=0; i<NUM; i++) {
    elm = document.getElementById(`card${i}`);
    elm.style.top = `${HEIGHT * i}px`;
    elements.push(elm);
  }
};

//---------------
// スピード調整
//---------------
document.querySelector('#speedRange').addEventListener('change', (e) => {
  // 1から20になる
  speed = Math.abs(e.currentTarget.value - 20);
});

//---------------
// 回転スタート
//---------------
document.querySelector('#btnStart').addEventListener('click', () => {
  let cnt = 0;
  let idx_1st = 0; // 1st index of elements to show

  const step = (/*timestamp*/) => {
    let i, idx, elm;

    if (cnt % speed === 0) {

      // 一旦、全ての要素を非表示にする
      elements.forEach( (elm) => {
        elm.style.display = 'none';
      });

      // 表示する要素のみ、上から順番に表示されるように位置を設定していく
      for (i=0; i<SHOW_MAX; i++) {
        idx = idx_1st + i;
        if (idx >= elements.length) {
          idx -= elements.length;
        }
        elm = elements[idx];
        elm.style.top = `${HEIGHT * i}px`;
        // 1つ目の表示要素のみ、上枠線を表示する
        if (i === 0) {
          elm.style.borderTop = 'solid 1px #e3e3e3';
        } else {
          elm.style.borderTop = 'none';
        }
        elm.style.display = 'block'; // 表示する
      }

      // 次回、1つ目として表示する要素のインデックス番号を設定する
      if (idx_1st == (elements.length - 1)) {
        idx_1st = 0;
      } else {
        idx_1st++;
      }
    }
    cnt++;
    reqId = window.requestAnimationFrame(step);
  };

  reqId = window.requestAnimationFrame(step);

  document.querySelector('#btnStop').style.display = 'inline-block';
  document.querySelector('#btnStart').style.display = 'none';

});

//---------------
// 回転ストップ
//---------------
document.querySelector('#btnStop').addEventListener('click', () => {
  window.cancelAnimationFrame(reqId);
  document.querySelector('#btnStop').style.display = 'none';
  document.querySelector('#btnStart').style.display = 'inline-block';
});
