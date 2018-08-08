import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaDetailsPage } from './lista-details';

@NgModule({
  declarations: [
    ListaDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaDetailsPage),
  ],
})
export class ListaDetailsPageModule {}
