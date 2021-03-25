
// auto Generate  Order Id===========================
function generateOrderId() {
    try {
        let lastOID = orderTable[orderTable.length-1].getOrderId();
        let newOID = parseInt(lastOID.substring(1,4))+1;
        if (newOID < 10) {
            $("#lblOrderId").text("D00"+newOID);
        }else if (newOID < 100) {
            $("#lblOrderId").text("D0"+newOID);
        } else {
            $("#lblOrderId").text("D"+newOID);
        }
    } catch (e) {
        $("#lblOrderId").text("D001");
    }
}
// auto Generate  Current Date===========================
function generateDate(){
    var d = new Date();
    var strDate = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate();
    $('#lblDate').text(strDate);
}
generateOrderId();
generateDate();
//Search customers=================================
$('#txtCustomerId').on('keyup', function (eObj) {
    if (eObj.key=="Enter"){
        let customer=searchCustomer($(this).val());
        if (customer != null){
            $("#txtCustomerId").val(customer.getCustomerId());
            $("#txtCustomerName").val(customer.getCustomerName());
            $("#txtCustomerAddress").val(customer.getCustomerAddress());
            $("#txtCustomerSalary").val(customer.getCustomerSalary());
            $("#txtCustomerContact").val(customer.getCustomerContact());
            $('#txtProCode').focus();

        }else {
            // clearAllFields();
        }
    }
});
//search products==================================
$('#txtProCode').on('keyup', function (eObj) {
    if (eObj.key=="Enter"){
        let customer=searchProduct($(this).val());
        if (customer != null){
            $("#txtProCode").val(customer.getProductCode());
            $("#txtProDescription").val(customer.getProductDescription());
            $("#txtProQty").val(customer.getProductQty());
            $("#txtProUnitPrice").val(customer.getProductUnitPrice());
            $('#txtQuantity').focus();

        }else {
            // clearAllProductFields();
        }
    }
});


$('#lblCash').on('keyup', function (eObj) {
    if (eObj.key=="Enter"){

                let grandTot = $('#lblGrandTot').val();
                let cash = $('#lblCash').val();
                let balance=cash-grandTot;

                $('#lblBalance').val(balance+'.00');

                if ($('#lblBalance').val()<0){
                    $("#insufCash").css('border','2px solid red');
                    $('#lblBalance').val("--");
                    alert('Insufficient Cash')
                }
        }else {
        $("#insufCash").css('border','none');
        }
    });

