import { KeycloakService } from './../../keycloak/keycloak.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private kc: KeycloakService) { }
  // menus = [
  //   { route: 'admin/subject', title_a: 'Subject', title_b: 'Area', description: 'Subject Area' },
  //   { route: 'admin/multi-choice', title_a: 'Question', title_b: 'Question', description: 'Question Preparation' }
  // ];

  loggedUsername: string = null;

  ngOnInit() {
    //this.loggedUsername = KeycloakService.getFullName();
  }

  logout() {
    //KeycloakService.logout();
  }

  onSubmenuSelect(submenu) {
    if (submenu.route && submenu.route != '') {
      this.router.navigate([submenu.route], { relativeTo: this.route });
    }
  }
}
