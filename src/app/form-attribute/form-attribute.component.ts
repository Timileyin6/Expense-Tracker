import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-attribute',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-attribute.component.html',
  styleUrl: './form-attribute.component.scss'
})
export class FormAttributeComponent {
  public label: string = ''
  public placeholder: string = ''
  public type: string = ''
  public name: string = ''
  public password: string = ''
  public value: string = ''
}
