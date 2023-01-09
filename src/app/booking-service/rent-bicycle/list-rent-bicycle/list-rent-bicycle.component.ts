import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { Validate } from 'src/app/constant/validation';
import { ConfirmationErrDialogService } from 'src/app/services/confirmation-err-dialog.service';
import { OrderBikeService } from 'src/app/services/order-bike.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-rent-bicycle',
  templateUrl: './list-rent-bicycle.component.html',
  styleUrls: ['./list-rent-bicycle.component.css']
})
export class ListRentBicycleComponent implements OnInit {
  webUrl = environment.webUrl;
  currentRate = 3;
  submitted = false
  isEmpty = Validate.contentValidate.isEmpty
  isLoading = false
  bikeList: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  informationSearch: any;
  hoursRent: Array<{ value: number }> = [];
  bikeListArray: any = []
  tempArray: any = [];
  newArray: any = [];
  searchForm!: UntypedFormGroup
  today:any;
  // 
  checkBoxArray: any = [
    {
      id: 1,
      type: "checkbox",
      rangePrice: "0 VNĐ - 50,000 VNĐ",
      isSelected: false
    },
    {
      id: 2,
      type: "checkbox",
      rangePrice: "50,000 VNĐ - 100,000 VNĐ",
      isSelected: false
    },
    {
      id: 3,
      type: "checkbox",
      rangePrice: "100,000 VNĐ - 150,000 VNĐ",
      isSelected: false
    },
    {
      id: 4,
      type: "checkbox",
      rangePrice: "150,000 VNĐ - 200,000 VNĐ",
      isSelected: false
    },
    {
      id: 5,
      type: "checkbox",
      rangePrice: "200,000 VNĐ - 250,000 VNĐ",
      isSelected: false
    }
  ];
  constructor(private orderBikeService: OrderBikeService, private confirmationErrDialogService:ConfirmationErrDialogService) {
    this.searchForm = new UntypedFormGroup({
      dateRent: new UntypedFormControl("", Validators.required),
      hoursGetBike: new UntypedFormControl("", Validators.required),
      timeHire: new UntypedFormControl("", Validators.required),
      numberOfBike: new UntypedFormControl("", Validators.required),
    },
      [Validators.required, this.dateRangeValidator1 ]
    )
    
  }
  
  ngOnInit(): void {
    this.onchangeSelect("07:00:00");
    this.today=formatDate(Date.now(), 'yyyy-MM-dd', 'en-US')
    this.searchForm.controls.dateRent.setValue(this.today);
    this.searchForm.controls.hoursGetBike.setValue("07:00:00");
    this.searchForm.controls.timeHire.setValue(1);
    this.searchForm.controls.numberOfBike.setValue(1);
    this.loadSnipper()
  }
  onchangeSelect(hoursGetBike: any) {
    this.hoursRent = [];
    if (hoursGetBike == "07:00:00") {
      for (let i = 1; i <= 15; i++) {
        this.hoursRent.push({ value: i });
      }
    }
    else if (hoursGetBike == "08:00:00") {
      for (let i = 1; i <= 14; i++) {
        this.hoursRent.push({ value: i });
      }
    }
    else if (hoursGetBike == "09:00:00") {
      for (let i = 1; i <= 13; i++) {
        this.hoursRent.push({ value: i });
      }
    }
    else if (hoursGetBike == "10:00:00") {
      for (let i = 1; i <= 12; i++) {
        this.hoursRent.push({ value: i });
      }
    }
    else if (hoursGetBike == "11:00:00") {
      for (let i = 1; i <= 11; i++) {
        this.hoursRent.push({ value: i });
      }
    }
    else if (hoursGetBike == "12:00:00") {
      for (let i = 1; i <= 10; i++) {
        this.hoursRent.push({ value: i });
      }
    }
    else if (hoursGetBike == "13:00:00") {
      for (let i = 1; i <= 9; i++) {
        this.hoursRent.push({ value: i });
      }
    }
    else if (hoursGetBike == "14:00:00") {
      for (let i = 1; i <= 8; i++) {
        this.hoursRent.push({ value: i });
      }
    }
    else if (hoursGetBike == "15:00:00") {
      for (let i = 1; i <= 7; i++) {
        this.hoursRent.push({ value: i });
      }
    }
    else if (hoursGetBike == "16:00:00") {
      for (let i = 1; i <= 6; i++) {
        this.hoursRent.push({ value: i });
      }
    }
    else if (hoursGetBike == "17:00:00") {
      for (let i = 1; i <= 5; i++) {
        this.hoursRent.push({ value: i });
      }
    }
    else if (hoursGetBike == "18:00:00") {
      for (let i = 1; i <= 4; i++) {
        this.hoursRent.push({ value: i });
      }
    }
    else if (hoursGetBike == "19:00:00") {
      for (let i = 1; i <= 3; i++) {
        this.hoursRent.push({ value: i });
      }
    }
    else if (hoursGetBike == "20:00:00") {
      for (let i = 1; i <= 2; i++) {
        this.hoursRent.push({ value: i });
      }
    }
    else if (hoursGetBike == "21:00:00") {
      for (let i = 1; i <= 1; i++) {
        this.hoursRent.push({ value: i });
      }
    } else {
      this.hoursRent = [];
    }
  }
  onTableDataChange(event: any) {
    this.page = event
  }
  onSubmit() {
    this.submitted = true
    if (this.searchForm.invalid) {
      return
    } else {
      this.informationSearch = this.searchForm.value;
      console.log(this.informationSearch)
      this.orderBikeService.getTypeBike(this.searchForm.value).subscribe(res => {
        console.log(res.data)
        if (res.code === '200') {
          this.bikeList = res.data;
          this.bikeListArray = res.data;
        }
        else {
          this.confirmationErrDialogService.confirm(
            Constant.loadData.title,
            Constant.loadData.errData
          );
        }
      })
    }
  }
  changeStatusCheckBox(id: number, status: boolean) {
    for (var i = 0; i < this.checkBoxArray.length; i++) {
      if (this.checkBoxArray[i].id == id) {
        this.checkBoxArray[i].isSelected = status;
      }
    }
  }
  checkStatusCheckBox(): boolean {
    for (var i = 0; i < this.checkBoxArray.length; i++) {
      if (this.checkBoxArray[i].isSelected) {
        return true;
      }
    }
    return false;
  }
  filterPriceSelectedChange(minPrice: number, maxPrice: number) {
    this.tempArray = this.bikeListArray.filter((e: any) => e.price > minPrice && e.price <= maxPrice)
    this.bikeList = []
    this.newArray.push(this.tempArray)
    for (let i = 0; i < this.newArray.length; i++) {
      var firstArray = this.newArray[i];
      for (let j = 0; j < firstArray.length; j++) {
        var obj = firstArray[j];
        this.bikeList.push(obj);
      }
    }
  }
  filterPriceUnselectedChange(minPrice: number, maxPrice: number) {
    this.tempArray = this.bikeList.filter((e: any) => e.price <= minPrice || e.price > maxPrice)
    this.bikeList = []
    this.newArray = []
    this.newArray.push(this.tempArray)
    for (let i = 0; i < this.newArray.length; i++) {
      var firstArray = this.newArray[i];
      for (let j = 0; j < firstArray.length; j++) {
        var obj = firstArray[j];
        this.bikeList.push(obj);
      }
    }
  }

