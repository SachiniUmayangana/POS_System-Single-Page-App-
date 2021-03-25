function CustomerDTO(id,name,address,salary,contact) {
    var id=id;
    var name=name;
    var address=address;
    var salary=salary;
    var contact=contact;

    this.getCustomerId=function () {
        return id;
    }
    this.getCustomerName=function () {
        return name;
    }
    this.getCustomerAddress=function () {
        return address;
    }
    this.getCustomerContact=function () {
        return contact;
    }
    this.getCustomerSalary=function () {
        return salary;
    }

    this.setCustomerId=function (newID) {
        id=newID;
    }
    this.setCustomerName=function (newName) {
        name=newName;
    }
    this.setCustomerAddress=function (newAddress) {
        address=newAddress;
    }
    this.setCustomerSalary=function (newSalary) {
        salary=newSalary;
    }
    this.setCustomerContact=function (newContact) {
        contact=newContact;
    }
}