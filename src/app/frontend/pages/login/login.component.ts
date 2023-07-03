import { Component } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ApiService } from 'src/app/services/api.service';
import { Login, Response } from 'src/app/model/interfaces.interface';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm:any = new FormGroup({
    Email : new FormControl('',Validators.required),
    Password: new FormControl('', Validators.required)
  })

  constructor(private api: ApiService, private router:Router){}

  onSubmit(form:Login){
    this.api.login(form).subscribe(data => {
      const token = 'Bearer ' + data.token;
      console.log(token);
      localStorage.setItem('token', token);
      this.router.navigate(['dashboard'])
    });
  }
}

