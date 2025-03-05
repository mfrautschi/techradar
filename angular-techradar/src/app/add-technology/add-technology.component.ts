import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Status} from "../status";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Category} from '../category';
import {Ring} from '../ring';
import {TechnologyService} from '../technology.service';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {Technology} from '../Technology';

@Component({
  selector: 'app-add-technology',
  imports: [FormsModule, ReactiveFormsModule, MatFormField, MatInput, MatLabel, MatSelect, MatOption, MatButton],
  templateUrl: './add-technology.component.html',
  standalone: true,
  styleUrl: './add-technology.component.scss'
})
export class AddTechnologyComponent implements OnChanges {
  constructor(private readonly technologyService: TechnologyService) {
  }

  @Input() selectedTechnology: Technology | null = null;
  changeTechnology: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedTechnology']?.currentValue) {
      this.techForm.patchValue(changes['selectedTechnology'].currentValue);
      this.changeTechnology = true;
    }
  }

  techForm = new FormGroup({
    id: new FormControl({value: '', disabled: true},),
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    ring: new FormControl(''),
    techDescription: new FormControl('', Validators.required),
    classDescription: new FormControl(''),
    status: new FormControl('', Validators.required),
    creationDate: new FormControl({value: this.formatDateTime(new Date()), disabled: true}),
    publicationDate: new FormControl('')
  });

  private formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  allCategories = Object.values(Category);
  allRings = Object.values(Ring);
  allStatus = Object.values(Status);

  onSubmit() {
    if (this.changeTechnology) {
      this.updateTechnology();
    } else {
      this.techForm.patchValue({creationDate: this.formatDateTime(new Date())});
      if (this.techForm.value.status === Status.Published && this.validatePublishForm()) {
        console.log("Technology valid to publish: " + JSON.stringify(this.techForm.value));
        this.publishTechnology();
        this.techForm.reset();
      } else if (this.techForm.value.status === Status.Captured && this.validateDraftForm()) {
        console.log("Technology valid to draft: " + JSON.stringify(this.techForm.value));
        this.publishDraft();
        this.techForm.reset();
      } else {
        console.log("Technology not valid to publish or draft: " + JSON.stringify(this.techForm.value));
      }
    }
  }

  validateDraftForm() {
    if (this.techForm.value.name && this.techForm.value.name.length > 0) {
      if (this.techForm.value.category && this.techForm.value.category.length > 0) {
        if (this.techForm.value.techDescription && this.techForm.value.techDescription.length > 0) {
          if (this.techForm.value.status && this.techForm.value.status.length > 0) {
            return true;
          }
        }
      }
    }
    return false;
  }

  validatePublishForm() {
    if (this.validateDraftForm()) {
      if (this.techForm.value.ring && this.techForm.value.ring.length > 0) {
        if (this.techForm.value.classDescription && this.techForm.value.classDescription.length > 0) {
          return true;
        }
      }
    }
    return false;
  }

  publishTechnology() {
    this.techForm.patchValue({publicationDate: this.formatDateTime(new Date())});
    this.technologyService.addTechnology(this.techForm).then(() => {
      this.technologyService.fetchTechnologies();
    });
    console.log("PUBLISH")
  }

  publishDraft() {
    this.techForm.patchValue({publicationDate: ''});
    this.technologyService.addTechnology(this.techForm).then(() => {
      this.technologyService.fetchTechnologies();
    });
    console.log("DRAFT")
  }

  updateTechnology() {
    this.technologyService.updateTechnology(this.techForm).then(() => this.techForm.reset());
    this.changeTechnology = false;
  }

  deleteTechnology() {
    this.technologyService.deleteTechnology(this.techForm).then(() => this.techForm.reset());
    this.changeTechnology = false;
  }

  cancel() {
    this.techForm.reset();
    this.changeTechnology = false;
  }
}
