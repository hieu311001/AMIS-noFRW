class Sidebar {
    /**
     * Hàm khởi tạo sidebar
     * Gồm 1 id của sidebar
     * CreatedBy VMHieu 01/08/2022
     */
    constructor(sidebarId) {
        let me = this;

        // Lưu lại sidebar đang thao tác
        me.sidebar = $(`#${sidebarId}`);

        // Khởi tạo sự kiện
        me.initEvents();
    }

    /**
     * Hàm khởi tạo sự kiện
     * CreatedBy VMHieu 01/08/2022
     */
    initEvents() {
        let me = this;

        // Sự kiện ấn chọn menu
        me.initButtonClick();

        // Sự kiện ấn nút mũi tên
        me.initBarsClick();
    }

    /**
     * Hàm xử lý ấn chọn 1 mục trong menu
     * CreatedBy VMHieu 01/08/2022
     */
    initButtonClick() {
        let me = this;

        me.sidebar.find('.menu-item').off('click');
        me.sidebar.find('.menu-item').on('click', function () {
            me.sidebar.find('.menu-item-active').removeClass('menu-item-active');

            $(this).addClass('menu-item-active');
        })
    }

    /**
     * Hàm xử lý ấn nút menu
     * CreatedBy VMHieu 01/08/2022
     */
    initBarsClick() {
        let me = this;

        $('.bars-icon').off('click');
        $('.bars-icon').on('click', function () {
            $(this).css("display", "none");
            me.sidebar.find(".logo").css('display', 'none');
            me.sidebar.find(".logo-image").css('display', 'none');
            
            me.sidebar.find(".menu-item__text").css('display', 'none');
            me.sidebar.find(".menu-logo").css('display', 'block');
        })

        $('.menu-logo').off('click');
        $('.menu-logo').on('click', function () {
            $(this).css('display', 'none');

            me.sidebar.find(".logo").css('display', 'block');
            me.sidebar.find(".logo-image").css('display', 'block');
            
            me.sidebar.find(".menu-item__text").css('display', 'block');
            $('.bars-icon').css('display', 'block');
        })
    }
}

// Khởi tạo biến dành cho sidebar
var sidebar = new Sidebar("side-bar-id");