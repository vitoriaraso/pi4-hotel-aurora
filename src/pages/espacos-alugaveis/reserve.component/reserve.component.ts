import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reserve',
  imports: [],
  standalone: true,
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

    ngOnInit(): void {
      this.scrollToTop();
    }
}
