import { Routes } from '@angular/router';
import { QueryComponent } from './components/query/query.component';

export const routes: Routes = [
  { path: '', component: QueryComponent },
  { path: 'query', component: QueryComponent }
];
