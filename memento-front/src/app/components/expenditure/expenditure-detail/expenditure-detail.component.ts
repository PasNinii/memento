import { Component, Input } from '@angular/core';
import { Expenditure } from '../../../shared/model/expenditure';

@Component({
  selector: 'app-expenditure-detail',
  templateUrl: './expenditure-detail.component.html',
  styleUrls: ['./expenditure-detail.component.scss'],
})
export class ExpenditureDetailComponent {
  @Input() expenditure!: Expenditure;
}
