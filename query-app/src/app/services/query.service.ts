import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface QueryResponse {
  html: string;
}

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  private apiUrl = 'http://localhost:9000/api/query';

  constructor(private http: HttpClient) { }

  executeQuery(prompt: string): Observable<QueryResponse> {
    return this.http.post<QueryResponse>(this.apiUrl, { prompt }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
