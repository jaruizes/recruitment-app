import {ChangeDetectionStrategy, Component, OnInit, PipeTransform, TemplateRef, ViewChild} from '@angular/core';
import {Position} from "../../model/position";
import {AsyncPipe, CommonModule, DecimalPipe} from "@angular/common";
import {debounceTime, distinctUntilChanged, map, Observable, of, startWith} from "rxjs";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {NgbHighlight, NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Skill} from "../../model/skill";
import {PositionsService} from "../../services/positions.service";
import {NewPositionComponent} from "../new-position/new-position.component";

function search(positions: Position[], text: string): Position[] {
  console.log('--------------');
  var res= positions.filter((position) => {
    const term = text.toLowerCase();
    return (
      position.title.toLowerCase().includes(term)
    );
  });

  console.log(res);
  return res;
}

@Component({
  selector: 'app-positions',
  standalone: true,
  imports: [
    CommonModule, AsyncPipe, ReactiveFormsModule, NgbHighlight, NewPositionComponent
  ],
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.scss',
  providers: [ ]
})
export class PositionsComponent implements OnInit{
  @ViewChild(NewPositionComponent) newPosition!: NewPositionComponent;

  allPositions: Position[];
  filteredPositions$!: Observable<Position[]>;
  filter = new FormControl('', { nonNullable: true });
  modalRef!: NgbModalRef;

  constructor(private positionService: PositionsService, private modalService: NgbModal) {
    this.allPositions = [];
  }

  ngOnInit() {
    this._loadData();
    this._initializeFilter();
  }

  shortSkills(skills: Skill[]): Skill[] {
    skills.sort((a, b) => b.experience - a.experience);
    return skills;
  }

  getBadgeStyle(seniority: number): string {
    if (seniority > 75) {
      return 'text-bg-success';
    } else if (seniority > 50) {
      return 'text-bg-warning';
    } else {
      return 'text-bg-secondary';
    }
  }

  openVerticallyCentered(content: TemplateRef<any>) {
    this.modalRef = this.modalService.open(content, { centered: true, size: 'xl' });
  }

  save() {
    this.newPosition.save();
  }

  private _loadData(): void {
    this.positionService.getPositions().subscribe((positions) => {
      this.allPositions = positions;
      this.filteredPositions$ = of(this.allPositions);
    });
  }

  private _initializeFilter(): void {
    this.filter.valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map((text) => {
        return search(this.allPositions, text)
      }),
    ).subscribe((positions) => {
      this.filteredPositions$ = of(positions);
    });
  }
}
