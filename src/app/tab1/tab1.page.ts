import { Component, resolveForwardRef } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from '../groceries-service.service';
import { InputDialogServiceService } from '../input-dialog-service.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',

  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  [x: string]: any;
  
  
 


  title = "Grocery";

 
  constructor(public navCtrl: NavController, private toastController: ToastController, public alertCtrl: AlertController, public dataService: GroceriesServiceService, 
    public inputDialogService: InputDialogServiceService,public modalCtrl: ModalController, public socialSharing: SocialSharing)  {}
  

  loadItems() {
    
    return this.dataService.getItems();
  }

  async removeItem(item:any, index:any) {
    console.log("Removing Item - ", item, index);
    
    const toast = await this.toastController.create({
      message:'Removing item -' + index + "...",
      duration: 3000
    });
    toast.present();

    this.dataService.removeItem(index);
  }

  async shareItem(item: any, index: any) {
    console.log("Sharing Item - ", item, index);
  
    const toast = await this.toastController.create({
      message: 'Sharing item -' + index + "...",
      duration: 3000
    });
  
    toast.present();
    
    let message = "Grocery Item - Name: " + item.name + " - Quantity: " + item.quanity;
    let subject = "Shared via Grocery app";
    
    this.socialSharing.share(message, subject).then(() => {
      console.log("Shared Successfully!");
    }).catch((error) => {
      console.error("Error while sharing", error);
    });
    
   
  }

  async editItem(item:any, index:any) {
    console.log("Edit Item - ", item, index);
    
    const toast = await this.toastController.create({
      message:'Editing item -' + index + "...",
      duration: 3000
    });
    toast.present();
    this.inputDialogService.showPrompt(item ,index);
    
  }

  async addItem() {
    console.log("Add Item");
    
    this.inputDialogService.showPrompt();
  }

  

 



}
