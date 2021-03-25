$('#btnAddProduct').click(function () {
    let code=$('#txtProductCode').val();
    let description = $('#txtProductDescription').val();
    let qty = $('#txtProductQty').val();
    let unitPrice = $('#txtProductUnitPrice').val();

    let row=saveProduct(code,description,qty,unitPrice);
    if (row)clearAllProductFields();
});
function clearAllProductFields() {
    $('#txtProductCode').val("");
    $('#txtProductDescription').val("");
    $('#txtProductQty').val("");
    $('#txtProductUnitPrice').val("");
}
function saveProduct(code, description, qty, unitPrice) {
    let product=new ProductDTO(code,description,qty,unitPrice);
    productTable.push(product);

    loadAllProductsToTheTable();

    $('#tblProducts>tr').click(function () {
        //get values of selected row
        let code = $(this).children('td:eq(0)').text();
        let description = $(this).children('td:eq(1)').text();
        let qty = $(this).children('td:eq(2)').text();
        let unitPrice = $(this).children('td:eq(3)').text();

        console.log(code,description,qty,unitPrice);

        //set values for text fileds
        $("#txtProductCode").val(code);
        $("#txtProductDescription").val(description);
        $("#txtProductQty").val(qty);
        $("#txtProductUnitPrice").val(unitPrice);

    });

    return true;
}
function loadAllProductsToTheTable() {
    let allProducts = getAllProducts();
    $('#tblProducts').empty();
    for (var i in allProducts) {
        let code = allProducts[i].getProductCode();
        let description = allProducts[i].getProductDescription();
        let qty = allProducts[i].getProductQty();
        let unitPrice = allProducts[i].getProductUnitPrice();

        var row = `<tr><td>${code}</td><td>${description}</td><td>${qty}</td><td>${unitPrice}</td></tr>`;
        $('#tblProducts').append(row);
    }
}
function getAllProducts() {
    return productTable;
}
$('#txtProductCode').on('keyup', function (eObj) {
    if (eObj.key=="Enter"){
        let customer=searchProduct($(this).val());
        if (customer != null){
            $("#txtProductCode").val(customer.getProductCode());
            $("#txtProductDescription").val(customer.getProductDescription());
            $("#txtProductQty").val(customer.getProductQty());
            $("#txtProductUnitPrice").val(customer.getProductUnitPrice());
        }else {

        }
    }
});

function searchProduct(code) {
    for (var i in productTable){
        if (productTable[i].getProductCode()==code) return productTable[i];
    }
    return null;
}
$("#btnUpdateProduct").click(function () {
    let code = $("#txtProductQty").val();
    let description = $("#txtProductDescription").val();
    let qty = $("#txtProductQty").val();
    let unitPrice = $("#txtProductUnitPrice").val();

    let option=confirm(`Do you want to Update Product Code:${code}`);
    if (option){
        let res= updateProduct(code,description,qty,unitPrice);
        if (res){
            alert("Product Updated");
        }else{
            alert("Update Failed");
        }
    }
    loadAllProductsToTheTable();
    clearAllProductFields();
});

function updateProduct(code, description, qty, unitPrice) {
    let product = searchProduct(code);
    if (product != null) {
        product.setProductDescription(description);
        product.setProductQty(qty);
        product.setProductUnitPrice(unitPrice);
        return true;
    } else {
        return false;
    }
}


$("#btnDeleteProduct").click(function () {
    // console.log("delete");
    let code = $("#txtProductCode").val();
    let option=confirm(`Do you want to delete Code:${code}`);


    if (option){
        let res=deleteProduct(code);
        if (res){
            alert("Product Deleted");
        } else{
            alert("Delete Failed")
        }
    }
    loadAllProductsToTheTable();
    clearAllProductFields();
});
function deleteProduct(code) {
    let product = searchProduct(code);
    if (product != null) {
        let indexNumber = productTable.indexOf(product);
        productTable.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}


let proCodeReg=/^(P00-)[0-9]{1,3}$/;

$("#txtProductCode").on('keyup',function (event){
    if (event.key=="Enter"){
        $('#txtProductDescription').focus();
    }
    let inputID=$("#txtProductCode").val();
    if (proCodeReg.test(inputID)){
        $("#txtProductCode").css('border','2px solid green');
        $("#lblProductCode").text("");
        $("#txtProductCode").on('keyup',function (event) {
            if (event.key == "Enter") {
                $('#txtProductDescription').focus();
            }
        });
    }else{
        $("#txtProductCode").css('border','2px solid red');
        $("#lblProductCode").text('Your Input Data Format is Wrong (C00-001)');

    }
});



$("#txtProductDescription").on('keyup',function (event) {
    if (event.key == "Enter") {
        $('#txtProductQty').focus();
    }
});
$("#txtProductQty").on('keyup',function (event) {
    if (event.key == "Enter") {
        $('#txtProductUnitPrice').focus();
    }
});
$("#txtProductUnitPrice").on('keyup',function (event) {
    if (event.key == "Enter") {
        let code=$('#txtProductCode').val();
        let description = $('#txtProductDescription').val();
        let qty = $('#txtProductQty').val();
        let unitPrice = $('#txtProductUnitPrice').val();

        saveProduct(code,description,qty,unitPrice);
        clearAllProductFields();
        $('#txtProductCode').focus();
    }
});
