import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  EmailFormControl = new FormControl();
  PasswordFormControl = new FormControl('', Validators.pattern('[a-z].{8,}'));
  MobileFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^098/),
  ]);
  matcher = new MyErrorStateMatcher();

  constructor(public http: HttpClient, public router: Router) {}
  check() {
    this.http.post('https://localhost:7079/adminlogin'
    ,{username:this.MobileFormControl.value,password:this.PasswordFormControl.value}).subscribe(result=>{
      if((result as any).isOK==true){
        console.log("hi")
        this.router.navigateByUrl('/dashboard');
      }
    })

  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
