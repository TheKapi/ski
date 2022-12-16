import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

class Competition {
  id!: number;
  title!: string;
  date!: Date;
}

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss'],
})
export class CompetitionComponent implements OnInit {
  url = 'http://localhost:4201/competition';
  competitionList: Competition[] = [];
  constructor(private http: HttpClient) {}

  fetchCompetitions() {
    this.http.get<Competition[]>(this.url).subscribe((data) => {
      this.competitionList = data;
    });
  }

  ngOnInit(): void {
    this.fetchCompetitions();
  }
}
