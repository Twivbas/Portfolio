const cssString = `
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

.doraemon {
  width: 300px;
  margin: 172px auto auto;
  position: relative;
}

@media (max-width: 400px) {
  .doraemon {
    width: 300px;
    margin-top: 172px;
    margin-left: calc(50vw - 135px);
    position: relative;
  }
}

.doraemon .head {
  width: 260px;
  height: 240px;
  border-radius: 120px;
  border: #555 2px solid;
  box-shadow: -5px 10px 15px rgba(0, 0, 0, 0.45);
  position: relative;
  background: -webkit-radial-gradient(right top, #fff 10%,
  #07bbee 20%, #10a6ce 75%, #000);
}

.doraemon .face {
  position: relative;
  z-index: 2;
}

.doraemon .face .white {
  border: #000 2px solid;
  width: 205px;
  height: 147px;
  border-radius: 120px 120px;
  background-color: #fff;
  position: absolute;
  top: 65px;
  left: 26px;
}

.doraemon .face .nose {
  width: 24px;
  height: 24px;
  background-color: #C93300;
  border-radius: 24px;
  position: absolute;
  top: 110px;
  left: 122px;
  z-index: 3;
}

.doraemon .face .nose .light {
  height: 10px;
  width: 10px;
  box-shadow: 19px 10px 5px #fff;
  border-radius: 5px;
}

.doraemon .face .nose_line {
  width: 3px;
  height: 68px;
  background-color: #333;
  position: absolute;
  top: 134px;
  left: 133px;
  z-index: 3;
}

.doraemon .face .mouth {
  width: 155px;
  height: 175px;
  border-radius: 90px;
  border-bottom: 3px solid #333;
  position: absolute;
  top: 30px;
  left: 55px;
}

.doraemon .eyes {
  position: relative;
  z-index: 3;
}

.doraemon .eyes .eye {
  width: 61px;
  height: 71px;
  background-color: #fff;
  border: 2px solid #000;
  border-radius: 35px 35px;
  position: absolute;
  top: 35px;
}

.doraemon .eyes .eye .black {
  width: 12px;
  height: 12px;
  background-color: #000;
  border-radius: 12px;
  position: relative;
  top: 35px;
}

.doraemon .eyes .left {
  left: 71px;
}
.doraemon .eyes .right {
  left: 134px;
}
.doraemon .eyes .eye .bleft {
  left: 40px;
}
.doraemon .eyes .eye .bright {
  left: 6px;
}

/*胡须背景，挡住一部分嘴巴*/
.doraemon .whiskers {
  width: 182px;
  height: 69px;
  background-color: #fff;
  border-radius: 13px;
  position: relative;
  top: 103px;
  left: 32px;
  z-index: 2;
}

.doraemon .whiskers .whisker {
  width: 50px;
  height: 2px;
  background-color: #333;
  position: absolute;
  z-index: 2;
}

.doraemon .whiskers .rTop {
  top: 22px;
  left: 142px;
}
.doraemon .whiskers .rt {
  top: 45px;
  left: 142px;
}
.doraemon .whiskers .rBottom {
  top: 65px;
  left: 140px;
}
.doraemon .whiskers .lTop {
  top: 22px;
  left: 0;
}
.doraemon .whiskers .lt {
  top: 45px;
  left: 0;
}
.doraemon .whiskers .lBottom {
  top: 65px;
  left: 0;
}

.doraemon .whiskers .r160 {
  transform: rotate(160deg);
}
.doraemon .whiskers .r20 {
  transform: rotate(20deg);
}

.doraemon .choker {
  width: 196px;
  height: 17px;
  border-radius: 10px;
  border: 2px solid #000000;
  z-index: 4;
  position: relative;
  top: -26px;
  left: 32px;
  background: linear-gradient(to left bottom,#C40, #800400);
}

.doraemon .choker .bell {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border: 2px solid #000;
  background: linear-gradient(to left bottom, #f9f12a, #e9e100);
  box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.25);
  position: relative;
  top: 5px;
  left: 78px;
}

.doraemon .choker .bell_line {
  width: 36px;
  height: 2px;
  background-color: #f9f12a;
  border: 2px solid #333333;
  border-radius: 3px 3px 0 0;
  position: relative;
  top: 10px;
}

.doraemon .choker .bell_circle {
  width: 11px;
  height: 10px;
  background-color: #000;
  border-radius: 5px;
  position: relative;
  top: 14px;
  left: 14px;
}

.doraemon .choker .bell_under {
  width: 3px;
  height: 15px;
  background-color: #000;
  position: relative;
  left: 18px;
  top: 10px;
}

.doraemon .choker .bell_light {
  width: 12px;
  height: 12px;
  border-radius: 10px;
  box-shadow: 19px 8px 5px #fff;
  opacity: 0.7;
  position: relative;
  top: -38px;
  left: 3px;
}

.doraemon .bodys {
  position: relative;
  top: -295px;
}

.doraemon .bodys .body {
  width: 189px;
  height: 142px;
  border: 2px solid #333;
  border-bottom: 0;
  background: linear-gradient( to left , #07beea, #0096be);
  position: absolute;
  top: 265px;
  left: 38px;
}

.doraemon .bodys .wraps {
  width: 146px;
  height: 146px;
  background-color: white;
  border: 2px solid #000;
  border-radius: 73px;
  position: absolute;
  top: 240px;
  left: 60px;
}

.doraemon .bodys .pocket {
  width: 109px;
  height: 112px;
  background-color: #fff;
  border-radius: 56px;
  border: 2px solid #000;
  position: absolute;
  top: 260px;
  left: 78px;
}

.doraemon .bodys .pocket_mask {
  width: 110px;
  height: 64px;
  background-color: #fff;
  border-bottom: 2px solid #000;
  position: relative;
  top: 268px;
  left: 77px;
}

.doraemon .hand_right {
  width: 86px;
  height: 86px;
  position: absolute;
  top: 234px;
  left: 194px;
}

.doraemon .hand_left {
  width: 86px;
  height: 86px;
  position: absolute;
  top: 234px;
  left: -4px;
}

.doraemon .arm {
  width: 80px;
  height: 50px;
  background-color: #07beea;
  border: 1px solid #000000;
  box-shadow: -10px 7px 10px rgba(0, 0, 0, 0.35);
  z-index: -1;
  position: relative;
}

.doraemon .hand_right .arm {
  transform: rotate(50deg);
  top: 15px;
  left: -2px;
}

.doraemon .hand_left .arm {
  background-color: #0096be;
  box-shadow: 5px -7px 10px rgba(0, 0, 0, 0.25);
  top: 14px;
  transform: rotate(130deg);
}

.doraemon .circle {
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 25px;
  border: 2px solid #000;
  position: relative;
}

.doraemon .hand_right .circle {
  top: 0px;
  left: 42px;
}

.doraemon .hand_left .circle {
  top: -1px;
  left: -14.5px;
}

/*手臂和身体结合处*/
.doraemon .arm_rewrite {
  width: 10px;
  background-color: #07beea;
  position: relative;
}

.doraemon .hand_right .arm_rewrite {
  top: -104px;
  left: 23px;
  height: 74px;
}

.doraemon .hand_left .arm_rewrite {
  top: -102px;
  left: 42px;
  background-color: rgb(0, 150, 190);
  height: 74px;
}

.doraemon .foot {
  width: 241px;
  height: 30px;
  position: relative;
  top: -6px;
  left: 8px;
}

.doraemon .foot .left {
  width: 108px;
  height: 26px;
  border: 2px solid #333;
  border-radius: 80px 60px 60px 40px;
  box-shadow: -6px 0 10px rgba(0, 0, 0, 0.35);
  background: -webkit-gradient(linear, right top, left bottom, from(#fff), color-stop(0.75, #fff), color-stop(0.85, #eee), to(#999));
  position: relative;
  top: 54px;
  left: 18px;
}

.doraemon .foot .right {
  width: 108px;
  height: 26px;
  border: 2px solid #333;
  border-radius: 80px 60px 60px 40px;
  box-shadow: -6px 0px 10px rgba(0, 0, 0, 0.35);
  background: -webkit-gradient(linear, right top, left bottom, from(#fff), color-stop(0.85, #eee), to(#999));
  position: relative;
  top: 28px;
  left: 130px;
}

.doraemon .foot .foot_rewrite {
  width: 24px;
  height: 10px;
  border: 2px solid #000;
  border-bottom: none;
  border-top-right-radius: 40px;
  border-top-left-radius: 40px;
  background: -webkit-gradient(linear, right top, left bottom, from(#666), color-stop(0.65, #fff), to(#fff));
  position: relative;
  top: -7px;
  left: 118px;
}

@keyframes eyemove {
  80% { margin:0; }
  85% { margin:-20px 0 0 0; }
  90% { margin:0; }
  93% { margin:0 0 0 7px; }
  96% { margin:0; }
}

.doraemon .eyes .eye .black {
  animation: 2s linear eyemove;
  animation-iteration-count: 5;
}
 `

export default cssString
