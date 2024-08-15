import { I18n } from 'i18n-js';

// Set the key-value pairs for the different languages you want to support.


const en = {
  Fajr: 'Fajr',
  Dhuhr: 'Dhuhr',
  Sunrise: "Sunrise",
  Asr: "Asr",
  Maghrib: "Maghrib",
  Isha: "Isha",
  Home: "Home",
  Privacy: "Privacy",
  Settings: "Settings",
  Dark: "Dark",
  Light: "Light",
  Hour: "Hour",
  hour: { zero: "", one: "One hour", other: "%{count} hours" },
  minute: { zero: "", one: "one minute", other: "%{count} minutes" },
  second: { zero: "", one: "one second", other: "%{count} seconds" },
  Time: "Time",
  Language: "Language",
  Qibla: "Qibla",
  Calendar: "Calendar",
  in: "in",
  Auto: "Auto",
  Location: "Locatoin",
  auto_location: ["Auto ", "Location"],
  calculation_method: ["Calculation ", "Method"],
  Method: "Method",
  Custom: "Custom",
  Angels: "Angels",
  Adjustments: "Adjustments",
  Appearance: "Appearance",
  More: "More",
  Privacy: "Privacy",
  Policy: "Policy",
  about_us: "About Us",
  custom_angels: ["Custom Angles"],
  asr_calulation_method: ["Asr ", "Calculation ", "Method"],
  timing_system: ["24", "-hour ", "Timing ", "System"],
  Shafii: "Shafii",
  Hanafi: "Hanafi",


  Dubai: 'Dubai',
  Egyptian: 'Egyptian',
  Kuwait: 'Kuwait',
  Karachi: 'Karachi',
  MoonsightingCommittee: 'Moon sighting Committee',
  MuslimWorldLeague: 'Muslim World League',
  Tehran: 'Tehran',
  NorthAmerica: 'North America',
  Qatar: 'Qatar',
  Singapore: 'Singapore',
  Turkey: 'Turkey',
  UmmAlQura: 'Umm AlQura',
  Other: 'Other',


  Arabic: "Arabic",
  English: "English",
  German: "German",
  Turkish: "Turkish",
  few_moments: "few moments",
  location_settings: "Location Settings",
  auto_settings: "Auto Settings",
  qibla: "Qibla",
  facing_qibla: "You're facing Qibla",
  turn_left: "Turn device to the left",
  turn_right: "turn device to the right",



}

const ar = {
  Fajr: 'الفجر',
  Dhuhr: 'الظهر',
  Sunrise: "شروق",
  Asr: "العصر",
  Maghrib: "المغرب",
  Isha: "العشاء",

  Home: "مواقيت الصلاة",
  Qibla: "القبلة",
  Settings: "الإعدادت",
  Calendar: "التقويم",

  Dark: "مظلم",
  Light: "فاتح",



  Dubai: 'دبي',
  Egyptian: 'مصر',
  Kuwait: 'الكويت',
  Karachi: 'كراتشي - باكستان',
  MoonsightingCommittee: 'لجنة رؤية القمر',
  MuslimWorldLeague: 'رابطة العالم الإسلامي',
  Tehran: 'طهران',
  NorthAmerica: 'أمريكا الشمالية',
  Qatar: 'قطر',
  Singapore: 'سنغافورة',
  Turkey: 'تركيا',
  UmmAlQura: 'أم القرى',
  Other: 'أخرى',

  Arabic: "عربي",
  English: "إنكليزي",
  German: "ألماني",
  Turkish: "تركي",

  Shafii: "شافعي",
  Hanafi: "حنفي",

  Hour: "ساعة",
  hour: { zero: "", one: "ساعة واحدة", other: " %{count} ساعات" },
  second: { zero: "", one: "ثانية واحدة", other: "%{count} ثانية" },
  minute: { zero: "", one: "دقيقة واحدة", other: "%{count} دقيقة" },

  Time: "توقيت",
  Language: "اللغات",
  in: "خلال",
  Auto: "تلقائي",
  Location: "الموقع",
  Calculation: "الحساب",
  Method: "طريقة",
  Custom: "مخصص",
  Angels: "درجات",
  Adjustments: "الضبط اليدوي",
  Appearance: "المظهر",
  More: "المزيد",
  Privacy: "الخصوصية",
  Policy: "السياسة",
  about_us: "من نحن؟",
  custom_angels: ["درجات مخصصة"],
  asr_calulation_method: [" طريقة", " حساب", " العصر"],
  calculation_method: ["طريقة ", "الحساب"],
  auto_location: ["موقع ", "تلقائي"],
  timing_system: [" نظام", " توقيت", " 24"],
  few_moments: ['لحظات', 'قليلة'],
  location_settings: ['خيارات', ' الموقع'],
  auto_settings: ['ضبط', ' تلقائي'],
  qibla: "القبلة",
  facing_qibla: ['أنت', ' تواجه ', ' القبلة'],
  turn_left: ['إلى', ' اليسار'],
  turn_right: ['إلى', ' اليمين '],
}
const de = { welcome: 'Hallo' }

export const i18n = new I18n({
  en, ar, de
});
