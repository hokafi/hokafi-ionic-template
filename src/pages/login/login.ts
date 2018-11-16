import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/AuthServiceProvider/AuthServiceProvider';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };

  constructor(private nav: NavController, private auth: AuthServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

  public createAccount() {
    this.nav.push(RegisterPage);
  }

  public login() {
    this.showLoading()
    console.log(this.registerCredentials)
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      console.log(allowed)
      if (allowed) {
        this.nav.setRoot(HomePage);
      } else {
 
        this.showError("Access Denied");
      }
    },
      error => {
        console.log(error)
        this.showError(error);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    // alert.present(prompt);
  }
}