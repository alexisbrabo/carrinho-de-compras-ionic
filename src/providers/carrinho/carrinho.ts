import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Produto } from '../../models/produto';

/*
  Generated class for the CarrinhoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CarrinhoProvider {

  private api = "http://127.0.0.1:5000";

  constructor(public http: HttpClient) {
    console.log('Hello CarrinhoProvider Provider');
  }

  listarCarrinhos(): Observable<any> {
    return this.http.get<any>(`${this.api}/listacompras`);
  }

  adicionarCarrinho(carrinho: any): Observable<any> {
    return this.http.post<any>(`${this.api}/listacompras`, carrinho);
  }

  removerCarrinho(id: any): Observable<any> {
    return this.http.delete<any>(`${this.api}/listacompras/${id}`);
  }

  adicionarProduto(produto: Produto): Observable<any> {
    return this.http.post<any>(`${this.api}/produto`, produto);
  }

  atualizarProduto(id: Number, produto: Produto): Observable<any> {
    return this.http.post<any>(`${this.api}/produto/atualizar/${id}`, produto);
  }

  removerProduto(id: Number): Observable<any> {
    return this.http.delete<any>(`${this.api}/produto/${id}`);
  }

  listarProdutos(id: any): Observable<any> {
    return this.http.get<any>(`${this.api}/produto/carrinho/${id}`);
  }

}
