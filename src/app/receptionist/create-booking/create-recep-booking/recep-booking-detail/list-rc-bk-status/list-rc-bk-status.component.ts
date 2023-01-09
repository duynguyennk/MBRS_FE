import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingComponent } from 'src/app/constant/loading';
import { SearchRoom } from 'src/app/model/searchRoom';
import { OrderRoomService } from 'src/app/services/order-room.service';

@Component({
  selector: 'app-list-rc-bk-status',
  templateUrl: './list-rc-bk-status.component.html',
  styleUrls: ['./list-rc-bk-status.component.css']
})
export class ListRcBkStatusComponent implements OnInit {

  isLoading = false
  roomInformation : any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 4;
  fullName : any;
  orderHeader : String = '';
  isDescOrder :boolean = true;
  typeRoomInformation : any;
  ratingList :any;
  ratingPercent: any;
  searchInformation:any;
  constructor(private route: ActivatedRoute,private orderRoomService : OrderRoomService, private router:Router) { }

  public show:boolean = false;
  public buttonName:any = 'Show';

  ngOnInit () { 
    window.scrollTo(0, 0);
    this.loadSnipper()
    this.getInformationTypeRoom();
    this.getListRating();
    this.getRatingPercent();
    this.searchInformation= new SearchRoom(this.route.snapshot.params['id'],this.route.snapshot.params['checkin'],this.route.snapshot.params['checkout'],this.route.snapshot.params['numberOfRoom'],this.route.snapshot.params['price'],this.route.snapshot.params['typeRoomName'])
    localStorage.setItem('searchInformation', JSON.stringify(this.searchInformation));
   }

  getInformationTypeRoom()
  {
    this.orderRoomService.getDetailInformationTypeRooms(this.route.snapshot.params['id']).subscribe(res=>{
      this.typeRoomInformation=res.data
    })
  }
  getListRating()
  {
    this.orderRoomService.getRatingList(this.route.snapshot.params['id']).subscribe(res=>{
      this.ratingList=res.data
      this.page=1;
    })
  }
  getRatingPercent()
  {
    this.orderRoomService.getRatingPercent(this.route.snapshot.params['id']).subscribe(res=>{
      this.ratingPercent=res.data
    })
  }
  onTableDataChange(event: any) {
    this.page = event
  }
  toggle() {
    this.show = !this.show;
    if(this.show)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }
  loadSnipper(){
    this.isLoading = true
    setTimeout(()=>(this.isLoading=false),LoadingComponent.timeLoad)
  }
}
