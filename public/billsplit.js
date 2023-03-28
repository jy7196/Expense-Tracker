function billsplit(){
    let bill = Number(document.getElementById("bill").value);
    let tip = Number(document.getElementById("tip").value)*0.01;
    tip *= bill;
    let numpeople = Number(document.getElementById("numpeople").value);
    let total = ((bill+tip)/numpeople).toFixed(2);
    console.log(total);
    if(tip < 0 || bill < 0 || numpeople <= 0){
        document.getElementById("result").innerHTML = "Please enter valid values";
    }
    else{
        document.getElementById("result").innerHTML = "Each person pays: " + total.toString();
    }
}
document.getElementById("splitbutton").addEventListener("click", billsplit)
