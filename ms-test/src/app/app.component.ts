import { Component, OnInit, ViewChild,AfterViewInit  } from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  dataSource;
  displayedColumns = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
   /**
  * Pre-defined columns list for user table
  */
  columnNamesinitialMargins = [{id: "exchange",value: "EXCHANGE"}, { id: "currency",value: "CURRENCY"},{id: "imNumber",value: "INITIAL MARGIN"},{id: "imInBase",value: "USD EQUIVALENT"}];

  ngOnInit() {
    this.displayedColumns = this.columnNamesinitialMargins.map(x => x.id);
    this.createTable();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    }
    
  createTable() {
    let groups: any = [
      {
        "initialMargins": 
          [
            {exchange:"CCL",currency:"USD",imNumber:"701,372.00",imInBase:"701,372.00"}
            ,{exchange:"SFE",currency:"AUD",imNumber:"296,400.00",imInBase:"212,770.74"}
            ,{exchange:"MON",currency:"CAD",imNumber:"86,903.00",imInBase:"66,910.22"}
            ,{exchange:"ERX",currency:"EUR",imNumber:"732,967.00",imInBase:"852,588.02"}
            ,{exchange:"JSC",currency:"JPY",imNumber:"780,000.00",imInBase:"7,012.18"}
          ]
      }
    ]
    this.dataSource = new MatTableDataSource(groups[0].initialMargins);
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
