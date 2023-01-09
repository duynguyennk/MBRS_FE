import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'loading',
  template: `
    <div id="pause" class="d-flex align-items-center justify-content-center">
 <div id="spinner">
 </div>
 <p class="text-white mb-0">Đang Tải...</p>

 </div>

  `,
  styleUrls: ['loading.scss'],
})
export class LoadingComponent {
  public static readonly timeLoad = 600;
}

// <div id="pause" class="d-flex align-items-center justify-content-center">
// <div id="spinner"></div>
// </div>
// <div class="loader">
// <span></span>
// <span></span>
// <span></span>
// <span></span>
// </div>