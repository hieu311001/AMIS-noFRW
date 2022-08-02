class EmployeeDetail {
    constructor(formId) {
        let me = this;

        me.form = $(`#${formId}`);

        me.initEvents();
    }

    /**
     * Khởi tạo sự kiện cho toolbar
     * CreatedBy VMHieu 14/07/2022
     */
    initEvents() {
        let me = this;

        me.form.find('.toolbar-form [CommandType]').off('click');
        me.form.find('.toolbar-form [CommandType]').on('click', function () {
            let commandType = $(this).attr("CommandType");

            // Gọi đến hàm động 
            if (me[commandType] && typeof me[commandType] == "function") {
                me[commandType]();
            }
        });
    }

    /**
     * Hàm mở form
     * CreatedBy VMHieu 14/07/2022
     */
    open(param) {
        let me = this;

        Object.assign(me, param);

        // Mở form
        me.form.show();

        // Thêm hiệu ứng vô hiệu hóa ngoài form
        $('body').append('<div id="over"></div>');
        $('#over').fadeIn(300);

        // Nếu ở mode thêm thì reset form, đồng thời call api lấy mã code lớn nhất + 1
        // if (param && param.formMode == Enumeration.FormMode.Add) {
        //     CommonFn.Ajax(url, Resource.Method.Get, {}, function (response) {
        //         if (response) {
        //             //me.resetForm(response);
        //         } else {
        //             console.log("Có lỗi khi lấy dữ liệu từ server");
        //         }
        //     });
        // }
    }

    /**
     * Hàm đóng form
     * CreatedBy VMHieu 14/07/2022
     */
    close() {
        let me = this,
            required = $('[Required]'),
            date = $('[Datatype = "Date"]');

        // xóa hết hiển thị các lỗi trong form và phần tối bên ngoài
         $('#over').remove();
        // me.downError(required);
        // me.downError(date);
        me.form.hide();
    }
}