//add details to table
$('#btnAddCust').click(function () {
    let id=$('#txtCustId').val();
    let name = $('#txtName').val();
    let address = $('#txtAddress').val();
    let salary = $('#txtSalary').val();
    let contact = $('#txtContact').val();

    let row=saveCustomer(id,name,address,salary,contact);
    if(row)clearAllFields();
});
//search customer on enter
$('#txtCustId').on('keyup', function (eObj) {

    if (eObj.key=="Enter"){
       let customer=searchCustomer($(this).val());
       if (customer != null){
           $("#txtCustId").val(customer.getCustomerId());
           $("#txtName").val(customer.getCustomerName());
           $("#txtAddress").val(customer.getCustomerAddress());
           $("#txtSalary").val(customer.getCustomerSalary());
           $("#txtContact").val(customer.getCustomerContact());
           // ==========================================================
       }else {
           // clearAllFields();
       }
   }
});

//update customer
$("#btnUpdate").click(function () {
    let id = $("#txtCustId").val();
    let name = $("#txtName").val();
    let address = $("#txtAddress").val();
    let salary = $("#txtSalary").val();
    let contact = $("#txtContact").val();

    let option=confirm(`Do you want to Update Customer ID:${id}`);
    if (option){
        let res= updateCustomer(id, name, address, salary, contact);
        if (res){
            alert("Customer Updated");
        }else{
            alert("Update Failed");
        }
    }
    loadAllCustomerToTheTable();
    clearAllFields();

});
//delete customer
$("#btnDelete").click(function () {
    let id = $("#txtCustId").val();
    let option=confirm(`Do you want to delete ID:${id}`);

    if (option){
        let res=deleteCustomer(id);
        if (res){
            alert("Customer Deleted");
        } else{
            alert("Delete Failed")
        }
    }
    loadAllCustomerToTheTable();
    clearAllFields();
});
// ========== functions ====================
function saveCustomer(id, name, address, salary, contact) {
    let customer = new CustomerDTO(id, name, address, salary, contact);
    customerTable.push(customer);// customer aded
    loadAllCustomerToTheTable();
    $('#tblCustomers>tr').click(function () {
        //get values of selected row
        let id = $(this).children('td:eq(0)').text();
        let name = $(this).children('td:eq(1)').text();
        let address = $(this).children('td:eq(2)').text();
        let salary = $(this).children('td:eq(3)').text();
        let contact = $(this).children('td:eq(4)').text();

        // console.log(id,name,address,salary,contact);

        $("#txtCustId").val(id);
        $("#txtName").val(name);
        $("#txtAddress").val(address);
        $("#txtSalary").val(salary);
        $("#txtContact").val(contact);

        $('#txtCustomerId').val(id);

    });
    return true;
}
function loadAllCustomerToTheTable() {
    let allCustomers = getAllCustomers();
    $('#tblCustomers').empty();
    for (var i in allCustomers) {
        let id = allCustomers[i].getCustomerId();
        let name = allCustomers[i].getCustomerName();
        let address = allCustomers[i].getCustomerAddress();
        let salary = allCustomers[i].getCustomerSalary();
        let contact = allCustomers[i].getCustomerContact();

        var row = `<tr><td>${id}</td><td>${name}</td><td>${address}</td><td>${salary}</td><td>${contact}</td></tr>`;
        $('#tblCustomers').append(row);
    }
}
function getAllCustomers() {
    return customerTable;
}
function searchCustomer(id) {
    for (var i in customerTable){
        if (customerTable[i].getCustomerId()==id) return customerTable[i];
    }
    return null;
}

function updateCustomer(id, name, address, salary, contact) {
    let customer = searchCustomer(id);
    if (customer != null) {
        customer.setCustomerName(name)
        customer.setCustomerAddress(address)
        customer.setCustomerSalary(salary);
        customer.setCustomerContact(contact);
        return true;
    } else {
        return false;
    }
}
function deleteCustomer(id) {
    let customer = searchCustomer(id);
    if (customer != null) {
        let indexNumber = customerTable.indexOf(customer);
        customerTable.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}
function clearAllFields() {
    $('#txtCustId').val("");
    $('#txtName').val("");
    $('#txtAddress').val("");
    $('#txtSalary').val("");
    $('#txtContact').val("");
}


//================ validations =====================

let cusIdReg=/^(C00-)[0-9]{1,3}$/;

$("#txtCustId").on('keyup',function (event){
    if (event.key=="Enter"){
        $('#txtName').focus();
    }
    let inputID=$("#txtCustId").val();
    if (cusIdReg.test(inputID)){
        $("#txtCustId").css('border','2px solid green');
        $("#custId").text("");
    }else{
        $("#txtCustId").css('border','2px solid red');
        $("#custId").text('Your Input Data Format is Wrong (C00-001)');
    }
});

$("#txtCustId").on('keyup',function (event) {
    if (event.key == "Enter") {
        $('#txtName').focus();
    }
});


$("#txtName").on('keyup',function (event) {
    if (event.key == "Enter") {
        $('#txtAddress').focus();
    }
});

$("#txtAddress").on('keyup',function (event) {
    if (event.key == "Enter") {
        $('#txtSalary').focus();
    }
});

$("#txtSalary").on('keyup',function (event) {
    if (event.key == "Enter") {
        $('#txtContact').focus();
    }
});

$("#txtContact").on('keyup',function (event) {
    if (event.key == "Enter") {
        let id=$('#txtCustId').val();
        let name = $('#txtName').val();
        let address = $('#txtAddress').val();
        let salary = $('#txtSalary').val();
        let contact = $('#txtContact').val();

        let row=saveCustomer(id,name,address,salary,contact);
        clearAllFields();
        $('#txtCustId').focus();

    }
});

$('#txtCustId,#txtName,#txtAddress,#txtSalary,#txtContact').on('keydown',function (event){
    if (event.key=="Tab"){
        event.preventDefault();
    }
});














