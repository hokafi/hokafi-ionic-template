import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, MenuController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/AuthServiceProvider/AuthServiceProvider';
import { ListPage } from '../list/list';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = ListPage;
  pages: Array<{ title: string, component: any }>;
  email;
  name;
  picture;
  constructor(public navCtrl: NavController, public auth: AuthServiceProvider, public menu: MenuController) {
    this.pages = [
      { title: 'Home', component: HomePage }
    ];


  }
  ionViewDidLoad() {
    console.log("Home Page ");
    this.auth.getUserInfo().subscribe(info => {
      console.log(info)
      this.name = info['name']; 
      this.email = info['email'];
      this.picture = info['picture'];
    });

  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  public logout() {
    this.auth.logout().subscribe(succ => {
      this.menu.close();
      this.menu.enable(false);
      this.nav.setRoot(LoginPage, {}, { animate: true, duration: 500, })
    });
  }
}
