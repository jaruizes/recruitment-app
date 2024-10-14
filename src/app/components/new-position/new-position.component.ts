import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Position} from "../../model/position";
import {CommonModule, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-new-position',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './new-position.component.html',
  styleUrl: './new-position.component.scss'
})
export class NewPositionComponent implements OnInit {
  positionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.positionForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      skills: this.fb.array([this._initSkillRow()])
    });
  }

  ngOnInit(): void {

  }

  // Obtener el FormArray de skills
  get skills(): FormArray {
    return this.positionForm.get('skills') as FormArray;
  }

  skillsControls(index: number, control: string) {
    return this.skills.controls[index].get(control);
  }

  // Método para agregar una nueva skill
  addSkill(): void {
    this.skills.push(this._initSkillRow());
  }

  // Método para eliminar una skill
  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  // Método para enviar el formulario
  onSubmit(): void {
    if (this.positionForm.valid) {
      console.log('Formulario enviado:', this.positionForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }

  save() {
    console.log(this.positionForm.controls['skills']);
    alert('hola');
  }

  private _initSkillRow(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      experience: ['', [Validators.required]]
    });
  }

}
