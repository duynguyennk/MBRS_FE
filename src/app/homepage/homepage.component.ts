import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { LoadingComponent } from '../constant/loading';
import { SignalrService } from '../services/signalr.service';
import { HttpClient } from '@angular/common/http';
import { MdbCarouselComponent } from 'mdb-angular-ui-kit/carousel';
import { Router } from '@angular/router';

const style1 = style({
  opacity: 1,
  transform: 'translateY(0)',
});

const style2 = style({
  opacity: 0,
  transform: 'translateY(100%)',
});

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  animations: [
    trigger('foobar', [
      state('hide', style2),
      state('show', style1),
      transition('hide => show', animate('1000ms ease-in')),
      transition('show => hide', animate('1000ms ease-out')),
    ]),
  ],
})
export class HomepageComponent implements OnInit {
  currentRate = 3
  isLoading = false;
  state = 'hide';
  counter = 0;
  role:any;
  //  @ViewChild('carousel') carousel!: MdbCarouselComponent;

  slideItems = [
    { src: '/assets/images/homepage/hotay1.jpg', title: 'Title 1' },
    { src: '/assets/images/homepage/roomrp1.jpg', title: 'Title 2' },
    { src: '/assets/images/homepage/roomrp.jpg', title: 'Title 3' },
    { src: '/assets/images/homepage/roomrp.jpg', title: 'Title 4' },
    { src: '/assets/images/homepage/hotay1.jpg', title: 'Title 5' }
  ];
  showNextImage() {
    if (this.counter < this.slideItems.length - 1) {
      this.counter += 1;
    }
  }

  showPreviousImage() {
    if (this.counter >= 1) {
      this.counter = this.counter - 1;
    }
  }
  constructor(public el: ElementRef, public signalRService: SignalrService, private http: HttpClient,private router: Router) {

  }
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;
    if (scrollPosition >= componentPosition - 200) {
      this.state = 'show';
    } else {
      this.state = 'hide';
    }
  }
  public show: boolean = false;
  public buttonName: any = 'Show';

  ngOnInit() {
    this.loadSnipper()
    window.scrollTo(0, 0);
    this.role = localStorage.getItem("Role");
    if (this.role === 'AM') {
      this.router.navigate(['manage-account']);
    } else if (this.role === 'MN') {
      this.router.navigate(['manage-room']);
    } else if (this.role === 'LT') {
      this.router.navigate(['receptionist']);
    }
  }
  private startHttpRequest = () => {
    this.http.get('https://localhost:7076/v1/api/notification/SendNotification')
      .subscribe(res => {
        console.log(res);
      })
  }
  toggle() {
    this.show = !this.show;
    if (this.show)
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }

  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }

}
