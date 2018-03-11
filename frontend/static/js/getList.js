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
                //dataset[i].sensor_id;
                //dataset[i].product_id;
                //dataset[i].timestamp;
                //dataset[i].sensor_type;
                //dataset[i].client_id;
                var li = document.createElement('li');
                li.className = ('row')
                li.innerHTML = '<span class="popbtn"><a class="arrow"></a></span>'

                var slNo = document.createElement('span');
                slNo.className = ('quantity')
                slNo.innerHTML = i+1;
                li.appendChild(slNo)

                var productId = document.createElement('span');
                productId.className = ('itemName')
                productId.innerHTML = dataset[i].product_id;
                li.appendChild(productId)

                var sensorType = document.createElement('span');
                sensorType.className = ('price')
                sensorType.innerHTML = dataset[i].sensor_type;
                li.appendChild(sensorType)



                list.appendChild(li)
            };
            /*
            <li class="row">
                <span class="quantity">1</span>
                <span class="itemName">Birthday Cake</span>
                <span class="popbtn"><a class="arrow"></a></span>
                <span class="price">$49.95</span>
            </li>
            */
        },
        error: function () {
            console.log("getList.js error");
        }
    });
}