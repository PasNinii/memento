import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Expenditure,
} from '../../../shared/model/expenditure';

@Component({
  selector: 'app-expenditure-list',
  templateUrl: './expenditure-list.component.html',
  styleUrls: ['./expenditure-list.component.scss'],
})
export class ExpenditureListComponent {
  @Input() category!: string;
  @Input() expenditureList!: Observable<Expenditure[]>;
}
