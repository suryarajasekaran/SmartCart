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
            //console.log(dataset);
            var list = document.getElementById('list');
            list.innerHTML = ""
            for(var i = 0; i < dataset.length; i++) {

                productData = getProductInfo(dataset[i].product_id)[0]
                var li = document.createElement('tr');


                var slNo = document.createElement('span');
                slNo.className = ('slNo')
                slNo.innerHTML = i+1;
                li.appendChild(slNo)

                //Image
                var productImg = document.createElement('td');
                var pImg = document.createElement('img')
                pImg.setAttribute('src', productData.image);
                pImg.setAttribute('alt', productData.name);
                pImg.setAttribute('height', "40px");
                pImg.setAttribute('weight', "40px");
                productImg.appendChild(pImg);
                li.appendChild(productImg);

                 //name
                var productName = document.createElement('td');
                productName.innerHTML = productData.name ;
                li.appendChild(productName);

                //timestamp
                var timestamp = document.createElement('td');
                var d = new Date(dataset[i].timestamp['$date'])
                var n = d.toLocaleString();
                timestamp.innerHTML = n;
                li.appendChild(timestamp);

                //Proce
                var price = document.createElement('td');
                price.innerHTML = productData.price ;
                li.appendChild(price)

                //amazon
                var amazonImg = document.createElement('td');
                var aImg = document.createElement('img')
                aImg.setAttribute('src', '/static/images/amazon.png');
                aImg.setAttribute('alt', productData.name);
                aImg.setAttribute('onclick', "imageClick('"+productData.amazon_buy_link+"')");
                aImg.setAttribute('height', "20px");
                aImg.setAttribute('weight', "20px");
                amazonImg.appendChild(aImg);
                li.appendChild(amazonImg);

                //walmart
                var walmartImg = document.createElement('td');
                var wImg = document.createElement('img')
                wImg.setAttribute('src', '/static/images/walmart.png');
                wImg.setAttribute('alt', productData.name);
                wImg.setAttribute('onclick', "imageClick('"+productData.walmart_buy_link+"')");
                wImg.setAttribute('height', "20px");
                wImg.setAttribute('weight', "20px");
                walmartImg.appendChild(wImg);
                li.appendChild(walmartImg);

                //delete cause bought
                var bought = document.createElement("BUTTON");
                 bought.setAttribute("id", "bought");
                 bought.setAttribute("class", "btn btn-success");
                 //var dateepoc = new Date();
                 //console.log("epock time datenow"+dateepoc)
                 //var epoch_time1 = dateepoc.getTime();
                 //console.log("epock time 1 "+epoch_time1)
                 bought.setAttribute('onclick', "updateProductStatus('"+dataset[i].product_id+"','bought')");
                 var optionbought = document.createElement('option')
                    optionbought.innerHTML = "Bought"
                    bought.appendChild(optionbought);
                li.appendChild(bought);
                onclick

                //console.log(li)

                //stop sensing
                 var stopsensing = document.createElement("BUTTON");
                  stopsensing.setAttribute("id", "Stop Sensing");
                  stopsensing.setAttribute("class", "btn btn-danger");
                    var dateepoc2 = new Date();
                  var epoch_time2 = dateepoc2.getTime();
                   stopsensing.setAttribute('onclick', "updateProductStatus('"+dataset[i].product_id+"','remove')");

                   var optionstop = document.createElement('option')
                    optionstop.innerHTML = "Remove"
                    stopsensing.appendChild(optionstop);
                li.appendChild(stopsensing);


                //auto or manual
                var sensorType = document.createElement('td');
                sensorType.innerHTML = (dataset[i].sensor_type);
                li.appendChild(sensorType)

                //sensor id
                var sensorId = document.createElement('td');
                sensorId.innerHTML = dataset[i].sensor_id;
                li.appendChild(sensorId);

                //rasberry id
                var clientId = document.createElement('td');
                clientId.innerHTML = dataset[i].client_id;
                li.appendChild(clientId);



                list.appendChild(li);
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
           //console.log(dataset);
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

//delay
function updateProductStatus(productId, status) {
    var dataset;
    $.ajax({
        url: 'http://ec2-54-183-133-199.us-west-1.compute.amazonaws.com:8881/list',
        type: "PUT",
        dataType: "json",
        async: false,
        data: '{"query_filter" : {"product_id": "'+productId+'", "state": "active"}, "list_update_data" : {"state": "'+status+'"}}',

        //contentType: "application/json; charset=utf-8",
        xhrFields: {
                       withCredentials: true
                    },
        crossDomain: true,
        cache: false,
        success: function (result) {
            dataset = result;
            //console.log("time of stop func "+timeofstop);
           //console.log(dataset);
        },
        error: function () {
            console.log("getList.js error for product "+productId);
        }
    });
    getList();
    return dataset;
}



