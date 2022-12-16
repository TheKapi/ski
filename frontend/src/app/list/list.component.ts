import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

class Player {
  id!: number;
  name!: string;
  lastname!: string;
  location!: string;
  age!: string;
  distance!: string;
  edit!: boolean;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  url = 'http://localhost:4201/list';
  playerList: Player[] = [];

  newPlayer: Player = {
    id: 0,
    name: '',
    lastname: '',
    location: '',
    age: '',
    distance: '',
    edit: false,
  };

  fieldPlayer: Player = {
    id: 0,
    name: '',
    lastname: '',
    location: '',
    age: '',
    distance: '',
    edit: false,
  };

  constructor(private http: HttpClient) {}

  fetchPlayers() {
    this.http.get<Player[]>(this.url).subscribe((data) => {
      this.playerList = data;
    });
  }

  ngOnInit(): void {
    this.fetchPlayers();
  }

  addPlayer() {
    this.http.post(this.url, { player: this.newPlayer }).subscribe((data) => {
      this.fetchPlayers();
    });
  }

  deletePlayer(id: number) {
    this.http.delete(`${this.url}/${id}`).subscribe((data) => {
      this.fetchPlayers();
    });
  }

  editPlayer(id: number) {
    this.http
      .put(`${this.url}/${id}`, { player: this.fieldPlayer })
      .subscribe((data) => {
        this.fetchPlayers();
      });
  }

  changePlayer(item: any) {
    this.playerList.forEach((e) => {
      e.edit = false;
    });
    this.fieldPlayer = { ...item };
    item.edit = true;
  }
}
