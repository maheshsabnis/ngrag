import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QueryService } from '../../services/query.service';

@Component({
  selector: 'app-query',
  imports: [CommonModule, FormsModule],
  templateUrl: './query.component.html',
  styleUrl: './query.component.css'
})
export class QueryComponent {
  prompt: string = '';
  responseHtml: string = '';
  isLoading: boolean = false;
  isSaving: boolean = false;
  error: string = '';
  successMessage: string = '';
  tableName: string = '';

  constructor(private queryService: QueryService) {}

  executeQuery(): void {
    if (!this.prompt.trim()) {
      this.error = 'Please enter a prompt';
      return;
    }

    this.isLoading = true;
    this.error = '';
    this.successMessage = '';
    this.responseHtml = '';

    this.queryService.executeQuery(this.prompt).subscribe({
      next: (response) => {
        this.responseHtml = response.html;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Error executing query: ' + error.message;
        this.isLoading = false;
      }
    });
  }

  saveTable(): void {
    if (!this.responseHtml) {
      this.error = 'No table data to save. Please execute a query first.';
      return;
    }

    if (!this.tableName.trim()) {
      this.error = 'Please enter a table name';
      return;
    }

    this.isSaving = true;
    this.error = '';
    this.successMessage = '';

    this.queryService.saveTable(this.responseHtml, this.tableName).subscribe({
      next: (response) => {
        this.successMessage = 'Table saved successfully!';
        this.isSaving = false;
      },
      error: (error) => {
        this.error = 'Error saving table: ' + error.message;
        this.isSaving = false;
      }
    });
  }
}
