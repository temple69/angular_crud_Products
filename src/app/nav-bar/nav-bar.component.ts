import { Component,OnInit,OnDestroy } from '@angular/core';
import { AuthService } from '../service/Auth/auth.service';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit,OnDestroy {
  public authListenerSubs?: Subscription;  
  public isUserAuthenticated:boolean=false
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.isUserAuthenticated=this.authService.getIsAuthenticated()
    this.authListenerSubs=this.authService.getAuthenticationStatusListener().subscribe(userAuthenticated=>{
      this.isUserAuthenticated=userAuthenticated
    })
      
  }
  ngOnDestroy(): void {
      this.authListenerSubs?.unsubscribe()
  }
  OnLogout(){
    this.authService.logout()
  
  }

}
