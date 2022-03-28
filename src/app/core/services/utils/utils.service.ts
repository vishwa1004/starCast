import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { AlertController } from '@ionic/angular';
import * as _ from 'underscore';
import { validate } from 'json-schema';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private storage: LocalStorageService,
    private alertCtrl: AlertController
  ) { }
  getUpdateProfileForm() {
    let updateForm = {
      button1: 'LABELS.SUBMIT',
      fields: [
        {
          type: "text",
          label: 'LABELS.NAME',
          required: true,
          name: 'name',
          value: '',
          requiredError: 'LABELS.NAME_REQUIRED',
          icons: []
        }, {
          type: "email",
          label: 'LABELS.EMAIL',
          required: true,
          name: 'email',
          value: '',
          pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
          patternError: 'LABELS.EMAIL_VALIDATION',
          requiredError: 'LABELS.EMAIL_REQUIRED',
          icons: []
        }
        ,{
          type: "number",
          label: 'LABELS.MOBILE_NUMBER',
          required: true,
          name: 'mobile_number',
          pattern: /^[0-9]{10}/,
          value: '',
          patternError:'LABELS.MOBILE_NUMBER_VALIDATION',
          requiredError:'LABELS.MOBILE_NUMBER_REQUIRED',
          icons: [
          ]
        },
        {
          type: "dropdown",
          label: 'LABELS.LANGUAGE',
          required: false,
          name: 'language',
          requiredError: '',
          value: '',
          icons: []
        },
        {
          type: "text",
          label: 'LABELS.SPECIALIST_IN',
          required: false,
          name: 'specialist_in',
          requiredError: '',
          value: '',
          icons: []
        },
        {
          type: "text",
          label: 'LABELS.MOVIES_WORKED_ON',
          required: false,
          name: 'movies_worked_on',
          requiredError: '',
          value: '',
          icons: []
        },
        {
          type: "text",
          label: 'LABELS.SERIALS_WORKED_ON',
          required: false,
          name: 'serials_worked_on',
          requiredError: '',
          value: '',
          icons: []
        }
      ]
    }
    return updateForm;
  }
}
