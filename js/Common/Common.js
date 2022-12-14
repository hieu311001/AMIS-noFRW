// Các hàm dùng chung toàn chương trình
var CommonFn = CommonFn || {};

// Hàm format số tiền
CommonFn.formatMoney = money => {
    if (money && !isNaN(money)) {
        return money.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
    } else {
        return money;
    }
}


// Format ngày tháng
CommonFn.formatDate = dateSrc => {
    let date = new Date(dateSrc),
        year = date.getFullYear().toString(),
        month = (date.getMonth() + 1).toString().padStart(2, '0'),
        day = date.getDate().toString().padStart(2, '0');

    return `${day}/${month}/${year}`;
}

// Kiểm tra xem có phải dạng date không
CommonFn.isDateFormat = (data) => {
    let regex = new RegExp("([0-9]{4}[/](0[1-9]|1[0-2])[/]([0-2]{1}[0-9]{1}|3[0-1]{1})|([0-2]{1}[0-9]{1}|3[0-1]{1})[/](0[1-9]|1[0-2])[/][0-9]{4})");
    
    return regex.test(data);
}

// Chuẩn hóa date theo ngày tháng năm khi nhập vào
CommonFn.isDateVN = data => {
    let arrTime = data.split("/");
    let value = new Date(arrTime[2], arrTime[1], arrTime[0]);

    return value;
}

// Format ngày tháng
CommonFn.convertDate = dateSrc => {
    let date = new Date(dateSrc),
        year = date.getFullYear().toString(),
        month = (date.getMonth() + 1).toString().padStart(2, '0'),
        day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}


// Lấy giá trị của một enum
CommonFn.getValueEnum = (data, enumName) => {
    let enumeration = Enumeration[enumName],
        resource = Resource[enumName];

    for(prop in enumeration){
        if(enumeration[prop] == data){
            data = resource[prop];
        }
    }
    
    return data;
}


// Chuyển đổi giá trị enum về giá trị trong csdl
CommonFn.getValueEnumBack = (data, resourceName) => {
    let enumeration = Enumeration[resourceName],
        resource = Resource[resourceName];

    for(prop in resource){
        if(resource[prop] == data){
            data = enumeration[prop];
        }
    }

    return data;
}

// Hàm ajax gọi lên server lấy dữ liệu
CommonFn.Ajax = (url, method, data, fnCallBack, async = true) => {
    $.ajax({
        url: url,
        method: method,
        async: async,
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
        crossDomain: true,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            fnCallBack(response);
        },
        error: function (errormessage) {
            console.log(errormessage.responseText);
        }
    })
}