function OrderDTO(orderId,date,customerId,total) {
    var orderId = orderId;
    var date=date;
    var customerId=customerId;
    var total=total;



    this.getOrderId=function () {
        return orderId;
    }
    this.setOrderID=function (newOrderId) {
        orderId=newOrderId;
    }

    this.getDate=function () {
        return date;
    }
    this.setDate=function (newDate) {
        date=newDate;
    }

    this.getCustomerId=function () {
        return customerId;
    }
    this.setCustomerId=function (newCustomerId) {
        customerId=newCustomerId;
    }

    this.getTotal=function () {
        return total;
    }
    this.setTotal=function (newTotal) {
        total=newTotal;
    }
}