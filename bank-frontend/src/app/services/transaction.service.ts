import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/transaction/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private http: HttpClient) { }
  
  getTransaction(transactionID: any, accountID: any): Observable<any> {
    return this.http.get(API_URL + 'read/' + transactionID + "/" + accountID, httpOptions);
  }
  getTransactions(accountID: any): Observable<any> {
    return this.http.get(API_URL + 'readAll/' + accountID, httpOptions);
  }
  
}
