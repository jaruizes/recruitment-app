import { Injectable } from '@angular/core';
import {Position} from "../model/position";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

// const POSITIONS: Position[] = [
//   {id: 1, title: 'Frontend Developer', description: 'We are looking for a frontend developer', skills: [
//       {title: 'Angular', experience: 90},
//       {title: 'React', experience: 55},
//       {title: 'HTML', experience: 55},
//       {title: 'CSS', experience: 30},
//       {title: 'StoryBook', experience: 60},
//       {title: 'Node', experience: 40},
//     ]
//   },
//   {id: 2, title: 'Backend Developer', description: 'We are looking for a backend developer', skills: [{title: 'Node.js', experience: 90}, {title: 'Java', experience: 30}]},
//   {id: 3, title: 'Fullstack Developer', description: 'We are looking for a fullstack developer', skills: [{title: 'Angular', experience: 90}, {title: 'Node.js', experience: 600}]},
//   {id: 4, title: 'DevOps', description: 'We are looking for a DevOps', skills: [{title: 'Docker', experience: 90}, {title: 'Kubernetes', experience: 80}]},
//   {id: 5, title: 'QA', description: 'We are looking for a QA', skills: [{title: 'Selenium', experience: 90}, {title: 'Cypress', experience: 80}]},
//   {id: 6, title: 'Scrum Master', description: 'We are looking for a Scrum Master', skills: [{title: 'Scrum', experience: 90}, {title: 'Kanban', experience: 80}]},
//   {id: 7, title: 'Product Owner', description: 'We are looking for a Product Owner', skills: [{title: 'Product Management', experience: 90}, {title: 'Agile', experience: 80}]}
// ];

@Injectable({
  providedIn: 'root'
})
export class PositionsService {
  private serviceURL = 'http://localhost:3001/positions';

  constructor(private http: HttpClient) { }

  getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(this.serviceURL);
  }
}
