import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
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
    public alertCtrl: AlertController, private toastCtrl: ToastController) {
    this.carrinhoId = navParams.get('carrinhoId');
  }

  addProduto() {
    let alert = this.alertCtrl.create({
      title: 'Produto',
      message: 'Cadastre as informações do produto abaixo',
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
            if (data.nome == "") {
              this.erroCadastro();
              return;
            }
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

  updateProduto(item: Produto) {
    let alert = this.alertCtrl.create({
      title: 'Produto',
      message: 'Atualize as informações do produto abaixo',
      inputs: [
        {
          name: 'nome',
          placeholder: 'Nome',
          value: item.nome
        },
        {
          name: 'valor',
          placeholder: 'Valor',
          type: 'Number',
          value: !item.valor ? "" : item.valor.toString()
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancel clicked al');
          }
        },
        {
          text: 'Atualizar',
          handler: data => {
            if (data.nome == "") {
              this.erroCadastro();
              return;
            }
            item.valor = data.valor;
            item.nome = data.nome;
            item.listacompra_id = this.carrinhoId;
            this.carrinhoProvider.atualizarProduto(item.id).subscribe(response => {
              this.ionViewDidLoad();
            })

            console.log('autalização completa');
          }
        }
      ]
    });

    alert.present();
  }

  erroCadastro() {
    let toast = this.toastCtrl.create({
      message: 'O nome do produto precisa ser preenchido!',
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }

  ionViewDidLoad() {
    this.carrinhoProvider.listarProdutos(this.carrinhoId).subscribe(response => this.produtos = response);
  }

}
