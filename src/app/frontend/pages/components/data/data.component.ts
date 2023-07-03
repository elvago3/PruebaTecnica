import { Component, Input } from '@angular/core';
import { Data } from 'src/app/model/interfaces.interface';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent {
  @Input() data: Data = {}
}