//add item to the cart==================================
$('#btnAddItemToCart').click(function () {
    let code=$('#txtProCode').val();
    let description=$('#txtProDescription').val();
    let qtyOnHand=$('#txtProQty').val();
    let unitPrice=$('#txtProUnitPrice').val();
    let qty=$('#txtQuantity').val();

    // let check=isAlreadyExist(productDetail[0]);
    if (qty>qtyOnHand){
                alert("Product Qty more than Qty On Hand");
            }else
                // if (!check)
                {

            let total = parseInt(qty) * parseFloat(unitPrice);
            $('#lblTotal').val(total + ".00");
            let tot = 0;
            // console.log(code, description, qty, total);

            // ==============added first qty*unit price=====================================
            var row = `<tr><td>${code}</td><td>${description}</td><td>${unitPrice}</td><td>${qty}</td><td>${total}</td></tr>`;
            $('#tblOrders').append(row);

            $('#tblOrders>tr').click(function () {
                //get values of selected row
                let code = $(this).children('td:eq(0)').text();
                let description = $(this).children('td:eq(1)').text();
                let unitPrice = $(this).children('td:eq(2)').text();
                let qty = $(this).children('td:eq(3)').text();

                // console.log(code,description,unitPrice,qty);
                $("#txtProCode").val(code);
                $("#txtProDescription").val(description);
                $("#txtProUnitPrice").val(unitPrice);
                $('#txtQuantity').val(qty);
                $('#txtProQty').val(qty);
            });
            clearProductFields();
            // ==============add current qty*unitprice to previous tot=====================================
            let table = document.getElementById('tblOrders');
            let count = table.rows.length;
            for (let i = 0; i < count; i++) {
                tot += parseFloat(table.rows[i].cells[4].innerText);
            }
            $("#lblTotal").val(tot + '.00');

            // ==============discounts=====================================

            if (tot<2000){
                $('#lblGrandTot').val(tot+ '.00');
            }
            if (tot >= 2000) {
                $('#lblDiscount').val((tot * 10) / 100 + '.00');
                $('#lblGrandTot').val(tot - ((tot * 10) / 100) + '.00');

            }
            if (tot >= 5000) {
                $('#lblDiscount').val((tot * 20) / 100 + '.00');
                $('#lblGrandTot').val(tot - ((tot * 20) / 100) + '.00');
            }
            else {
            }
        }

});
const isAlreadyExist = function (code) {
    let table = document.getElementById('tblOrders');
    let count = table.rows.length;
    for(let i=0; i<count; i++) {
        if (table.rows[i].cells[0].innerText === code) {
            return i;
        }
    }
    return -1;
}
//
// $('#btnRemoveItemFromCart ').click(function () {
//     console.log('hi remove btn');
//
//     let qty=$('#txtQuantity').val();
//     let tblQty=$('#txtProQty').val();
//
//         console.log(tblQty-qty);
//
//     let code=$('#txtProCode').val();
//     let description=$('#txtProDescription').val();
//     let unitPrice=$('#txtProUnitPrice').val();
//     let total=$('#lblTotal').val();
//
// });
//
$("#txtQuantity").on('keyup',function (event) {
    if ($('#txtQuantity').val()>$('#txtProQty').val()){
        $("#txtQuantity").css('border','2px solid red');
        $("#lblQtyWarning").text('Enter qty lower than '+$('#txtProQty').val());
    }else{
        $("#txtQuantity").css('border','2px solid green');
        $("#lblQtyWarning").text('');

    }
});

// clearProductFields================================
function clearProductFields() {
    $("#txtProCode").val("");
    $("#txtProDescription").val("");
    $("#txtProQty").val("");
    $("#txtProUnitPrice").val("");
    $('#txtQuantity').val("");

    $("#txtProCode").focus();
}

$('.butCartBtn').click(function () {
    // console.log('wderfgt');
    let orderId=$('#lblOrderId').val();
    let date = $('#lblDate').val();
    let customerId = $('#txtCustomerId').val();
    let total = $('#lblGrandTot').val();

    let order=saveOrder(orderId,date,customerId,total);
    if(order)clearWholeOrder();
});

function saveOrder(orderId, date, customerId, total) {
    let order = new OrderDTO(orderId,date,customerId,total);
    orderTable.push(order);
    alert('Order Done')
    return true;
}

function clearWholeOrder() {
    $("#txtCustomerId").val("");
    $("#txtCustomerName").val("");
    $("#txtCustomerAddress").val("");
    $("#txtCustomerContact").val("");
    $('#txtProCode').val("");
    $('#txtPro').val("");
    $('#txtProQty').val("");
    $('#txtProUnitPrice').val("");
    $('#txtQuantity').val("");
    $('#lblTotal').val("");
    $('#lblGrandTot').val("");
    $('#lblDiscount').val("");
    $('#lblBalance').val("");
    $('#lblCash').val("");
    $('#tblOrders').remove();

    generateOrderId();
}

$('#btnSearchOrder').click(function () {
        let order=searchOrder($(this).val());
        if (order != null){
            $("#lblOrderId").val(order.getOrderId());
            $("#lblDate").val(order.getDate());
            $("#txtCustomerId").val(order.getCustomerId());
            $("#lblTotal").val(order.getTotal());
            $("#lblGrandTot").val(order.getTotal());
            // ==========================================================
        }else {

        }

});

function searchOrder(id) {
    for (var i in orderTable){
        if (orderTable[i].getOrderId()==id) return orderTable[i];
    }
    return null;}














