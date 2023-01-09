import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingComponent } from '../constant/loading';
import { ActivityEmployee } from '../model/activityEmployee';
import { OrderBikeInformation } from '../model/orderBikeInformation';
import { OrderFoodInformation } from '../model/orderFoodInformation';
import { OrderRoomInformation } from '../model/orderRoomInformation';
import { ManageActivityEmployeeService } from '../services/manage-activity-employee.service';
import { OrderBikeService } from '../services/order-bike.service';
import { OrderFoodService } from '../services/order-food.service';
import { OrderRoomService } from '../services/order-room.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  isLoading = false
  codeOrder: any;
  price: any;
  contentPayment: any;
  resultPayment: any;
  activityEmployee:any;
  contentResultPayment: any;
  bankTransactionNumber: any;
  vnpTransactionNumber: any;
  typePayment: any;
  bankCode: any;
  timePayment: any;
  searchInformationString: any
  searchInformationJason: any
  customerInformationString: any
  customerInformationJason: any
  days: any;
  orderInformation: any;
  statusMessage: any;
  accountID: any;
  role: any;
  orderFood: Array<{ orderFoodInformation: OrderFoodInformation }> = [];
  constructor(private route: ActivatedRoute, private orderRoomService: OrderRoomService, private orderBikeService: OrderBikeService, private orderFoodService: OrderFoodService,private manageActivityEmployeeService:ManageActivityEmployeeService) { }

  ngOnInit(): void {
    this.loadSnipper()
    this.accountID = localStorage.getItem("idUser");
    this.role = localStorage.getItem("Role");
    this.route.queryParams.subscribe(res => {
      this.vnpTransactionNumber = res.vnp_TransactionNo;
      this.codeOrder = res.vnp_TxnRef
      this.price = Number(res.vnp_Amount) / 100;
      this.contentPayment = res.vnp_OrderInfo;
      this.resultPayment = res.vnp_ResponseCode;
      if (this.resultPayment == "00") {
        this.contentResultPayment = "Giao dịch thành công"
      }
      else if (this.resultPayment == "07") {
        this.contentResultPayment = "Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường)."
      }
      else if (this.resultPayment == "09") {
        this.contentResultPayment = "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng."
      }
      else if (this.resultPayment == "10") {
        this.contentResultPayment = "Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần"
      }
      else if (this.resultPayment == "11") {
        this.contentResultPayment = "Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch."
      }
      else if (this.resultPayment == "12") {
        this.contentResultPayment = "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa."
      }
      else if (this.resultPayment == "13") {
        this.contentResultPayment = "Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch."
      }
      else if (this.resultPayment == "24") {
        this.contentResultPayment = "Giao dịch không thành công do: Khách hàng hủy giao dịch"
      }
      else if (this.resultPayment == "51") {
        this.contentResultPayment = "Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch."
      }
      else if (this.resultPayment == "65") {
        this.contentResultPayment = "Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch."
      }
      else if (this.resultPayment == "75") {
        this.contentResultPayment = "Ngân hàng thanh toán đang bảo trì."
      }
      else if (this.resultPayment == "79") {
        this.contentResultPayment = "Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch"
      }
      else if (this.resultPayment == "99") {
        this.contentResultPayment = "lỗi Không xác định."
      }
      this.bankTransactionNumber = res.vnp_BankTranNo;
      this.bankCode = res.vnp_BankCode;
      this.timePayment = res.vnp_PayDate;
      this.typePayment = res.vnp_CardType;
    })
    if (this.codeOrder.substring(0, 1) == 'R') {
      this.searchInformationString = localStorage.getItem("searchInformation");
      if (this.searchInformationString != null) {
        this.searchInformationJason = JSON.parse(this.searchInformationString)
      }
      this.customerInformationString = localStorage.getItem("customerInformation");
      if (this.customerInformationString != null) {
        this.customerInformationJason = JSON.parse(this.customerInformationString)
      }
      this.caculateDate();
    } else if (this.codeOrder.substring(0, 1) == 'B') {
      this.searchInformationString = localStorage.getItem("searchBike");
      if (this.searchInformationString != null) {
        this.searchInformationJason = JSON.parse(this.searchInformationString)
      }
    } else if (this.codeOrder.substring(0, 1) == 'F') {
      this.searchInformationString = localStorage.getItem("foodInformation");
      if (this.searchInformationString != null) {
        this.searchInformationJason = JSON.parse(this.searchInformationString)
      }
      this.customerInformationString = localStorage.getItem("customerOrderFood");
      if (this.customerInformationString != null) {
        this.customerInformationJason = JSON.parse(this.customerInformationString)
      }
    }
    this.createOrder();
  }
  caculateDate() {
    let dateCheckOut = new Date(this.searchInformationJason.checkOutDate);
    let dateCheckIn = new Date(this.searchInformationJason.checkInDate);
    this.days = Math.floor((dateCheckOut.getTime() - dateCheckIn.getTime()) / 1000 / 60 / 60 / 24);
  }
  createOrder() {
    if (this.resultPayment == "00") {
      if (this.codeOrder.substring(0, 1) == 'R') {
        if (this.role == "LT") {
          if (this.customerInformationJason.customerID == null) {
            this.activityEmployee = new ActivityEmployee(0,"Đã tạo đơn đặt phòng có mã hóa đơn "+ this.codeOrder +" và thanh toán đầy đủ của khách hàng tên "+this.customerInformationJason.fullName + " qua hệ thống vnpay",this.accountID,"");
            this.manageActivityEmployeeService.createActivityEmployee(this.activityEmployee).subscribe((res)=>{

            })
            this.orderInformation = new OrderRoomInformation(this.codeOrder, this.price, this.contentPayment, this.resultPayment, this.contentResultPayment, this.bankTransactionNumber, this.vnpTransactionNumber, this.typePayment, this.bankCode, this.timePayment, this.days, this.customerInformationJason.fullName, this.customerInformationJason.phoneNumber, this.customerInformationJason.dateOfBirth, this.customerInformationJason.identifyNumber, this.searchInformationJason.checkInDate, this.searchInformationJason.checkOutDate, this.searchInformationJason.numberOfRoom, this.searchInformationJason.typeRoomID, this.customerInformationJason.email);
            this.orderRoomService.createOrderRoomReceptionist(this.orderInformation).subscribe(res => {
              localStorage.removeItem('searchInformation');
              localStorage.removeItem('customerInformation');
            })
          }
          else {
            this.activityEmployee = new ActivityEmployee(0,"Đã tạo đơn đặt phòng có mã hóa đơn "+ this.codeOrder +" và thanh toán đầy đủ của khách hàng tên "+this.customerInformationJason.fullName + " qua hệ thống vnpay",this.accountID,"");
            this.manageActivityEmployeeService.createActivityEmployee(this.activityEmployee).subscribe((res)=>{

            })
            this.orderInformation = new OrderRoomInformation(this.codeOrder, this.price, this.contentPayment, this.resultPayment, this.contentResultPayment, this.bankTransactionNumber, this.vnpTransactionNumber, this.typePayment, this.bankCode, this.timePayment, this.days, "", "", new Date(), "", this.searchInformationJason.checkInDate, this.searchInformationJason.checkOutDate, this.searchInformationJason.numberOfRoom, this.searchInformationJason.typeRoomID, "", this.customerInformationJason.customerID);
            this.orderRoomService.createOrderRoomForCustomer(this.orderInformation).subscribe(res => {
              localStorage.removeItem('searchInformation');
              localStorage.removeItem('customerInformation');
            })
          }
        }
        else if (this.role == "CS") {
          this.orderInformation = new OrderRoomInformation(this.codeOrder, this.price, this.contentPayment, this.resultPayment, this.contentResultPayment, this.bankTransactionNumber, this.vnpTransactionNumber, this.typePayment, this.bankCode, this.timePayment, this.days, "", "", new Date(), "", this.searchInformationJason.checkInDate, this.searchInformationJason.checkOutDate, this.searchInformationJason.numberOfRoom, this.searchInformationJason.typeRoomID, "", this.customerInformationJason[0].customerID);
          this.orderRoomService.createOrderRoomForCustomer(this.orderInformation).subscribe(res => {
            localStorage.removeItem('searchInformation');
            localStorage.removeItem('customerInformation');
          })
        }
      }
      else if (this.codeOrder.substring(0, 1) == 'B') {
        if (this.role == "LT") {
          this.activityEmployee = new ActivityEmployee(0,"Đã tạo đơn đặt xe đạp có mã hóa đơn "+ this.codeOrder +" và nhận thanh toán đầy đủ của khách hàng qua hệ thống vnpay",this.accountID,"");
          this.manageActivityEmployeeService.createActivityEmployee(this.activityEmployee).subscribe((res)=>{

          })
          this.orderInformation = new OrderBikeInformation(this.codeOrder, this.price, this.contentPayment, this.resultPayment, this.contentResultPayment, this.bankTransactionNumber, this.vnpTransactionNumber, this.typePayment, this.bankCode, this.timePayment, this.searchInformationJason.dateRent, this.searchInformationJason.timeHire, this.searchInformationJason.hoursGetBike, this.searchInformationJason.customerID, this.searchInformationJason.typeBikeID, this.searchInformationJason.numberOfBike);
          this.orderBikeService.createOrderBike(this.orderInformation).subscribe(res => {
            localStorage.removeItem('searchBike');
          })
        }
        else
        {
        this.orderInformation = new OrderBikeInformation(this.codeOrder, this.price, this.contentPayment, this.resultPayment, this.contentResultPayment, this.bankTransactionNumber, this.vnpTransactionNumber, this.typePayment, this.bankCode, this.timePayment, this.searchInformationJason.dateRent, this.searchInformationJason.timeHire, this.searchInformationJason.hoursGetBike, this.searchInformationJason.customerID, this.searchInformationJason.typeBikeID, this.searchInformationJason.numberOfBike);
        this.orderBikeService.createOrderBike(this.orderInformation).subscribe(res => {
          localStorage.removeItem('searchBike');
        })
      }
      }
      else if (this.codeOrder.substring(0, 1) == 'F') {
        if (this.role == "CS") {
          for (var item of this.searchInformationJason) {
            this.orderInformation = new OrderFoodInformation(this.codeOrder, this.price, this.contentPayment, this.resultPayment, this.contentResultPayment, this.bankTransactionNumber, this.vnpTransactionNumber, this.typePayment, this.bankCode, this.timePayment, item.quantity, item.foodID, this.customerInformationJason[0].customerID, item.foodName);
            this.orderFood.push(this.orderInformation);
          }
          this.orderFoodService.createOrderFood(this.orderFood).subscribe(res => {
            localStorage.removeItem('foodInformation');
            localStorage.removeItem('customerOrderFood');
          })
        }
        else {
          this.activityEmployee = new ActivityEmployee(0,"Đã tạo đơn đặt đồ ăn có mã hóa đơn "+ this.codeOrder +" và nhận thanh toán đầy đủ của khách hàng qua hệ thống vnpay",this.accountID,"");
          this.manageActivityEmployeeService.createActivityEmployee(this.activityEmployee).subscribe((res)=>{

          })
          for (var item of this.searchInformationJason) {
            this.orderInformation = new OrderFoodInformation(this.codeOrder, this.price, this.contentPayment, this.resultPayment, this.contentResultPayment, this.bankTransactionNumber, this.vnpTransactionNumber, this.typePayment, this.bankCode, this.timePayment, item.quantity, item.foodID, this.customerInformationJason[0].customerID, item.foodName);
            this.orderFood.push(this.orderInformation);
          }
          this.orderFoodService.createOrderFood(this.orderFood).subscribe(res => {
            localStorage.removeItem('foodInformation');
            localStorage.removeItem('customerOrderFood');
          })
        }
      }
    }
    /*else
    {
      if (this.codeOrder.substring(0, 1) == 'R') {
        if (this.accountID == null) {
          this.orderInformation = new OrderRoomInformation(this.codeOrder, this.price, this.contentPayment, this.resultPayment, this.contentResultPayment,"0", "0", this.typePayment, this.bankCode, this.timePayment, this.days, this.customerInformationJason.fullName, this.customerInformationJason.phoneNumber, this.customerInformationJason.dateOfBirth, this.customerInformationJason.identifyNumber, this.searchInformationJason.checkInDate, this.searchInformationJason.checkOutDate, this.searchInformationJason.numberOfRoom, this.searchInformationJason.typeRoomID,this.customerInformationJason.email);
          this.orderRoomService.createOrderRoom(this.orderInformation).subscribe(res => {
            localStorage.removeItem('searchInformation');
            localStorage.removeItem('customerInformation');
          })
        }
        else
        {
          this.orderInformation = new OrderRoomInformation(this.codeOrder, this.price, this.contentPayment, this.resultPayment, this.contentResultPayment,"0", "0", this.typePayment, this.bankCode, this.timePayment, this.days,"", "",new Date(), "", this.searchInformationJason.checkInDate, this.searchInformationJason.checkOutDate, this.searchInformationJason.numberOfRoom, this.searchInformationJason.typeRoomID,"",this.customerInformationJason[0].customerID);
          this.orderRoomService.createOrderRoomForCustomer(this.orderInformation).subscribe(res => {
            localStorage.removeItem('searchInformation');
            localStorage.removeItem('customerInformation');
          })
        }
      }
      else if (this.codeOrder.substring(0, 1) == 'B') {
        this.orderInformation = new OrderBikeInformation(this.codeOrder, this.price, this.contentPayment, this.resultPayment, this.contentResultPayment,"0","0", this.typePayment, this.bankCode, this.timePayment, this.searchInformationJason.dateRent, this.searchInformationJason.timeHire, this.searchInformationJason.hoursGetBike, this.searchInformationJason.customerID, this.searchInformationJason.typeBikeID, this.searchInformationJason.numberOfBike);
        this.orderBikeService.createOrderBike(this.orderInformation).subscribe(res => {
          localStorage.removeItem('searchBike');
        })
      }
      else if (this.codeOrder.substring(0, 1) == 'F') {
        for (var item of this.searchInformationJason) {
          this.orderInformation = new OrderFoodInformation(this.codeOrder, this.price, this.contentPayment, this.resultPayment, this.contentResultPayment,"0", "0", this.typePayment, this.bankCode, this.timePayment, item.quantity, item.foodID, this.customerInformationJason[0].customerID);
          this.orderFood.push(this.orderInformation);
        }
        this.orderFoodService.createOrderFood(this.orderFood).subscribe(res => {
          localStorage.removeItem('foodInformation');
        })
      }
    }*/
  }
  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
}
