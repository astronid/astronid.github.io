var o = [];		//2D陣列
var data_str = [];	//連續字串(搜尋用)
window.onload = init;
var T = new Date();
timer = setInterval(function() { duration.innerText = "，檢傷時間" + parseInt((new Date()-T)/1000) + "秒" }, 1000);

function run() {
  var temp, count = 0;
  var keyword1=[], keyword2=[];
  var field_name=["級數","創傷/非創傷","年齡","大分類","標準主訴","判定依據"], field_content=[[],[],[],[],[],[]];	//根據o的排列順序
  var t = new Date();

  temp = document.getElementsByClassName("key1");
  for (let i=0; i<temp.length; i++) keyword1.push(temp[i].innerText);
  temp = document.getElementsByClassName("key2");
  for (let i=0; i<temp.length; i++) keyword2.push(temp[i].innerText);

  for (let i=0; i<data_str.length; i++) {
    valid = true;
    for (let j=0; j<keyword1.length; j++) {	//包含關鍵字
      if (data_str[i].indexOf(keyword1[j]) == -1) { valid = false; break; }
    }
    for (let j=0; j<keyword2.length; j++) {	//排除關鍵字
      if (keyword2[j] != "" && data_str[i].indexOf(keyword2[j]) != -1) { valid = false; break; }
    }
    if (valid == false) continue;	//跳出
    count++;

    for (let j=0; j<field_content.length; j++) {	//統計<fieldset>內容
      for (let k=0; k<=field_content[j].length; k++) {
        if (k == field_content[j].length) {
          field_content[j].push( [o[i][j], 1] ); break;
        } else if (field_content[j][k][0] == o[i][j]) {
          field_content[j][k][1] += 1; break;
        }
      }
    }
  }

  for (let j=0; j<field_content.length; j++) {		//寫入<fieldset>
    field_content[j] = field_content[j].sort();
    temp = "<legend>" + field_name[j]  + " [" + field_content[j].length + "]</legend>";
    for (let k=0; k<field_content[j].length; k++) {
      temp += "<div class='item"+ String(j+1) +"' onclick=\"add_key('" + field_content[j][k][0] + "')\">" + field_content[j][k][0] + "<sup>[" + field_content[j][k][1] + "]</sup></div>";
    }
    document.getElementById("field"+String(j+1)).innerHTML = temp;
  }
  msg.innerHTML = "搜尋時間" + parseInt(new Date()-t) + "ms，共找到" + count + "個";
  if (count == 1) card.style.display = "block";
}

function add_key(key_value, key_type) {	//type1=包括, type2=排除
  if (key_value == "") return;
  if (key_type == undefined) key_type = (key_1.checked==true) ? 1 : 2;
  document.getElementById("key_box" + key_type).innerHTML += "<span class='key" + key_type + "' onclick=\"this.remove();run()\">" + key_value + "</span>";
  run();
}





function wizard(i) {	// 開啟快速檢傷
  wiz1.innerHTML = wizard_data[i][0];
  wiz2.innerHTML = "[是]將會 " + wizard_data[i][1] + "<br>[否]將會 " + wizard_data[i][2];
  wiz_btn3.onclick = function() { wizard_data[i][3](); wizard_next() };
  wiz_btn2.onclick = function() { wizard_data[i][4](); wizard_next() };
  wiz_btn1.onclick = function() { wizard_next() };

  function wizard_next() {
    if (i+1 < wizard_data.length) wizard(i+1);
    else wiz.style.display = "none";
  }
}

// Wizard資料
const wizard_data = [
  ["是否為1級", "包括：1級", "排除：1級", function(){ add_key("1級",1) }, function(){ add_key("1級",2) }],
  ["生命徵象是否正常，無發燒，無疼痛不適？", "包括：生命徵象正常", "排除：生命徵象正常", function() { add_key("生命徵象正常",1) }, function() { add_key("生命徵象正常",2) }],
  ["是否有呼吸窘迫情形？（SpO2<=94%）", "包括：呼吸窘迫", "排除：呼吸窘迫", function() { add_key("呼吸窘迫",1) }, function() { add_key("呼吸窘迫",2) }]
];


