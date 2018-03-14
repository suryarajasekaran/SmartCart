getHistory()
setInterval(function() {
    getHistory()
}, 1000 * 60 * 1); // where X is your every X minutes


function getHistory() {
    $.ajax({
        url: 'http://ec2-54-183-133-199.us-west-1.compute.amazonaws.com:8881/list?state=bought',
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

                li.appendChild(price)

                //auto or manual
                var sensorType = document.createElement('td');
                sensorType.innerHTML = (dataset[i].sensor_type);
                li.appendChild(sensorType)




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