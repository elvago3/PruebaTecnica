import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Data } from 'src/app/model/interfaces.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.scss']
})
export class DynamicPageComponent implements OnInit {
  dynamicPageId: any;
  sensors:any = '';

  dataShower: Data = {}
  constructor(private route: ActivatedRoute,
    private api: ApiService){
  }

  ngOnInit(): void {
    this.dynamicPageId = this.route.snapshot.paramMap.get('id');
    this.api.dashboardID(this.dynamicPageId).subscribe(data =>
      {
        this.dataShower = data.data,
        this.sensors = data.data.sensors
      });
  }

}
