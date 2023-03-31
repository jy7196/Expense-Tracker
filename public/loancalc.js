

function loancalc(){
    var loanamount = Number(document.getElementById("amount").value);
    var down = Number(document.getElementById("down").value);
    var interest = Number(document.getElementById("interest").value);
    var time = Number(document.getElementById("time").value);
    var timetype = document.getElementById("timetype").value;
    var calculate = true;
    console.log(document.getElementById("amount").value);
    if (document.getElementById("amount").value == ""){
        document.getElementById("amount").className="req";
        document.getElementById("result").innerHTML = "Please fill out required fields";
        calculate = false;
    }
    else{
        document.getElementById("amount").className="textbox";   
    }
    if (document.getElementById("down").value == ""){
        document.getElementById("down").className="req";
        document.getElementById("result").innerHTML = "Please fill out required fields";
        calculate = false;

    }
    else{
        document.getElementById("down").className="textbox";   
    }
    if (document.getElementById("interest").value == ""){
        document.getElementById("interest").className="req";
        document.getElementById("result").innerHTML = "Please fill out required fields";
        calculate = false;

    }
    else{
        document.getElementById("interest").className="textbox";   
    }
    if (document.getElementById("time").value == ""){
        document.getElementById("time").className="req";
        document.getElementById("result").innerHTML = "Please fill out required fields";
        calculate = false;

    }
    else{
        document.getElementById("time").className="textbox";   
    }

    if (loanamount < 0 || down < 0 || interest < 0 || time < 0){
        document.getElementById("result").innerHTML = "Please enter valid values";
        calculate = false;

    }
    if(calculate){
        loanamount -= down;
        interest *= 0.01;
        console.log(timetype);
        if (timetype == "years"){
            time*=12;
        }
        var r = interest/12;
        var n = 12;
        var p = loanamount;
        var t = time;
        console.log("Principal " + p);
        console.log("Rate " + r);
        console.log("num payments " + t);
        console.log("pmts per year " + n);

        var monthlypayment = p * ((r*(1+r)**t)/ (((1+r)**t)-1));
        document.getElementById("result").innerHTML = "Monthly Payment: " + monthlypayment.toFixed(2);



    }
}


document.getElementById("calcbutton").addEventListener("click", loancalc);