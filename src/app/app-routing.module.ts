import { EditAccEmployeeComponent } from './manage-account/manage-employee/edit-acc-employee/edit-acc-employee.component';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { ManageEmployeeComponent } from './manage-account/manage-employee/manage-employee.component';
import { ManageCustomerComponent } from './manage-account/manage-customer/manage-customer.component';
import { ListAllAccountComponent } from './manage-account/list-all-account/list-all-account.component';
import { CreateAccEmployeeComponent } from './manage-account/manage-employee/create-acc-employee/create-acc-employee.component';
import { ListAllEmplComponent } from './manage-account/manage-employee/list-all-empl/list-all-empl.component';
import { ListAllCustomerComponent } from './manage-account/manage-customer/list-all-customer/list-all-customer.component';
import { CreateAccCustomerComponent } from './manage-account/manage-customer/create-acc-customer/create-acc-customer.component';
import { EditAccCustomerComponent } from './manage-account/manage-customer/edit-acc-customer/edit-acc-customer.component';
import { ManageLoginComponent } from './manage-login/manage-login.component';
import { LoginComponent } from './manage-login/login/login.component';
import { ForgetPassComponent } from './manage-login/forget-pass/forget-pass.component';
import { ChangePassComponent } from './manage-login/change-pass/change-pass.component';
import { ManageRoomComponent } from './manage-room/manage-room.component';
import { ListAllManageComponent } from './manage-room/list-all-manage/list-all-manage.component';
import { ManageRoomInforComponent } from './manage-room/manage-room-infor/manage-room-infor.component';
import { AddRoomComponent } from './manage-room/manage-room-infor/add-room/add-room.component';
import { EditRoomComponent } from './manage-room/manage-room-infor/edit-room/edit-room.component';
import { BookingRoomComponent } from './booking-room/booking-room.component';
import { ListBookingRoomComponent } from './booking-room/list-booking-room/list-booking-room.component';
import { ListBookingServiceComponent } from './booking-service/list-booking-service/list-booking-service.component';
import { RentBicycleComponent } from './booking-service/rent-bicycle/rent-bicycle.component';
import { FoodBeverageComponent } from './booking-service/food-beverage/food-beverage.component';
import { BookingServiceComponent } from './booking-service/booking-service.component';
import { BookingDetailComponent } from './booking-room/booking-detail/booking-detail.component';
import { ListRentBicycleComponent } from './booking-service/rent-bicycle/list-rent-bicycle/list-rent-bicycle.component';
import { ListFoodBeverageComponent } from './booking-service/food-beverage/list-food-beverage/list-food-beverage.component';
import { BicyclePaymentComponent } from './booking-service/rent-bicycle/bicycle-payment/bicycle-payment.component';
import { FoodPaymentComponent } from './booking-service/food-beverage/food-payment/food-payment.component';
import { ListBookingDetailComponent } from './booking-room/booking-detail/list-booking-detail/list-booking-detail.component';
import { BookingHotelComponent } from './booking-room/booking-detail/booking-hotel/booking-hotel.component';
import { ListBookingHotelComponent } from './booking-room/booking-detail/booking-hotel/list-booking-hotel/list-booking-hotel.component';
import { BookingConfirmComponent } from './booking-room/booking-detail/booking-hotel/booking-confirm/booking-confirm.component';
import { ReceptionistComponent } from './receptionist/receptionist.component';
import { ListFunctionComponent } from './receptionist/list-function/list-function.component';
import { RoomStatusComponent } from './receptionist/room-status/room-status.component';
import { CreateBookingComponent } from './receptionist/create-booking/create-booking.component';
import { ListManaRoomDetailComponent } from './manage-room/manage-room-infor/list-mana-room-detail/list-mana-room-detail.component';
import { ManaRoomServiceComponent } from './manage-room/mana-room-service/mana-room-service.component';
import { ManaRoomTypesFloorComponent } from './manage-room/mana-room-types-floor/mana-room-types-floor.component';
import { ListRoomTypesFloorComponent } from './manage-room/mana-room-types-floor/list-room-types-floor/list-room-types-floor.component';
import { AddRoomTypesComponent } from './manage-room/mana-room-types-floor/mana-room-types/add-room-types/add-room-types.component';
import { EditRoomTypesComponent } from './manage-room/mana-room-types-floor/mana-room-types/edit-room-types/edit-room-types.component';
import { AddRoomFloorComponent } from './manage-room/mana-room-types-floor/mana-room-floor/add-room-floor/add-room-floor.component';
import { EditRoomFloorComponent } from './manage-room/mana-room-types-floor/mana-room-floor/edit-room-floor/edit-room-floor.component';
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
import { ListManaRoomReceptionistComponent } from './receptionist/create-booking/list-mana-room-receptionist/list-mana-room-receptionist.component';
import { CreateRecepBookingComponent } from './receptionist/create-booking/create-recep-booking/create-recep-booking.component';
import { ListRoomStatusComponent } from './receptionist/room-status/list-room-status/list-room-status.component';
import { RoomStBookingDetailComponent } from './receptionist/room-status/room-st-booking-detail/room-st-booking-detail.component';
import { ListStBookingDetailComponent } from './receptionist/room-status/room-st-booking-detail/list-st-booking-detail/list-st-booking-detail.component';
import { CreateStBookingComponent } from './receptionist/room-status/room-st-booking-detail/create-st-booking/create-st-booking.component';
import { EditInforBookingComponent } from './receptionist/create-booking/edit-infor-booking/edit-infor-booking.component';
import { PaymentComponent } from './payment/payment.component';
import { RingbellComponent } from './receptionist/ringbell/ringbell.component';
import { ListBicycleBookingComponent } from './receptionist/bicycle-booking/list-bicycle-booking/list-bicycle-booking.component';
import { ListFoodBookingComponent } from './receptionist/food-booking/list-food-booking/list-food-booking.component';
import { PaymentFoodBookingComponent } from './receptionist/food-booking/payment-food-booking/payment-food-booking.component';
import { PaymentBicycleBookingComponent } from './receptionist/bicycle-booking/payment-bicycle-booking/payment-bicycle-booking.component';
import { BicycleBookingComponent } from './receptionist/bicycle-booking/bicycle-booking.component';
import { FoodBookingComponent } from './receptionist/food-booking/food-booking.component';
import { OrderFoodBookingComponent } from './receptionist/food-booking/order-food-booking/order-food-booking.component';
import { OrderBicycleBookingComponent } from './receptionist/bicycle-booking/order-bicycle-booking/order-bicycle-booking.component';
import { ListRecepBookingComponent } from './receptionist/create-booking/create-recep-booking/list-recep-booking/list-recep-booking.component';
import { RecepBookingDetailComponent } from './receptionist/create-booking/create-recep-booking/recep-booking-detail/recep-booking-detail.component';
import { ListRcBkDetailComponent } from './receptionist/create-booking/create-recep-booking/recep-booking-detail/list-rc-bk-detail/list-rc-bk-detail.component';
import { PaymentRcBkDetailComponent } from './receptionist/create-booking/create-recep-booking/recep-booking-detail/payment-rc-bk-detail/payment-rc-bk-detail.component';
import { DPaymentRcBkDetailComponent } from './receptionist/create-booking/create-recep-booking/recep-booking-detail/d-payment-rc-bk-detail/d-payment-rc-bk-detail.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { FeedBackComponent } from './feed-back/feed-back.component';
import { RegisterComponent } from './register/register.component';
import { ViewProfileManageComponent } from './view-profile-manage/view-profile-manage.component';
import { EditProfileComponent } from './view-profile/edit-profile/edit-profile.component';
import { DisplayViewProfileComponent } from './view-profile/display-view-profile/display-view-profile.component';
import { ManaRoomFloorComponent } from './manage-room/mana-room-types-floor/mana-room-floor/mana-room-floor.component';
import { ManaRoomTypesComponent } from './manage-room/mana-room-types-floor/mana-room-types/mana-room-types.component';
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
import { ManaEmployeeBehaviorComponent } from './manage-room/mana-employee-behavior/mana-employee-behavior.component';
const routes: Routes = [
  { path: '*', redirectTo: '/', pathMatch: 'full' },
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  {
    path: 'manage-login',
    component: ManageLoginComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'forget-pass', component: ForgetPassComponent },
      { path: 'change-pass', component: ChangePassComponent },
    ],
  },
  {
    path: 'manage-account',
    component: ManageAccountComponent,
    children: [
      { path: '', component: ListAllAccountComponent },
      // manage-employee
      {
        path: 'manage-employee',
        component: ManageEmployeeComponent,
        children: [
          {
            path: '',
            component: ListAllEmplComponent,
          },
          {
            path: 'createAcc-employee',
            component: CreateAccEmployeeComponent,
          },
          {
            path: 'editAcc-employee/:id',
            component: EditAccEmployeeComponent,
          },
        ],
      },
      // manage-customer
      {
        path: 'manage-customer',
        component: ManageCustomerComponent,
        children: [
          {
            path: '',
            component: ListAllCustomerComponent,
          },
          {
            path: 'createAcc-customer',
            component: CreateAccCustomerComponent,
          },
          {
            path: 'editAcc-customer/:id',
            component: EditAccCustomerComponent,
          },
        ],
      },
      { path: 'manage-customer', component: ManageCustomerComponent },
    ],
  },
  // manage-room-admin
  {
    path: 'manage-room',
    component: ManageRoomComponent,
    children: [
      { path: '', component: ListAllManageComponent },
      {
        path: 'manage-room-infor',
        component: ManageRoomInforComponent,
        children: [
          // { path: '', component: ListAllRoomInforComponent },
          { path: '', component: ListManaRoomDetailComponent },
          { path: 'add-room', component: AddRoomComponent },
          { path: 'edit-room/:id', component: EditRoomComponent },
        ],
      },
      {
        path: 'mana-room-service',
        component: ManaRoomServiceComponent,
        children: [
          {
            path: '',
            component: ListServiceTypeComponent,
          },
          {
            path: 'rent-bicycle-detail',
            component: RentBicycleDetailComponent,
            children: [
              { path: '', component: ListBicycleServiceComponent },
              { path: 'add-vehicle', component: AddVehicleComponent },
              { path: 'edit-vehicle/:id', component: EditVehicleComponent },
            ],
          },
          {
            path: 'food-detail-service',
            component: FoodDetailServiceComponent,
            children: [
              { path: '', component: ListFoodServiceComponent },
              { path: 'add-food-service', component: AddFoodServiceComponent },
              {
                path: 'edit-food-service/:id',
                component: EditFoodServiceComponent,
              },
            ],
          },
        ],
      },
      {
        path:'mana-employee-behavior',
        component: ManaEmployeeBehaviorComponent
      },
      {
        path: 'mana-room-types-floor',
        component: ManaRoomTypesFloorComponent,
        children: [
          { path: '', component: ListRoomTypesFloorComponent },
          {
            path: 'mana-room-floor',
            component: ManaRoomFloorComponent,
            children: [
              { path: '', component: ListMnRoomFloorComponent },
              { path: 'add-room-floor', component: AddRoomFloorComponent },
              {
                path: 'edit-room-floor/:id',
                component: EditRoomFloorComponent,
              },
            ],
          },
          {
            path: 'mana-room-types',
            component: ManaRoomTypesComponent,
            children: [
              { path: '', component: ListMnRoomTypesComponent },
              { path: 'add-room-types', component: AddRoomTypesComponent },
              {
                path: 'edit-room-types/:id',
                component: EditRoomTypesComponent,
              },
            ],
          },
        ],
      },
      {
        path: 'mana-service-types',
        component: ManaServiceTypesComponent,
        children: [
          { path: '', component: ListManaSerTypeComponent },
          {
            path: 'food-type',
            component: FoodTypeComponent,
            children: [
              { path: '', component: ListFoodTypeComponent },
              { path: 'add-food-type', component: AddFoodTypeComponent },
              { path: 'edit-food-type/:id', component: EditFoodTypeComponent },
            ],
          },
          {
            path: 'rent-bicycle-type',
            component: RentBicycleTypeComponent,
            children: [
              { path: '', component: ListRentBicycleTypeComponent },
              {
                path: 'add-rent-bicycle-type',
                component: AddRentBicycleTypeComponent,
              },
              {
                path: 'edit-rent-bicycle-type/:id',
                component: EditRentBicycleTypeComponent,
              },
            ],
          },
        ],
      },
    ],
  },
  // booking-room
  {
    path: 'booking-room',
    component: BookingRoomComponent,
    children: [
      { path: '', component: ListBookingRoomComponent },
      {
        path: 'booking-detail/:id/:checkin/:checkout/:numberOfRoom/:price/:typeRoomName',
        component: BookingDetailComponent,
        children: [
          { path: '', component: ListBookingDetailComponent },
          {
            path: 'booking-hotel',
            component: BookingHotelComponent,
            children: [
              { path: '', component: ListBookingHotelComponent },
              { path: 'booking-confirm', component: BookingConfirmComponent },
            ],
          },
        ],
      },
    ],
  },
  // booking-service
  {
    path: 'booking-service',
    component: BookingServiceComponent,
    children: [
      { path: '', component: ListBookingServiceComponent },
      {
        path: 'rent-bicycle',
        component: RentBicycleComponent,
        children: [
          { path: '', component: ListRentBicycleComponent },
          { path: 'bicycle-payment', component: BicyclePaymentComponent },
        ],
      },
      {
        path: 'food-beverage',
        component: FoodBeverageComponent,
        children: [
          { path: '', component: ListFoodBeverageComponent },
          { path: 'food-payment', component: FoodPaymentComponent },
        ],
      },

    ],
  },
  // receptionist
  {
    path: 'receptionist',
    component: ReceptionistComponent,
    children: [
      {
        path: '',
        component: ListFunctionComponent,
      },
      {
        path: 'room-status',
        component: RoomStatusComponent,
        children: [
          { path: '', component: ListRoomStatusComponent },
          {
            path: 'room-st-booking-detail',
            component: RoomStBookingDetailComponent,
            children: [
              { path: '', component: ListStBookingDetailComponent },
              {
                path: 'create-st-booking',
                component: CreateStBookingComponent,
              },
            ],
          },
        ],
      },
      {
        path: 'create-booking',
        component: CreateBookingComponent,
        children: [
          { path: '', component: ListManaRoomReceptionistComponent },
          {
            path: 'create-recep-booking',
            component: CreateRecepBookingComponent,
            children: [
              { path: '', component: ListRecepBookingComponent },
              {
                path: 'recep-booking-detail/:id/:checkin/:checkout/:numberOfRoom/:price/:typeRoomName',
                component: RecepBookingDetailComponent,
                children: [
                  { path: '', component: ListRcBkDetailComponent },
                  {
                    path: 'payment-rc-bk-detail',
                    component: PaymentRcBkDetailComponent,
                  },
                  {
                    path: 'd-payment-rc-bk-detail',
                    component: DPaymentRcBkDetailComponent,
                  },
                  {
                    path: 'confirm-recep-payment',
                    component: ConfirmRecepPaymentComponent,
                  },
                  {
                    path: 'list-rc-bk-status',
                    component: ListRcBkStatusComponent,
                  },
                ],
              },
            ],
          },
          { path: 'edit-infor-booking', component: EditInforBookingComponent },
        ],
      },
      { path: 'ringbell', component: RingbellComponent },
      {
        path: 'bicycle-booking',
        component: BicycleBookingComponent,
        children: [
          { path: '', component: ListBicycleBookingComponent },
          {
            path: 'payment-bicycle-booking',
            component: PaymentBicycleBookingComponent,
          },
          {
            path: 'order-bicycle-booking',
            component: OrderBicycleBookingComponent, children: [
              {path:'',component:ListOdBicycleBookingComponent},
              {path:'make-od-bicycle-booking',component:MakeOdBicycleBookingComponent},
              {path:'confirm-od-bicycle-booking',component:ConfirmOdBicycleBookingComponent},
            ]
          },
          
        ],
      },
      {
        path: 'food-booking',
        component: FoodBookingComponent,
        children: [
          { path: '', component: ListFoodBookingComponent },
          {
            path: 'payment-food-booking',
            component: PaymentFoodBookingComponent,
          },
          { path: 'order-food-booking', component: OrderFoodBookingComponent, children: [
            {path:'',component:ListOdFoodBookingComponent},
            {path:'make-od-food-booking',component:MakeOdFoodBookingComponent},
            {path:'confirm-od-food-booking',component:ConfirmOdFoodBookingComponent},
          ] },
        ],
      },

    ],
  },
  { path: 'payment', component: PaymentComponent },
  {
    path: 'view-profile',
    component: ViewProfileComponent,
    children: [
      { path: '', component: DisplayViewProfileComponent },
      { path: 'edit-profile', component: EditProfileComponent },
    ],
  },
  { path: 'view-profile-manage', component: ViewProfileManageComponent },
  { path: 'view-order', component: ViewOrderComponent },
  { path: 'feed-back', component: FeedBackComponent },
  { path: 'feed-back-service', component: FeedBackServiceComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'rating-services', component: RatingServicesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