  onChange(event: any) {
    if (event.target.checked) {
      if (event.target.value == 1) {
        this.filterPriceSelectedChange(0, 50000);
        this.changeStatusCheckBox(1, true)
      }
      else if (event.target.value == 2) {
        this.filterPriceSelectedChange(50000, 100000);
        this.changeStatusCheckBox(2, true)
      }
      else if (event.target.value == 3) {
        this.filterPriceSelectedChange(100000, 150000);
        this.changeStatusCheckBox(3, true)
      }
      else if (event.target.value == 4) {
        this.filterPriceSelectedChange(150000, 200000);
        this.changeStatusCheckBox(4, true)
      }
      else if (event.target.value == 5) {
        this.filterPriceSelectedChange(200000, 250000);
        this.changeStatusCheckBox(5, true)
      }
    }
    else {
      if (event.target.value == 1) {
        this.filterPriceUnselectedChange(0, 50000);
        this.changeStatusCheckBox(1, false)
      }
      else if (event.target.value == 2) {
        this.filterPriceUnselectedChange(50000, 100000);
        this.changeStatusCheckBox(2, false)
      }
      else if (event.target.value == 3) {
        this.filterPriceUnselectedChange(100000, 150000);
        this.changeStatusCheckBox(3, false)
      }
      else if (event.target.value == 4) {
        this.filterPriceUnselectedChange(150000, 200000);
        this.changeStatusCheckBox(4, false)
      }
      else if (event.target.value == 5) {
        this.filterPriceUnselectedChange(200000, 250000);
        this.changeStatusCheckBox(5, false)
      }
      if (this.checkStatusCheckBox() == false) {
        this.newArray = [];
        this.bikeList = this.bikeListArray;
      }
    }
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
  // private dateRangeValidator1: ValidatorFn = (): {
  //   [key: string]: any;
  // } | null => {
  //   // let exDate = new Date("0000/00/01");
  //   let date = Date.now();
  //   let invalid = false;
  //   const from = this.searchForm && this.searchForm.get('dateRent')!.value;
  //   const to = date;

  //   if (from && to) {
  //     invalid = new Date(from).valueOf() <= new Date(to).valueOf();
  //   }
  //   return invalid ? { invalidRange: { from, to } } : this.bikeList = [];
  // };

  private dateRangeValidator1: ValidatorFn = (): {
    [key: string]: any;
  } | null => {
    // let exDate = new Date("0000/00/01");
    let date = Date.now();
    let invalid = false;
    const from = this.searchForm && this.searchForm.get('dateRent')!.value;
    const to = formatDate(Date.now(), 'yyyy-MM-dd', 'en-US')
      ;
    if (from && to) {
      invalid = !(new Date(from).valueOf() >= new Date(to).valueOf());


    }
    return invalid ? { invalidRange: { from, to } } : (this.bikeList = []);
  };

}
