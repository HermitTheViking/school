import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  doLogout(): void {
    this.authService.doLogout()
      .then(
        () => this.router.navigate(['/auth/login']),
        err => this.errorMessage = err
      );
  }

}
