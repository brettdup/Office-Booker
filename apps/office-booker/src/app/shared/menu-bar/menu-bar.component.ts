import { ChangeDetectorRef, Component, OnInit, HostListener } from '@angular/core';
import { AppComponent } from '../../app.component';
import { CognitoService } from '../../cognito.service';
import { BookingServiceService, employee } from '../../services/booking-service.service';

@Component({
  selector: 'office-booker-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
})
export class MenuBarComponent {

  admin = false;
  guest = true;
  authenticated = false;
  email = "";
  loggedIn = false;


  constructor(private app: AppComponent,
    private cognitoService: CognitoService, 
    ) {
      if ((localStorage.getItem("CognitoIdentityServiceProvider.4fq13t0k4n7rrpuvjk6tua951c.LastAuthUser"))) {
        this.loggedIn = true;
      } else this.loggedIn = false;
    this.admin = this.cognitoService.authenticated();
    this.guest = this.cognitoService.guest();
    this.authenticated = this.cognitoService.admin();
    this.email = this.cognitoService.getEmailAddress();
      
  }

  ngOnInit() {
    if ((localStorage.getItem("CognitoIdentityServiceProvider.4fq13t0k4n7rrpuvjk6tua951c.LastAuthUser"))) {
      this.loggedIn = true;
    } else this.loggedIn = false;
    this.admin = this.cognitoService.authenticated();
    this.guest = this.cognitoService.guest();
    this.authenticated = this.cognitoService.admin();
    this.email = this.cognitoService.getEmailAddress();

    
  }

  signOut(): void {
    this.cognitoService.signOut();
    this.loggedIn = false;
    this.isAuthenticated();
    this.app.signOut();
  }
  

  isAuthenticated(): boolean {
    return this.cognitoService.loggedIn();
    // return this.cognitoService.authenticated();
  }

  isAdmin(): boolean {
    return this.cognitoService.admin();
  }

  isNotGuest(): boolean {
    // console.log("isNotGuest");
    return !(this.cognitoService.guest());
    // return !(this.cognitoService.guest()) && this.cognitoService.loggedIn();
  }

  isEmailAddress(): boolean {
    this.email = this.cognitoService.getEmailAddress();
    if (this.email != null && this.isAuthenticated() ){
      return true;
    }
    return false;
  }
    


}


