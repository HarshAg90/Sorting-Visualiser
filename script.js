// use alert to tell user if they didn't select sorting method

// selecting speed and range cus they_re sliders
const speed = document.querySelector("#speed");
const range = document.querySelector("#range");
const sorting_div = document.querySelector(".sorting_arr"); //where array goes
var sort_way = 0;         // method of sorting
var random_Arr = [];      // random generated array

speed.addEventListener("input", function () {
  document.querySelector("#speed_text").innerText = `speed: ${speed.value}`;
});        // updating speed UI realtime

range.addEventListener("input", function () {
  document.querySelector("#range_text").innerText = `range: ${range.value}`;
});       // updating range UI realtime

async function creating_list() {
  sorting_div.innerHTML = ""; // clearing so that multiple list doesn't add up
  random_Arr = [];            // clearing array
  for (let i = 0; i <= range.value; i++) {
    // hight random WRT div's height
    let height = Math.floor(Math.random() * (sorting_div.clientHeight - 20));   
    // dinamicaly changing width
    let width = Math.floor(sorting_div.clientWidth / range.value - 15);         
    random_Arr.push(height);  //pushing height in array

    //creating div for that height
    const element_div = document.createElement("DIV");
    element_div.classList.add("arr_element");
    element_div.style.height = `${height}px`;
    element_div.style.width = `${width}px`;
    //adding that div to parent div
    sorting_div.appendChild(element_div);
    await new Promise(r => setTimeout(r, 200/speed.value));
  }
}

function sorting_method(button) {
  if(document.querySelector(".active_btn")){
    document.querySelector(".active_btn").classList.toggle("active_btn");
  }
  if (button == 1) {
    document.querySelector(".bubble").classList.toggle("active_btn");
    sort_way = 1;
  } else if (button == 2) {
    document.querySelector(".selection").classList.toggle("active_btn");
    sort_way = 2;
  } else if (button == 3) {
    document.querySelector(".insertion").classList.toggle("active_btn");
    sort_way = 3;
  } else if (button == 4) {
    document.querySelector(".quick").classList.toggle("active_btn");
    sort_way = 4;
  } else {
    document.querySelector(".merge").classList.toggle("active_btn");
    sort_way = 5;
  }
}
var runnin= false;
function Sort_btn_func() {
  if(!runnin){
    document.querySelector(".flag").innerText = "Stop";
    switch (sort_way) {
      case 1:
        Bubble_sort();
        runnin = true;
      case 2:
        selection_sort();
        runnin = true;
      case 3:
        insertion_sort();
        runnin = true;
    }
  }else{
    runnin = false;
    document.querySelector(".flag").innerText = "Start";
  }
  
}

async function Bubble_sort() {
  var element_list = document.querySelectorAll(".arr_element");
  let f1 = true;
  let f2 = true;
  while (f1) {
    f1 = false;
    for (let i = 0; i < random_Arr.length-1; i++) {
      element_list[i].style.background= "rgb(107, 233, 107)";
      element_list[i+1].style.background = "rgb(107, 233, 107)";
      let X = random_Arr[i];
      let Y = random_Arr[i+1];
      await new Promise(r => setTimeout(r, 800/speed.value));
          
      if (X>Y){
        element_list[i].style.background= "rgb(255, 78, 78)";
        element_list[i+1].style.background = "rgb(255, 78, 78)";
        await new Promise(r => setTimeout(r,1200/speed.value));
        element_list[i].style.height = `${random_Arr[i+1]}px`;
        element_list[i+1].style.height = `${random_Arr[i]}px`;
        random_Arr[i+1] = X;
        random_Arr[i] = Y;
        f2 = true;
      }
      element_list[i].style.background = "#fff";
      element_list[i+1].style.background = "#fff";
    }
    if (!runnin){
      break;
    }
    if (f2){
      f1=true;
      f2=false;
    }else{
      Sort_btn_func();
    }
  }
}

async function selection_sort(){
  var element_list = document.querySelectorAll(".arr_element");
  for (let i =0; i<element_list.length-1;i++){
    element_list[i].style.background= "rgb(255, 78, 78)";
    let X = random_Arr[i];
    let smallest_element = i;
    for (let j = i+1; j<element_list.length;j++){
      element_list[j].style.background = "rgb(107, 233, 107)";
      await new Promise(r => setTimeout(r, 800/speed.value));
      if (random_Arr[j]<random_Arr[smallest_element]){
        smallest_element = j;
      }if (!runnin){
        break;
      }
      element_list[j].style.background ="#fff";
    }
    element_list[smallest_element].style.background = "rgb(255, 78, 78)";
    let Y = random_Arr[smallest_element];
    await new Promise(r => setTimeout(r,1200/speed.value));
    element_list[i].style.height = `${Y}px`;
    element_list[smallest_element].style.height = `${X}px`;
    random_Arr[i] = Y;
    random_Arr[smallest_element] = X;
    element_list[i].style.background = "#fff";
    element_list[smallest_element].style.background = "#fff";
    if (!runnin){
      break;
    }
  }
  if(runnin){
    Sort_btn_func();
  }
}

async function insertion_sort(){
  var element_list = document.querySelectorAll(".arr_element");
  for (let i =1; i<element_list.length-1;i++){
    element_list[i].style.background= "rgb(255, 78, 78)";
    var found = false;
    var temp;
    for (let j =0; j< random_Arr.length;j++){
      if(i==j){
        continue;
      }
      element_list[j].style.background = "rgb(73, 213, 255)";

      await new Promise(r => setTimeout(r, 400/speed.value));

      if (random_Arr[i]<random_Arr[j] && found==false){
        element_list[j].style.background= "rgb(255, 78, 78)";

        temp = random_Arr[j];
        element_list[j].style.height = `${random_Arr[i]}px`;
        await new Promise(r => setTimeout(r,1200/speed.value));
        random_Arr[j] = random_Arr[i];
        found= true;

        //changing color back
        element_list[i].style.background= "#fff";
        element_list[j].style.background= "#fff";
        continue
      }

      if(found){ 
        element_list[j].style.background= "rgb(255, 78, 78)";

        element_list[j].style.height = `${temp}px`;
        let temp2 = random_Arr[j];
        random_Arr[j] = temp;
        temp = temp2;
        await new Promise(r => setTimeout(r, 800/speed.value));
        element_list[j].style.background= "#fff";
      }
      if(i == element_list.length-2){
        found = false;
      }
      element_list[j].style.background = "#fff";
      if (!runnin){
        break;
      }
    }
  }
  if(runnin){
    Sort_btn_func();
  }
}