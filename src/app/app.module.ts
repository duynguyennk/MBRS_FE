import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { ManageEmployeeComponent } from './manage-account/manage-employee/manage-employee.component';
import { ManageCustomerComponent } from './manage-account/manage-customer/manage-customer.component';
import { ListAllAccountComponent } from './manage-account/list-all-account/list-all-account.component';
import { CreateAccEmployeeComponent } from './manage-account/manage-employee/create-acc-employee/create-acc-employee.component';
import { ListAllEmplComponent } from './manage-account/manage-employee/list-all-empl/list-all-empl.component';
import { EditAccEmployeeComponent } from './manage-account/manage-employee/edit-acc-employee/edit-acc-employee.component';
import { ListAllCustomerComponent } from './manage-account/manage-customer/list-all-customer/list-all-customer.component';
import { CreateAccCustomerComponent } from './manage-account/manage-customer/create-acc-customer/create-acc-customer.component';
import { EditAccCustomerComponent } from './manage-account/manage-customer/edit-acc-customer/edit-acc-customer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageLoginComponent } from './manage-login/manage-login.component';
import { LoginComponent } from './manage-login/login/login.component';
import { ForgetPassComponent } from './manage-login/forget-pass/forget-pass.component';
import { ChangePassComponent } from './manage-login/change-pass/change-pass.component';
import { ManageRoomComponent } from './manage-room/manage-room.component';
import { ListAllManageComponent } from './manage-room/list-all-manage/list-all-manage.component';
import { ManageRoomInforComponent } from './manage-room/manage-room-infor/manage-room-infor.component';
import { AddRoomComponent } from './manage-room/manage-room-infor/add-room/add-room.component';
import { EditRoomComponent } from './manage-room/manage-room-infor/edit-room/edit-room.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BookingRoomComponent } from './booking-room/booking-room.component';
import { ListBookingRoomComponent } from './booking-room/list-booking-room/list-booking-room.component';
import { BookingServiceComponent } from './booking-service/booking-service.component';
import { ListBookingServiceComponent } from './booking-service/list-booking-service/list-booking-service.component';
import { FoodBeverageComponent } from './booking-service/food-beverage/food-beverage.component';
import { RentBicycleComponent } from './booking-service/rent-bicycle/rent-bicycle.component';
import {MatDialogModule} from '@angular/material/dialog';
import { BookingDetailComponent } from './booking-room/booking-detail/booking-detail.component';
import { ListRentBicycleComponent } from './booking-service/rent-bicycle/list-rent-bicycle/list-rent-bicycle.component';
import { ListFoodBeverageComponent } from './booking-service/food-beverage/list-food-beverage/list-food-beverage.component';
import { FoodPaymentComponent } from './booking-service/food-beverage/food-payment/food-payment.component';
import { BicyclePaymentComponent } from './booking-service/rent-bicycle/bicycle-payment/bicycle-payment.component';
import { ListBookingDetailComponent } from './booking-room/booking-detail/list-booking-detail/list-booking-detail.component';
import { BookingHotelComponent } from './booking-room/booking-detail/booking-hotel/booking-hotel.component';
import { BookingConfirmComponent } from './booking-room/booking-detail/booking-hotel/booking-confirm/booking-confirm.component';
import { ListBookingHotelComponent } from './booking-room/booking-detail/booking-hotel/list-booking-hotel/list-booking-hotel.component';
import { ReceptionistComponent } from './receptionist/receptionist.component';
import { ListFunctionComponent } from './receptionist/list-function/list-function.component';
import { RoomStatusComponent } from './receptionist/room-status/room-status.component';
import { CreateBookingComponent } from './receptionist/create-booking/create-booking.component';
import { ListManaRoomDetailComponent } from './manage-room/manage-room-infor/list-mana-room-detail/list-mana-room-detail.component';
import { ManaRoomServiceComponent } from './manage-room/mana-room-service/mana-room-service.component';
import { ManaRoomTypesFloorComponent } from './manage-room/mana-room-types-floor/mana-room-types-floor.component';
import { ListRoomTypesFloorComponent } from './manage-room/mana-room-types-floor/list-room-types-floor/list-room-types-floor.component';
import { EditRoomTypesComponent } from './manage-room/mana-room-types-floor/mana-room-types/edit-room-types/edit-room-types.component';
import { AddRoomTypesComponent } from './manage-room/mana-room-types-floor/mana-room-types/add-room-types/add-room-types.component';
import { AddRoomFloorComponent } from './manage-room/mana-room-types-floor/mana-room-floor/add-room-floor/add-room-floor.component';
import { EditRoomFloorComponent } from './manage-room/mana-room-types-floor/mana-room-floor/edit-room-floor/edit-room-floor.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import {FilterPipeModule} from 'ngx-filter-pipe'
import { ListServiceTypeComponent } from './manage-room/mana-room-service/list-service-type/list-service-type.component';
import { RentBicycleDetailComponent } from './manage-room/mana-room-service/rent-bicycle-detail/rent-bicycle-detail.component';
import { FoodDetailServiceComponent } from './manage-room/mana-room-service/food-detail-service/food-detail-service.component';
import { AddVehicleComponent } from './manage-room/mana-room-service/rent-bicycle-detail/add-vehicle/add-vehicle.component';
import { EditVehicleComponent } from './manage-room/mana-room-service/rent-bicycle-detail/edit-vehicle/edit-vehicle.component';
import { ListBicycleServiceComponent } from './manage-room/mana-room-service/rent-bicycle-detail/list-bicycle-service/list-bicycle-service.component';
import { ListFoodServiceComponent } from './manage-room/mana-room-service/food-detail-service/list-food-service/list-food-service.component';
import { AddFoodServiceComponent } from './manage-room/mana-room-service/food-detail-service/add-food-service/add-food-service.component';
import { EditFoodServiceComponent } from './manage-room/mana-room-service/food-detail-service/edit-food-service/edit-food-service.component';
import { ManaServiceTypesComponent } from './manage-room/mana-service-types/mana-service-types.component';
import { ListManaSerTypeComponent } from './manage-room/mana-service-types/list-mana-ser-type/list-mana-ser-type.component';
import { FoodTypeComponent } from './manage-room/mana-service-types/food-type/food-type.component';
import { RentBicycleTypeComponent } from './manage-room/mana-service-types/rent-bicycle-type/rent-bicycle-type.component';
import { ListFoodTypeComponent } from './manage-room/mana-service-types/food-type/list-food-type/list-food-type.component';
import { AddFoodTypeComponent } from './manage-room/mana-service-types/food-type/add-food-type/add-food-type.component';
import { EditFoodTypeComponent } from './manage-room/mana-service-types/food-type/edit-food-type/edit-food-type.component';
import { ListRentBicycleTypeComponent } from './manage-room/mana-service-types/rent-bicycle-type/list-rent-bicycle-type/list-rent-bicycle-type.component';
import { AddRentBicycleTypeComponent } from './manage-room/mana-service-types/rent-bicycle-type/add-rent-bicycle-type/add-rent-bicycle-type.component';
import { EditRentBicycleTypeComponent } from './manage-room/mana-service-types/rent-bicycle-type/edit-rent-bicycle-type/edit-rent-bicycle-type.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { NotiPopupComponent } from './noti-popup/noti-popup.component';
import { ListManaRoomReceptionistComponent } from './receptionist/create-booking/list-mana-room-receptionist/list-mana-room-receptionist.component';
import { ListRoomStatusComponent } from './receptionist/room-status/list-room-status/list-room-status.component';
import { RoomStBookingDetailComponent } from './receptionist/room-status/room-st-booking-detail/room-st-booking-detail.component';
import { ListStBookingDetailComponent } from './receptionist/room-status/room-st-booking-detail/list-st-booking-detail/list-st-booking-detail.component';
import { CreateStBookingComponent } from './receptionist/room-status/room-st-booking-detail/create-st-booking/create-st-booking.component';
import { CreateRecepBookingComponent } from './receptionist/create-booking/create-recep-booking/create-recep-booking.component';
import { EditInforBookingComponent } from './receptionist/create-booking/edit-infor-booking/edit-infor-booking.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { PaymentComponent } from './payment/payment.component';
import { RingbellComponent } from './receptionist/ringbell/ringbell.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FoodBookingComponent } from './receptionist/food-booking/food-booking.component';
import { BicycleBookingComponent } from './receptionist/bicycle-booking/bicycle-booking.component';
import { ListBicycleBookingComponent } from './receptionist/bicycle-booking/list-bicycle-booking/list-bicycle-booking.component';
import { PaymentBicycleBookingComponent } from './receptionist/bicycle-booking/payment-bicycle-booking/payment-bicycle-booking.component';
import { ListFoodBookingComponent } from './receptionist/food-booking/list-food-booking/list-food-booking.component';
import { PaymentFoodBookingComponent } from './receptionist/food-booking/payment-food-booking/payment-food-booking.component';
import { OrderFoodBookingComponent } from './receptionist/food-booking/order-food-booking/order-food-booking.component';
import { OrderBicycleBookingComponent } from './receptionist/bicycle-booking/order-bicycle-booking/order-bicycle-booking.component';
import { ListRecepBookingComponent } from './receptionist/create-booking/create-recep-booking/list-recep-booking/list-recep-booking.component';
import { RecepBookingDetailComponent } from './receptionist/create-booking/create-recep-booking/recep-booking-detail/recep-booking-detail.component';
import { ListRcBkDetailComponent } from './receptionist/create-booking/create-recep-booking/recep-booking-detail/list-rc-bk-detail/list-rc-bk-detail.component';
import { PaymentRcBkDetailComponent } from './receptionist/create-booking/create-recep-booking/recep-booking-detail/payment-rc-bk-detail/payment-rc-bk-detail.component';
import { DPaymentRcBkDetailComponent } from './receptionist/create-booking/create-recep-booking/recep-booking-detail/d-payment-rc-bk-detail/d-payment-rc-bk-detail.component';
import { ConfirmErrDialogComponent } from './confirm-err-dialog/confirm-err-dialog.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingComponent } from "./constant/loading";
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { FeedBackComponent } from './feed-back/feed-back.component';
import { RegisterComponent } from './register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterNoneComponent } from './footer-none/footer-none.component';
import { HeaderManageComponent } from './header-manage/header-manage.component';
import { ViewProfileManageComponent } from './view-profile-manage/view-profile-manage.component';
import { DirectivesModule } from './directives/directives.module';
import { EditProfileComponent } from './view-profile/edit-profile/edit-profile.component';
import { DisplayViewProfileComponent } from './view-profile/display-view-profile/display-view-profile.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ManaRoomTypesComponent } from './manage-room/mana-room-types-floor/mana-room-types/mana-room-types.component';
import { ManaRoomFloorComponent } from './manage-room/mana-room-types-floor/mana-room-floor/mana-room-floor.component';
import { ListMnRoomFloorComponent } from './manage-room/mana-room-types-floor/mana-room-floor/list-mn-room-floor/list-mn-room-floor.component';
import { ListMnRoomTypesComponent } from './manage-room/mana-room-types-floor/mana-room-types/list-mn-room-types/list-mn-room-types.component';
import { ConfirmRecepPaymentComponent } from './receptionist/create-booking/create-recep-booking/recep-booking-detail/confirm-recep-payment/confirm-recep-payment.component';
import { ListOdBicycleBookingComponent } from './receptionist/bicycle-booking/order-bicycle-booking/list-od-bicycle-booking/list-od-bicycle-booking.component';
import { MakeOdBicycleBookingComponent } from './receptionist/bicycle-booking/order-bicycle-booking/make-od-bicycle-booking/make-od-bicycle-booking.component';
import { ConfirmOdBicycleBookingComponent } from './receptionist/bicycle-booking/order-bicycle-booking/confirm-od-bicycle-booking/confirm-od-bicycle-booking.component';
import { ListOdFoodBookingComponent } from './receptionist/food-booking/order-food-booking/list-od-food-booking/list-od-food-booking.component';
import { MakeOdFoodBookingComponent } from './receptionist/food-booking/order-food-booking/make-od-food-booking/make-od-food-booking.component';
import { ConfirmOdFoodBookingComponent } from './receptionist/food-booking/order-food-booking/confirm-od-food-booking/confirm-od-food-booking.component';
import { ListRcBkStatusComponent } from './receptionist/create-booking/create-recep-booking/recep-booking-detail/list-rc-bk-status/list-rc-bk-status.component';
import { RatingServicesComponent } from './rating-services/rating-services.component';
import { FeedBackServiceComponent } from './feed-back-service/feed-back-service.component';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import {FileUploadModule} from 'primeng/fileupload';
import {AccordionModule} from 'primeng/accordion';  
import {ProgressBarModule} from 'primeng/progressbar';
import { ManaEmployeeBehaviorComponent } from './manage-room/mana-employee-behavior/mana-employee-behavior.component';   
@NgModule({
    declarations: [
        AppComponent,
        HomepageComponent,
        FooterComponent,
        HeaderComponent,
        ManageAccountComponent,
        ManageEmployeeComponent,
        ManageCustomerComponent,
        ListAllAccountComponent,
        CreateAccEmployeeComponent,
        ListAllEmplComponent,
        EditAccEmployeeComponent,
        ListAllCustomerComponent,
        CreateAccCustomerComponent,
        EditAccCustomerComponent,
        ManageLoginComponent,
        LoginComponent,
        ForgetPassComponent,
        ChangePassComponent,
        ManageRoomComponent,
        ListAllManageComponent,
        ManageRoomInforComponent,
        AddRoomComponent,
        EditRoomComponent,
        BookingRoomComponent,
        ListBookingRoomComponent,
        BookingServiceComponent,
        ListBookingServiceComponent,
        FoodBeverageComponent,
        RentBicycleComponent,
        BookingDetailComponent,
        ListRentBicycleComponent,
        ListFoodBeverageComponent,
        FoodPaymentComponent,
        BicyclePaymentComponent,
        ListBookingDetailComponent,
        BookingHotelComponent,
        BookingConfirmComponent,
        ListBookingHotelComponent,
        ReceptionistComponent,
        ListFunctionComponent,
        RoomStatusComponent,
        CreateBookingComponent,
        ListManaRoomDetailComponent,
        ManaRoomServiceComponent,
        ManaRoomTypesFloorComponent,
        ListRoomTypesFloorComponent,
        EditRoomTypesComponent,
        AddRoomTypesComponent,
        AddRoomFloorComponent,
        EditRoomFloorComponent,
        ListServiceTypeComponent,
        RentBicycleDetailComponent,
        FoodDetailServiceComponent,
        AddVehicleComponent,
        EditVehicleComponent,
        ListBicycleServiceComponent,
        ListFoodServiceComponent,
        AddFoodServiceComponent,
        EditFoodServiceComponent,
        ManaServiceTypesComponent,
        ListManaSerTypeComponent,
        FoodTypeComponent,
        RentBicycleTypeComponent,
        ListFoodTypeComponent,
        AddFoodTypeComponent,
        EditFoodTypeComponent,
        ListRentBicycleTypeComponent,
        AddRentBicycleTypeComponent,
        EditRentBicycleTypeComponent,
        MatConfirmDialogComponent,
        NotiPopupComponent,
        ListManaRoomReceptionistComponent,
        ListRoomStatusComponent,
        RoomStBookingDetailComponent,
        ListStBookingDetailComponent,
        CreateStBookingComponent,
        CreateRecepBookingComponent,
        EditInforBookingComponent,
        ConfirmationDialogComponent,
        PaymentComponent,
        RingbellComponent,
        FoodBookingComponent,
        BicycleBookingComponent,
        ListBicycleBookingComponent,
        PaymentBicycleBookingComponent,
        ListFoodBookingComponent,
        PaymentFoodBookingComponent,
        OrderFoodBookingComponent,
        OrderBicycleBookingComponent,
        ListRecepBookingComponent,
        RecepBookingDetailComponent,
        ListRcBkDetailComponent,
        PaymentRcBkDetailComponent,
        DPaymentRcBkDetailComponent,
        ConfirmErrDialogComponent,
        LoadingComponent,
        ViewProfileComponent,
        ViewOrderComponent,
        FeedBackComponent,
        RegisterComponent,
        FooterNoneComponent,
        HeaderManageComponent,
        ViewProfileManageComponent,
        EditProfileComponent,
        DisplayViewProfileComponent,
        ManaRoomTypesComponent,
        ManaRoomFloorComponent,
        ListMnRoomFloorComponent,
        ListMnRoomTypesComponent,
        ConfirmRecepPaymentComponent,
        ListOdBicycleBookingComponent,
        MakeOdBicycleBookingComponent,
        ConfirmOdBicycleBookingComponent,
        ListOdFoodBookingComponent,
        MakeOdFoodBookingComponent,
        ConfirmOdFoodBookingComponent,
        ListRcBkStatusComponent,
        RatingServicesComponent,
        FeedBackServiceComponent,
        ManaEmployeeBehaviorComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        MatSliderModule,
        MatPaginatorModule,
        MatDialogModule,
        NgxPaginationModule,
        OrderModule,
        FilterPipeModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        NgxSpinnerModule,
        NgbModule,
        DirectivesModule,
        ReactiveFormsModule,
        NgxCaptchaModule,
        BrowserAnimationsModule,
        MdbCheckboxModule,
        MdbCarouselModule,
        FileUploadModule,
        AccordionModule,
        ProgressBarModule
    ]
})
export class AppModule {}
