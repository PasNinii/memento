import { Component, Input } from '@angular/core';
import { Expenditure } from '../../../shared/model/expenditure';

@Component({
  selector: 'app-expenditure-detail',
  template: `{{ expenditure.name }}`
})
export class ExpenditureDetailComponent {
  @Input() expenditure!: Expenditure;
}
