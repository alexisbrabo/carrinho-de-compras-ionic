import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { CarrinhoProvider } from '../../providers/carrinho/carrinho';
import { ListaDetailsPage } from '../lista-details/lista-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  entryComponents: [ListaDetailsPage]
})
export class HomePage {
  carrinhos: Array<any>;
  carrinho: any;

  constructor(public navCtrl: NavController, private carrinhoProvider: CarrinhoProvider, private alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    this.carrinhoProvider.listarCarrinhos().subscribe(response => this.carrinhos = response);
  }

  adicionarCarrinho() {
    this.carrinhoProvider.adicionarCarrinho(this.carrinho).subscribe(response => {

      this.ionViewDidLoad();
    })
  }

  removeCarrinho(carrinhoId) {
    const confirm = this.alertCtrl.create({
      title: 'Exclusão carrinho',
      message: 'Deseja mesmo deletar este carrinho de compras?',
      buttons: [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          handler: () => {
            this.carrinhoProvider.removerCarrinho(carrinhoId).subscribe(response => {

              this.ionViewDidLoad();
            })
          }
        }
      ]
    });
    confirm.present();

  }

  selecionarLista(carrinhoId) {
    this.navCtrl.push(ListaDetailsPage, { 'carrinhoId': carrinhoId });

  }

}
