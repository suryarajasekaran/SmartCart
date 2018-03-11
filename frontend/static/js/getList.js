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
                //dataset[i].sensor_id;
                //dataset[i].product_id;
                //dataset[i].timestamp;
                //dataset[i].sensor_type;
                //dataset[i].client_id;
                var li = document.createElement('li');
                li.className = ('row')

                var productImg = document.createElement('img')
                productImg.setAttribute('src', productData.image);
                productImg.setAttribute('alt', productData.name);
                productImg.setAttribute('height', "40px");
                productImg.setAttribute('width', "40px");
                li.appendChild(productImg)

                var slNo = document.createElement('span');
                slNo.className = ('quantity')
                slNo.innerHTML = i+1;
                li.appendChild(slNo)

                var productId = document.createElement('span');
                productId.className = ('itemName')
                productId.innerHTML = productData.name;
                li.appendChild(productId)

                var options = document.createElement('span');
                options.className = ('popbtn')
                options.innerHTML = '<a class="arrow"></a>'
                li.appendChild(options)

                var sensorType = document.createElement('span');
                sensorType.className = ('price')
                sensorType.innerHTML = dataset[i].sensor_type;
                li.appendChild(sensorType)

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