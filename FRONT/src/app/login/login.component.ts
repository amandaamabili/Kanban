import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  errorMessage: boolean = false;
  constructor(
    public api: APIService,
    public router: Router,
  ) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+')]),
      senha: new FormControl('', Validators.required),
    });
  }
  get f(){
    return this.form.controls;
  }
  submit(): void {
    this.api
      .getAuthorization(
        this.form.value.login,
        this.form.value.senha
      )
      .subscribe((token) => {
        if (!token) {
          this.form.reset();
          this.api.clearAuthorization();
         this.errorMessage = true;
        } else {
          this.api.Authorization(token);
          const redirectUrl = '/kanban';
          this.router.navigate([redirectUrl]);

        }


      });
  }

}
