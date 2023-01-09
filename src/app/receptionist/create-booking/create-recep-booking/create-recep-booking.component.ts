import { Component, OnInit } from '@angular/core';
import { SearchRoom } from 'src/app/model/searchRoom';
import { OrderRoomService } from 'src/app/services/order-room.service';

@Component({
  selector: 'app-create-recep-booking',
  templateUrl: './create-recep-booking.component.html',
  styleUrls: ['./create-recep-booking.component.css']
})
export class CreateRecepBookingComponent implements OnInit {
  typeRoomList: any;
  informationSearch : any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 6;
  constructor(private orderRoomService: OrderRoomService) { }

  ngOnInit(): void {
  }
  onSearchChange(searchRoom: SearchRoom) {
    this.informationSearch=searchRoom;
    this.orderRoomService.getTypeRooms(searchRoom).subscribe((res) => {
      this.typeRoomList = res.data;
      this.page = 1;
    })
  }
  onTableDataChange(event: any) {
    this.page = event
  }

}
