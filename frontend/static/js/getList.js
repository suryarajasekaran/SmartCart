getList()
setInterval(function() {
    getList()
}, 1000 * 60 * 1); // where X is your every X minutes

function getList() {
    $.ajax({
        url: 'http://ec2-54-183-133-199.us-west-1.compute.amazonaws.com:8881/list?state=active',
        type: "GET",
        dataType: "json",
        data: {
        },
        //contentType: "application/json; charset=utf-8",
        xhrFields: {
                       withCredentials: true
                    },
        crossDomain: true,
        cache: false,
        success: function (result) {

            var dataset = result;
            console.log(dataset);
            var list = document.getElementById('list');
            list.innerHTML = ""
            for(var i = 0; i < dataset.length; i++) {

                productData = getProductInfo(dataset[i].product_id)[0]
                var li = document.createElement('li');
                li.className = ('row')

                 /*Arrow
                 var arrow = document.createElement('span');
                 arrow.className = ('popbtn')
                 var arrowbutton = document.createElement('a');
                 arrowbutton.className = ('arrow')
                 arrow.appendChild(arrowbutton);
                 li.appendChild(arrow);*/

                //Image
                var productImg = document.createElement('span');
                productImg.className = ('productImg')
                var pImg = document.createElement('img')
                pImg.setAttribute('src', productData.image);
                pImg.setAttribute('alt', productData.name);
                pImg.setAttribute('height', "40px");
                pImg.setAttribute('weight', "40px");
                productImg.appendChild(pImg);
                li.appendChild(productImg);

                /*var slNo = document.createElement('span');
                slNo.className = ('slNo')
                slNo.innerHTML = i+1;
                li.appendChild(slNo)*/

                 //name
                var productName = document.createElement('span');
                productName.className = ('productName')
                productName.innerHTML = "   "+ productData.name ;
                li.appendChild(productName);

                //timestamp
                var timestamp = document.createElement('span');
                timestamp.className = ('timestamp')
                //dataset[i].timestamp.date;
                var d = new Date(dataset[i].timestamp['$date'])
                var n = d.toLocaleString();
                timestamp.innerHTML = "<br>Added on: "+ n;
                //timestamp.innerHTML =  + dataset[i].timestamp.date;
                li.appendChild(timestamp);

                //auto or manual
                var sensorType = document.createElement('span');
                sensorType.className = ('sensorType')
                sensorType.innerHTML = (dataset[i].sensor_type);
                li.appendChild(sensorType)



                /*sensor id
                var sensorId = document.createElement('span');
                sensorId.className = ('sensorId')
                sensorId.innerHTML = "Sensor name : "+String(dataset[i].sensor_id);
                li.appendChild(sensorId);

                //rasberry id
                var clientId = document.createElement('span');
                clientId.className = ('clientId')
                clientId.innerHTML = "<br> <br>Client name : "+String(dataset[i].client_id);
                li.appendChild(clientId);*/

            /* var options = document.createElement('div');
                div.className = ('popover')
                li.appendChild(div)*/


              /*var div = document.createElement('div');
                //div.setAttribute('class', 'popover');
                div.setAttribute("id", "popover");
                div.setAttribute("style", "display: none");
               //document.getElementById("blockOfStuff").style.display = "none";
                div.innerHTML = " <a id = 'bought'> Bought <span class='glyphicon glyphicon-pencil'></span> </a> <a id = 'delete'>Delete<span class='glyphicon glyphicon-remove'></span> </a>"
    //document.getElementById('blockOfStuff').innerHTML;
                li.appendChild(div);
                console.log(div) */

                //amazon
                var amazonImg = document.createElement('img')
                amazonImg.setAttribute('src', '/static/images/amazon.png');
                amazonImg.setAttribute('alt', productData.name);
                amazonImg.setAttribute('onclick', "imageClick('"+productData.amazon_buy_link+"')");
                amazonImg.setAttribute('height', "20px");
                amazonImg.setAttribute('weight', "20px");
                console.log(productData.amazon_buy_link)
                li.appendChild(amazonImg);

                //walmart
                var walmartImg = document.createElement('img')
                walmartImg.setAttribute('src', '/static/images/walmart.png');
                walmartImg.setAttribute('alt', productData.name);
                walmartImg.setAttribute('onclick', "imageClick('"+productData.walmart_buy_link+"')");
                console.log(productData.walmart_buy_link)
                walmartImg.setAttribute('height', "20px");
                walmartImg.setAttribute('weight', "20px");
                li.appendChild(walmartImg);

                list.appendChild(li)

                var todo = document.createElement('select');
                todo.setAttribute("id", "select");
                var optionselect = document.createElement('option')
                optionselect.innerHTML = "--Select--"

                var option1 = document.createElement('option')
                option1.innerHTML = "Bought"

                var option2 = document.createElement('option')
                    option2.innerHTML = "Stop"

                todo.appendChild(optionselect);
                todo.appendChild(option1);
                todo.appendChild(option2);
                li.appendChild(todo);

                var btn = document.createElement("BUTTON");
                btn.setAttribute("id", "submit");
                var optionbutton = document.createElement('option')
                    optionbutton.innerHTML = "Submit"
                   btn.appendChild(optionbutton);
                //document.body.appendChild(btn);
                  li.appendChild(btn);
                  console.log(todo);
                  submitvalue(todo)



 //document.getElementById("submit").onclick =
               function submitvalue(Submitvalue) {
                var Submitvalue=Submitvalue;
                console.log(Submitvalue)

                var history = document.getElementById("select").value;
                var deletesensing = document.getElementById("select").value;
                    //console.log(history)
                    //console.log(deletesensing)

        if (history =='Bought')
       {
           //add to hostory table

        }

        else if (deletesensing =='')
        {
            //delete sensor
        }


        history.value="";
        deletesensing.value="";

                 }





        }

        },

        error: function () {
            console.log("getList.js error for list");
        }
    });
}

function getProductInfo(productId) {
    var dataset;
    $.ajax({
        url: 'http://ec2-54-183-133-199.us-west-1.compute.amazonaws.com:8881/product?product_id='+productId,
        type: "GET",
        dataType: "json",
        async: false,
        data: {
        },
        //contentType: "application/json; charset=utf-8",
        xhrFields: {
                       withCredentials: true
                    },
        crossDomain: true,
        cache: false,
        success: function (result) {
            dataset = result;
            console.log(dataset);
        },
        error: function () {
            console.log("getList.js error for product "+productId);
        }
    });
    return dataset;
}

function imageClick(url) {
    window.open(url, "_blank");
}