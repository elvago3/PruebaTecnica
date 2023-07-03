import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Data, Platforms } from '../../../model/interfaces.interface'

import { Router } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dataList: Data[] = [];
  dataS: any = ''
  @Input() dat : Data = {}
  @Output() showData = new EventEmitter<string>();

  constructor(private apiService: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.apiService.dashboard().subscribe(
      (resp:Platforms) => {
        this.dataList.push(resp.data);
        console.log('Data List:',this.dataList[0]);
        this.dataS = this.dataList[0];
        this.dataS.forEach((data:any) => console.log(data));
      }
    );
  }

  onShowDetail(id: string) {
    this.apiService.dashboardID(id).subscribe((data) => {
      console.log('product', data);

      this.router.navigate(['/dashboard',id])
    })
  }
}
