import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CarrinhoProvider } from '../../providers/carrinho/carrinho';
import { Produto } from '../../models/produto';

/**
 * Generated class for the ListaDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-details',
  templateUrl: 'lista-details.html',
})

export class ListaDetailsPage {
  carrinhoId: Number;
  produtos: Array<any>;
  produto: Produto;

  constructor(public navCtrl: NavController, public navParams: NavParams, private carrinhoProvider: CarrinhoProvider,
    public alertCtrl: AlertController) {
    this.carrinhoId = navParams.get('carrinhoId');
  }

  addProduto() {
    let alert = this.alertCtrl.create({
      title: 'Produto',
      message: 'Digite as informações do produto abaixo',
      inputs: [
        {
          name: 'nome',
          placeholder: 'Nome'
        },
        {
          name: 'valor',
          placeholder: 'Valor',
          type: 'Number'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salvar',
          handler: data => {
            this.produto = new Produto();
            this.produto.valor = data.valor;
            this.produto.nome = data.nome;
            this.produto.listacompra_id = this.carrinhoId;
            this.carrinhoProvider.adicionarProduto(this.produto).subscribe(response => {
              this.ionViewDidLoad();
            })

            console.log('cadastro completo');
          }
        }
      ]
    });

    alert.present();
  }

  ionViewDidLoad() {
    this.carrinhoProvider.listarProdutos(this.carrinhoId).subscribe(response => this.produtos = response);
  }

}
