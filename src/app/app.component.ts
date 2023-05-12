import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/Auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}
  title = 'angular_test';
  ngOnInit(): void {
    //sets token to local storage when app mounts
    this.authService.userAuthentication();
  }
}
