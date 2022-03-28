import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.scss'],
})
export class GenericFormComponent implements OnInit {
  genericForm: FormGroup;
  @Input() fields:any;
  @Output() eventEmitter = new EventEmitter();
  constructor(
    private translate :TranslateService,
    private router : Router,
  ) { }

  ngOnInit() {
    console.log(this.fields,"this.fields in generic");
    this.prepareForm();
  }

  checkPattern(field) {
    if (field.value && field.pattern) {
      let result = field.pattern.test(field.value);
      field.patternMatch = result;
    } else {
      // this.showOtpInput = false;
      field.patternMatch = false;
    }
  }

  public prepareForm() {
    const controls = {};
    this.fields.fields.forEach(res => {
      const validationsArray = [];
      if (res.required) {
        validationsArray.push(
          Validators.required
        );
      }
      if (res.pattern) {
        validationsArray.push(
          Validators.pattern(new RegExp(res.pattern))
        );
      }
      controls[res.name] = new FormControl('', validationsArray);
    });
    this.genericForm = new FormGroup(controls);
    console.log(this.genericForm,"this.genericForm");
  }
  action(){
    this.eventEmitter.emit();
  }
}
