import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { FormGroup, FormControl} from '@angular/forms';
import { LoginService } from './login.service';
import { Router,ActivatedRoute,ParamMap  } from '@angular/router';
import {ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('closeBtn') closeBtn: ElementRef;

  userName: string = "Guest";
  token : string = "";
  isNotLogin = true;
  constructor(private _loginService: LoginService, private route: ActivatedRoute, private router: Router){
    
  }

  ngOnInit(){
  }

  loginForm = new FormGroup({
    userId: new FormControl(''),
    password: new FormControl('')
  });
  
  
  onSubmit(){
    this.closeModal();
    this._loginService.login(this.loginForm.value).subscribe(
      response => {
        var obj = JSON.stringify(response);
        obj = JSON.parse(obj);
        if(obj.auth==1) {
          
          localStorage.setItem('currentUser',JSON.stringify({name: obj.name, id: obj.userid}))
          this.isNotLogin = false;
          this.getCurrentUser();
          this.router.navigate(['dashboard'])

        }
        else alert("Incorrect")
      }
      
    );
  }

  getCurrentUser(){
    this.token = localStorage.getItem('currentUser') 
    var obj = JSON.parse(this.token);
    this.userName = obj.name;
  }

  


  logOut(){
    localStorage.removeItem('currentUser')
    this.isNotLogin = true;
    this.userName = "Guest";
    this.router.navigate(['/'])
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
}

 
}
