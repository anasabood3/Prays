import { I18n } from 'i18n-js';

// Set the key-value pairs for the different languages you want to support.


const en = require('./translations/english.json');
const ar = require('./translations/arabic.json');
const de = require('./translations/deutsch.json');

export const i18n = new I18n({
  en, ar, de
});
