import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, private carrinhoProvider: CarrinhoProvider) {

  }

  ionViewDidLoad() {
    this.carrinhoProvider.listarCarrinhos().subscribe(response => this.carrinhos = response);
  }

  adicionarCarrinho(){
    this.carrinhoProvider.adicionarCarrinho(this.carrinho).subscribe(response => {

      this.ionViewDidLoad();
    })
  }

  selecionarLista(carrinhoId) {
    this.navCtrl.push(ListaDetailsPage, { 'carrinhoId': carrinhoId});
        
  }

}
