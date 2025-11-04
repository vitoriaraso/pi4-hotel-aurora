import {
  Component,
  Input,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  inject,
  EventEmitter, Output
} from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-dashboard-table',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatTooltipModule
  ],
  providers: [
    TitleCasePipe
  ],
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.css']
})
export class DashboardTableComponent<T> implements OnChanges, AfterViewInit {

  private titleCasePipe = inject(TitleCasePipe);

  // --- ENTRADAS DO COMPONENTE ---
  @Input() data: T[] = [];
  @Input() title: string = '';
  @Input() visibleColumns: string[] = [];
  @Input() columnNames: Record<string, string> = {};

  // ✅ 1. NOVO @Input PARA LIGAR/DESLIGAR A COLUNA DE AÇÕES
  @Input() showActions: boolean = false;
  @Input() showEditAction: boolean = true;
  @Input() showDeleteAction: boolean = true;
  @Input() showReactivateAction: boolean = false;

  // ✅ 2. NOVOS @Output's PARA EMITIR EVENTOS
  @Output() editAction = new EventEmitter<T>();
  @Output() deleteAction = new EventEmitter<T>();
  @Output() reactivateAction = new EventEmitter<T>();

  // --- LÓGICA INTERNA ---
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<T>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.dataSource.data = this.data;

      console.log('[FILHO] Dados recebidos via @Input():', this.data);

      let columns = this.visibleColumns.length > 0 ? [...this.visibleColumns] : (this.data.length > 0 ? Object.keys(this.data[0] as object) : []);

      if (this.showActions && columns.length > 0 && !columns.includes('actions')) {
        columns.push('actions');
      }

      this.displayedColumns = columns;
      console.log('Colunas que a tabela vai tentar renderizar:', this.displayedColumns);
    }
  }

  public onEdit(item: T): void {
    this.editAction.emit(item);
  }

  public onDelete(item: T): void {
    this.deleteAction.emit(item);
  }

  public onReactivate(item: T): void {
    this.reactivateAction.emit(item);
  }

  public getColumnHeader(columnKey: string): string {
    return this.columnNames[columnKey] || this.titleCasePipe.transform(columnKey);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
