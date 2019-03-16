import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../navigation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor( 
    public navigation: NavigationService,
    public router: Router
    ) { }

  ngOnInit() {
    this.navigation.show();
  }

  signout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

}
