class Employee {
    /**
     * Hàm khởi tạo
     * Gồm 1 id của bảng muốn vẽ
     * CreatedBy VMHieu 30/07/2022
     */
    constructor(tableID) {
        let me = this;

        me.table = $(`#${tableID}`);

        // Khởi tạo sự kiện cho table
        me.initEvents();

        // Lấy ra cấu hình các cột
        me.columnConfig = me.getColumnConfig();

        // Vẽ table khi chưa có data
        me.renderTable();

        // Call api lấy data 
        me.getData();

        // Khởi tạo form detail
        me.initFromDetail();
    }

    initEvents() {
        let me = this;

        // Khởi tạo sự kiện cho toolbar
        me.initEventsToolbar();
    }

    initFromDetail() {
        let me = this;

        me.formDetail = new EmployeeDetail("EmployeeDetail");
    }

    /**
     * Hàm khởi tạo sự kiện cho toolbar
     * CreatedBy VMHieu 31/07/2022
     */
    initEventsToolbar() {
        let me = this,
            toolbarId = me.table.attr("Toolbar");

        // Khởi tạo sự kiện cho các button trên toolbar
        $(`.${toolbarId}`).off("click");
        $(`.${toolbarId}`).on("click", function () {
            let commandType = $(this).attr("CommandType");

            // Gọi hàm commandType tương ứng
            if (me[commandType] && typeof me[commandType] == "function") {
                me[commandType]();
            }
        })
    }

    add() {
        let me = this,
            param = {
                parent: me,
                formMode: Enumeration.FormMode.Add
            };

        if (me.formDetail) {
            me.formDetail.open(param);
        }
    }

    /**
     * Hàm lấy dữ liệu 
     * CreatedBy VMHieu 30/07/2022
     */
    getData() {
        let me = this,
            url = me.table.attr("Url");

        $('body').append('<div id="over"></div>');
        $('body').append('<div class="loader"></div>');
        $('#over').fadeIn(300);

        setTimeout(() => {
            $("#over").remove();
            $(".loader").remove();
        }, 2000);

        // api lấy tất cả employee
        CommonFn.Ajax(url, Resource.Method.Get, {}, function (response) {
            if (response) {
                $("#over").remove();
                $(".loader").remove();
                me.loadData(response);
            } else {
                console.log("Có lỗi khi lấy dữ liệu từ server");
            }
        });
    }

    /**
     * Hàm load data
     * CreatedBy VMHieu 31/07/2022
     */
    loadData(data) {
        let me = this;

        if (data) {
            // Vẽ table
            me.renderTable(data);
            // Lấy tổng số bản ghi 
            me.getTotal(data);
        }
    }

    /**
     * Lưu lại cấu hình các cột
     * CreatedBy VMHieu 31/07/2022
     */
    getColumnConfig() {
        let me = this,
            columnDefault = {
                FieldName: '',
                DataType: 'String',
                EnumName: '',
                Text: ''
            },
            columns = [];

        // Duyệt từng cột để vẽ table
        me.table.find(".col").each(function () {
            let column = {
                    ...columnDefault
                },
                that = $(this);

            Object.keys(columnDefault).filter(function (propName) {
                let value = that.attr(propName);

                if (value) {
                    column[propName] = value;
                }

                column.Text = that.text();
            });
            columns.push(column);
        })

        return columns;
    }

    renderTable(data) {
        let me = this,
            table = $('<table></table>'),
            thead = me.renderThead(),
            tbody = me.renderTbody(data);

        table.append(thead);
        table.append(tbody);

        // me.table.html(table);

        me.table.find("table").remove();
        me.table.append(table);

        // Làm một số thứ sau khi binding xong
        me.afterBinding();
    }

    renderThead() {
        let me = this,
            thead = $('<thead></thead>'),
            tr = $('<tr></tr>');

        me.columnConfig.filter(function (column) {
            let text = column.Text,
                dataType = column.DataType,
                className = me.getClassFormat(dataType),
                th = $('<th></th>');

            if (dataType == 'Checkbox') {
                let check = $('<input type="checkbox" class="th-checkbox" />');
                th.append(check);
                th.addClass(className);
            } else {
                th.append(text);
                th.addClass(className);
            }

            tr.append(th);
        })

        thead.append(tr);
        return thead;
    }

    renderTbody(data) {
        let me = this,
            tbody = $('<tbody></tbody>');

        if (data) {
            data.filter(function (item) {
                let tr = $("<tr></tr>");

                // Duyệt từng cột để vẽ body
                me.table.find('.col').each(function () {
                    let fieldName = $(this).attr('FieldName'),
                        column = $(this),
                        dataType = $(this).attr('DataType'),
                        value = me.getValueCell(item, fieldName, dataType, column),
                        className = me.getClassFormat(dataType),
                        td = $('<td></td>');


                    if (dataType == 'Checkbox') {
                        let check = $('<input type="checkbox" class="td-checkbox"/>');
                        td.append(check);
                        td.addClass(className);
                    } else if (dataType == 'task') {
                        let task = $(
                            '<div>' +
                            '<button class="table-btn__edit">Sửa</button>' +
                            '<button class="table-btn__arrow">' +
                            '<div class="btn-arrow__icon"></div>' +
                            '</button>' +
                            '</div>'
                        )

                        td.append(task);
                        td.addClass(className);
                    } else {
                        td.text(value);
                        td.addClass(className);
                    }

                    tr.append(td);
                })
                tr.data("data", item); // data chứa dữ liệu của từng hàng phục vụ cho việc lấy data khi edit nhân viên

                tbody.append(tr);
            })
        }
        return tbody;
    }

    getTotal(data) {
        let me = this;

        $(".paging-left").text(`Tổng số: ${data.length} bản ghi`);
    }

    /**
     * Lấy giá trị ô
     * CreatedBy VMHieu 14/07/2022
     */
    getValueCell(item, fieldName, dataType, column) {
        let me = this,
            value = item[fieldName];

        switch (dataType) {
            case Resource.DataTypeColumn.Number:
                value = CommonFn.formatMoney(value);
                break;
            case Resource.DataTypeColumn.Date:
                value = CommonFn.formatDate(value);
                break;
            case Resource.DataTypeColumn.Enum:
                let enumName = column.attr("EnumName");
                value = CommonFn.getValueEnum(value, enumName);
                break;
        }

        return value;
    }

    /**
     * Xử lý một số thứ sau khi binding xong
     * CreatedBy VMHieu 30/07/2022
     */
    afterBinding() {
        let me = this;

        // Lấy Id để phân biệt các bản ghi
        me.ItemId = me.table.attr("ItemId");
        me.ItemCode = me.table.attr("ItemCode");

        // Mặc định chọn dòng đầu tiên
        me.table.find("tbody tr").eq(0).addClass("selectedRow");
    }

    /**
     * Hàm dùng để lấy class format cho từng kiểu dữ liệu
     * CreatedBy VMHieu 30/07/2022
     */
    getClassFormat(dataType) {
        let className = "";

        switch (dataType) {
            case Resource.DataTypeColumn.Number:
                className = "align-right";
                break;
            case Resource.DataTypeColumn.Date:
                className = "align-center";
                break;
                // case Resource.DataTypeColumn.STT:
                //     className = "align-right";
                //     break;
            case "space-left":
                className = "space-left";
                break;
            case "space-right":
                className = "space-right";
                break;
            case "Checkbox":
                className = "checkbox";
                break;
            case "task":
                className = "task";
                break;
        }

        return className;
    }
}

var employeeTable = new Employee("EmployeeTable");