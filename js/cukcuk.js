// $(document).ready(function () {
//     /**
//      * Định dạng ô input nhập dữ liệu tiền tệ
//      * CreatedBy VMHIEU 18/07/2022
//      */
//     $('.salary').on('change', function () {
//         let value = $(this).val();

//         $(this).attr("Val", value);

//         value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " (VNĐ)";
//         $(this).addClass('align-right');

//         $(this).val(value);
//     })
//     $('.salary').on('click', function () {
//         $(this).val("");
//         $(this).removeClass('align-right');
//     })
// })