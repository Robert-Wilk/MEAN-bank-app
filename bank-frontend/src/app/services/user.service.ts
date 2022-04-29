import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const USER_API_URL = 'http://localhost:8080/api/user/';
const ACCOUNT_API_URL = 'http://localhost:8080/api/account/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }
  
  getUserInfo(): Observable<any> {
    return forkJoin([
      this.http.get(USER_API_URL + 'read', httpOptions),
      this.http.get(ACCOUNT_API_URL + 'readAll', httpOptions)
    ]).pipe(
      map((data: any[]) => {
        let user: any = data[0]
        let accounts: any[] = data[1]
        return data
      })
    )
  }
  createCheckingAccount(): Observable<any> {
    return this.http.post(ACCOUNT_API_URL + 'create', {
      accountType: 'Checking',
      amount: 0.00,
      accountOwner: this.tokenService.getUser
    }, httpOptions)
  }
  createSavingsAccount(): Observable<any> {
    return this.http.post(ACCOUNT_API_URL + 'create', {
      accountType: 'Savings',
      amount: 0.00,
      accountOwner: this.tokenService.getUser
    }, httpOptions)
  }
  
}
