import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      this.router.navigate([`/${currentUser.id}/albums`]);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl;
  }

  get emailField(): any {
    return this.loginForm.controls.email;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService
      .login(this.emailField.value)
      .pipe(first())
      .subscribe(
        (user: User) => {
          this.loading = false;
          if (user) {
            this.router.navigate([this.returnUrl || `/${user.id}/albums`]);
          } else {
            this.error = 'User not found';
          }
        },
        (error: any) => {
          this.loading = false;
          this.error = error;
        }
      );
  }
}
