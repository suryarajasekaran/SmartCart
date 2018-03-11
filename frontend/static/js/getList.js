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

                var productImg = document.createElement('span');
                productImg.className = ('productImg')
                var pImg = document.createElement('img')
                pImg.setAttribute('src', productData.image);
                pImg.setAttribute('alt', productData.name);
                pImg.setAttribute('height', "40px");
                pImg.setAttribute('weight', "40px");
                productImg.appendChild(pImg);
                li.appendChild(productImg);

                var slNo = document.createElement('span');
                slNo.className = ('slNo')
                slNo.innerHTML = i+1;
                li.appendChild(slNo)

                var productName = document.createElement('span');
                productName.className = ('productName')
                productName.innerHTML = productData.name;
                li.appendChild(productName);

                var sensorId = document.createElement('span');
                sensorId.className = ('sensorId')
                sensorId.innerHTML = dataset[i].sensor_id;
                li.appendChild(sensorId);

                /*var timestamp = document.createElement('span');
                timestamp.className = ('timestamp')
                timestamp.innerHTML = dataset[i].timestamp;
                li.appendChild(timestamp);*/

                var clientId = document.createElement('span');
                clientId.className = ('clientId')
                clientId.innerHTML = dataset[i].client_id;
                li.appendChild(clientId);

                var options = document.createElement('span');
                options.className = ('popbtn')
                options.innerHTML = '<a class="arrow"></a>'
                li.appendChild(options)

                var sensorType = document.createElement('span');
                sensorType.className = ('sensorType')
                sensorType.innerHTML = dataset[i].sensor_type;
                li.appendChild(sensorType)

                var amazonImg = document.createElement('img')
                amazonImg.setAttribute('src', '/static/images/amazon.png');
                amazonImg.setAttribute('alt', productData.name);
                amazonImg.setAttribute('onclick', "imageClick('"+productData.amazon_buy_link+"')");
                amazonImg.setAttribute('height', "20px");
                amazonImg.setAttribute('weight', "20px");
                li.appendChild(amazonImg);

                var walmartImg = document.createElement('img')
                walmartImg.setAttribute('src', '/static/images/walmart.png');
                walmartImg.setAttribute('alt', productData.name);
                walmartImg.setAttribute('onclick', "imageClick('"+productData.walmart_buy_link+"')");
                walmartImg.setAttribute('height', "20px");
                walmartImg.setAttribute('weight', "20px");
                li.appendChild(walmartImg);

                list.appendChild(li)
            };
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