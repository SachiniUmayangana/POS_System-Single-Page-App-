function ProductDTO(code,description,qty,unitPrice) {
    var _code=code;
    var description=description;
    var qty=qty;
    var unitPrice=unitPrice;

    this.getProductCode=function () {
        return code;
    }
    this.getProductDescription=function () {
        return description;
    }
    this.getProductQty=function () {
        return qty;
    }
    this.getProductUnitPrice=function () {
        return unitPrice;
    }



    this.setProductCode=function (newCode) {
        code=newCode;
    }
    this.setProductDescription=function (newDescription) {
        description=newDescription;
    }
    this.setProductQty=function (newQty) {
        qty=newQty;
    }
    this.setProductUnitPrice=function (newUnitPrice) {
        unitPrice=newUnitPrice;
    }
}