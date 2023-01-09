import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<Account[]>{
    return this.http.get<Account[]>(`${this.apiUrl}/users`);
  }

  getAccount(): Observable<Account>{
    return this.http.get<Account>(`${this.apiUrl}/users/1`);
  }

  createAccount(account:Account): Observable<Account>{
    return this.http.post<Account>(`${this.apiUrl}/users`,account);
  }

  updateAccount(account:Account): Observable<Account>{
    return this.http.put<Account>(`${this.apiUrl}/users/${account.id}`,account);
  }

  deleteAccount(id:number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }
}
