import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface QueryResponse {
  html: string;
}

interface SaveTableRequest {
  html: string;
  table_name: string;
}

interface SaveTableResponse {
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  private apiUrl = 'http://localhost:9000/api/query';
  private saveTableUrl = 'http://localhost:9000/api/save-table';

  constructor(private http: HttpClient) { }

  executeQuery(prompt: string): Observable<QueryResponse> {
    return this.http.post<QueryResponse>(this.apiUrl, { prompt }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  saveTable(html: string, tableName: string): Observable<SaveTableResponse> {
    const payload: SaveTableRequest = {
      html: html,
      table_name: tableName
    };
    return this.http.post<SaveTableResponse>(this.saveTableUrl, payload, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
