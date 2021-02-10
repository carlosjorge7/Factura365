import { Injectable } from '@angular/core';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  // Para cambiar el estatus de los booleanos
  getBoolean(){
    return localStorage.getItem('bool');
  }

  setBoolean(bool: string){
    localStorage.setItem('bool', bool);
  }

  // Para cambiar el estatus de las direcciones del router
  getFlagger(){
    return localStorage.getItem('res');
  }

  setFlagger(res: string){
    localStorage.setItem('res', res);
  }

  deleteFlagger(){
    localStorage.removeItem('res');
  }

  getDropDownText(id, object){
    const selObj = _.filter(object, function (o) {
      return (_.includes(id, o.id));
    });
    return selObj;
  }

  roles = [
      {
        "RoleCode": "100",
        "RoleName": "Lectura"
      },
      {
        "RoleCode": "120",
        "RoleName": "Administrador"
      },
      {
        "RoleCode": "900",
        "RoleName": "SuperUsuario"
      },
      {
        "RoleCode": "110",
        "RoleName": "Estandard"
      }
  ];
  

  paises = [
        {
          "Iso": "AF",
          "Name": "Afghanistan"
        },
        {
          "Iso": "AL",
          "Name": "Albania"
        },
        {
          "Iso": "DZ",
          "Name": "Algeria"
        },
        {
          "Iso": "AS",
          "Name": "American Samoa"
        },
        {
          "Iso": "AD",
          "Name": "Andorra"
        },
        {
          "Iso": "AO",
          "Name": "Angola"
        },
        {
          "Iso": "AI",
          "Name": "Anguilla"
        },
        {
          "Iso": "AQ",
          "Name": "Antarctica"
        },
        {
          "Iso": "AG",
          "Name": "Antigua and Barbuda"
        },
        {
          "Iso": "AR",
          "Name": "Argentina"
        },
        {
          "Iso": "AM",
          "Name": "Armenia"
        },
        {
          "Iso": "AW",
          "Name": "Aruba"
        },
        {
          "Iso": "AU",
          "Name": "Australia"
        },
        {
          "Iso": "AT",
          "Name": "Austria"
        },
        {
          "Iso": "AZ",
          "Name": "Azerbaijan"
        },
        {
          "Iso": "BS",
          "Name": "Bahamas"
        },
        {
          "Iso": "BH",
          "Name": "Bahrain"
        },
        {
          "Iso": "BD",
          "Name": "Bangladesh"
        },
        {
          "Iso": "BB",
          "Name": "Barbados"
        },
        {
          "Iso": "BY",
          "Name": "Belarus"
        },
        {
          "Iso": "BE",
          "Name": "Belgium"
        },
        {
          "Iso": "BZ",
          "Name": "Belize"
        },
        {
          "Iso": "BJ",
          "Name": "Benin"
        },
        {
          "Iso": "BM",
          "Name": "Bermuda"
        },
        {
          "Iso": "BT",
          "Name": "Bhutan"
        },
        {
          "Iso": "BO",
          "Name": "Bolivia"
        },
        {
          "Iso": "BA",
          "Name": "Bosnia and Herzegovina"
        },
        {
          "Iso": "BW",
          "Name": "Botswana"
        },
        {
          "Iso": "BV",
          "Name": "Bouvet Island"
        },
        {
          "Iso": "BR",
          "Name": "Brazil"
        },
        {
          "Iso": "IO",
          "Name": "British Indian Ocean Territory"
        },
        {
          "Iso": "BN",
          "Name": "Brunei Darussalam"
        },
        {
          "Iso": "BG",
          "Name": "Bulgaria"
        },
        {
          "Iso": "BF",
          "Name": "Burkina Faso"
        },
        {
          "Iso": "BI",
          "Name": "Burundi"
        },
        {
          "Iso": "KH",
          "Name": "Cambodia"
        },
        {
          "Iso": "CM",
          "Name": "Cameroon"
        },
        {
          "Iso": "CA",
          "Name": "Canada"
        },
        {
          "Iso": "CV",
          "Name": "Cape Verde"
        },
        {
          "Iso": "KY",
          "Name": "Cayman Islands"
        },
        {
          "Iso": "CF",
          "Name": "Central African Republic"
        },
        {
          "Iso": "TD",
          "Name": "Chad"
        },
        {
          "Iso": "CL",
          "Name": "Chile"
        },
        {
          "Iso": "CN",
          "Name": "China"
        },
        {
          "Iso": "CX",
          "Name": "Christmas Island"
        },
        {
          "Iso": "CC",
          "Name": "Cocos (Keeling) Islands"
        },
        {
          "Iso": "CO",
          "Name": "Colombia"
        },
        {
          "Iso": "KM",
          "Name": "Comoros"
        },
        {
          "Iso": "CG",
          "Name": "Congo"
        },
        {
          "Iso": "CD",
          "Name": "Congo, the Democratic Republic of the"
        },
        {
          "Iso": "CK",
          "Name": "Cook Islands"
        },
        {
          "Iso": "CR",
          "Name": "Costa Rica"
        },
        {
          "Iso": "CI",
          "Name": "Cote D'Ivoire"
        },
        {
          "Iso": "HR",
          "Name": "Croatia"
        },
        {
          "Iso": "CU",
          "Name": "Cuba"
        },
        {
          "Iso": "CY",
          "Name": "Cyprus"
        },
        {
          "Iso": "CZ",
          "Name": "Czech Republic"
        },
        {
          "Iso": "DK",
          "Name": "Denmark"
        },
        {
          "Iso": "DJ",
          "Name": "Djibouti"
        },
        {
          "Iso": "DM",
          "Name": "Dominica"
        },
        {
          "Iso": "DO",
          "Name": "Dominican Republic"
        },
        {
          "Iso": "EC",
          "Name": "Ecuador"
        },
        {
          "Iso": "EG",
          "Name": "Egypt"
        },
        {
          "Iso": "SV",
          "Name": "El Salvador"
        },
        {
          "Iso": "GQ",
          "Name": "Equatorial Guinea"
        },
        {
          "Iso": "ER",
          "Name": "Eritrea"
        },
        {
          "Iso": "EE",
          "Name": "Estonia"
        },
        {
          "Iso": "ET",
          "Name": "Ethiopia"
        },
        {
          "Iso": "FK",
          "Name": "Falkland Islands (Malvinas)"
        },
        {
          "Iso": "FO",
          "Name": "Faroe Islands"
        },
        {
          "Iso": "FJ",
          "Name": "Fiji"
        },
        {
          "Iso": "FI",
          "Name": "Finland"
        },
        {
          "Iso": "FR",
          "Name": "France"
        },
        {
          "Iso": "GF",
          "Name": "French Guiana"
        },
        {
          "Iso": "PF",
          "Name": "French Polynesia"
        },
        {
          "Iso": "TF",
          "Name": "French Southern Territories"
        },
        {
          "Iso": "GA",
          "Name": "Gabon"
        },
        {
          "Iso": "GM",
          "Name": "Gambia"
        },
        {
          "Iso": "GE",
          "Name": "Georgia"
        },
        {
          "Iso": "DE",
          "Name": "Germany"
        },
        {
          "Iso": "GH",
          "Name": "Ghana"
        },
        {
          "Iso": "GI",
          "Name": "Gibraltar"
        },
        {
          "Iso": "GR",
          "Name": "Greece"
        },
        {
          "Iso": "GL",
          "Name": "Greenland"
        },
        {
          "Iso": "GD",
          "Name": "Grenada"
        },
        {
          "Iso": "GP",
          "Name": "Guadeloupe"
        },
        {
          "Iso": "GU",
          "Name": "Guam"
        },
        {
          "Iso": "GT",
          "Name": "Guatemala"
        },
        {
          "Iso": "GN",
          "Name": "Guinea"
        },
        {
          "Iso": "GW",
          "Name": "Guinea-Bissau"
        },
        {
          "Iso": "GY",
          "Name": "Guyana"
        },
        {
          "Iso": "HT",
          "Name": "Haiti"
        },
        {
          "Iso": "HM",
          "Name": "Heard Island and Mcdonald Islands"
        },
        {
          "Iso": "VA",
          "Name": "Holy See (Vatican City State)"
        },
        {
          "Iso": "HN",
          "Name": "Honduras"
        },
        {
          "Iso": "HK",
          "Name": "Hong Kong"
        },
        {
          "Iso": "HU",
          "Name": "Hungary"
        },
        {
          "Iso": "IS",
          "Name": "Iceland"
        },
        {
          "Iso": "IN",
          "Name": "India"
        },
        {
          "Iso": "ID",
          "Name": "Indonesia"
        },
        {
          "Iso": "IR",
          "Name": "Iran, Islamic Republic of"
        },
        {
          "Iso": "IQ",
          "Name": "Iraq"
        },
        {
          "Iso": "IE",
          "Name": "Ireland"
        },
        {
          "Iso": "IL",
          "Name": "Israel"
        },
        {
          "Iso": "IT",
          "Name": "Italy"
        },
        {
          "Iso": "JM",
          "Name": "Jamaica"
        },
        {
          "Iso": "JP",
          "Name": "Japan"
        },
        {
          "Iso": "JO",
          "Name": "Jordan"
        },
        {
          "Iso": "KZ",
          "Name": "Kazakhstan"
        },
        {
          "Iso": "KE",
          "Name": "Kenya"
        },
        {
          "Iso": "KI",
          "Name": "Kiribati"
        },
        {
          "Iso": "KP",
          "Name": "Korea, Democratic People's Republic of"
        },
        {
          "Iso": "KR",
          "Name": "Korea, Republic of"
        },
        {
          "Iso": "KW",
          "Name": "Kuwait"
        },
        {
          "Iso": "KG",
          "Name": "Kyrgyzstan"
        },
        {
          "Iso": "LA",
          "Name": "Lao People's Democratic Republic"
        },
        {
          "Iso": "LV",
          "Name": "Latvia"
        },
        {
          "Iso": "LB",
          "Name": "Lebanon"
        },
        {
          "Iso": "LS",
          "Name": "Lesotho"
        },
        {
          "Iso": "LR",
          "Name": "Liberia"
        },
        {
          "Iso": "LY",
          "Name": "Libyan Arab Jamahiriya"
        },
        {
          "Iso": "LI",
          "Name": "Liechtenstein"
        },
        {
          "Iso": "LT",
          "Name": "Lithuania"
        },
        {
          "Iso": "LU",
          "Name": "Luxembourg"
        },
        {
          "Iso": "MO",
          "Name": "Macao"
        },
        {
          "Iso": "MK",
          "Name": "Macedonia, the Former Yugoslav Republic of"
        },
        {
          "Iso": "MG",
          "Name": "Madagascar"
        },
        {
          "Iso": "MW",
          "Name": "Malawi"
        },
        {
          "Iso": "MY",
          "Name": "Malaysia"
        },
        {
          "Iso": "MV",
          "Name": "Maldives"
        },
        {
          "Iso": "ML",
          "Name": "Mali"
        },
        {
          "Iso": "MT",
          "Name": "Malta"
        },
        {
          "Iso": "MH",
          "Name": "Marshall Islands"
        },
        {
          "Iso": "MQ",
          "Name": "Martinique"
        },
        {
          "Iso": "MR",
          "Name": "Mauritania"
        },
        {
          "Iso": "MU",
          "Name": "Mauritius"
        },
        {
          "Iso": "YT",
          "Name": "Mayotte"
        },
        {
          "Iso": "MX",
          "Name": "Mexico"
        },
        {
          "Iso": "FM",
          "Name": "Micronesia, Federated States of"
        },
        {
          "Iso": "MD",
          "Name": "Moldova, Republic of"
        },
        {
          "Iso": "MC",
          "Name": "Monaco"
        },
        {
          "Iso": "MN",
          "Name": "Mongolia"
        },
        {
          "Iso": "MS",
          "Name": "Montserrat"
        },
        {
          "Iso": "MA",
          "Name": "Morocco"
        },
        {
          "Iso": "MZ",
          "Name": "Mozambique"
        },
        {
          "Iso": "MM",
          "Name": "Myanmar"
        },
        {
          "Iso": "NA",
          "Name": "Namibia"
        },
        {
          "Iso": "NR",
          "Name": "Nauru"
        },
        {
          "Iso": "NP",
          "Name": "Nepal"
        },
        {
          "Iso": "NL",
          "Name": "Netherlands"
        },
        {
          "Iso": "AN",
          "Name": "Netherlands Antilles"
        },
        {
          "Iso": "NC",
          "Name": "New Caledonia"
        },
        {
          "Iso": "NZ",
          "Name": "New Zealand"
        },
        {
          "Iso": "NI",
          "Name": "Nicaragua"
        },
        {
          "Iso": "NE",
          "Name": "Niger"
        },
        {
          "Iso": "NG",
          "Name": "Nigeria"
        },
        {
          "Iso": "NU",
          "Name": "Niue"
        },
        {
          "Iso": "NF",
          "Name": "Norfolk Island"
        },
        {
          "Iso": "MP",
          "Name": "Northern Mariana Islands"
        },
        {
          "Iso": "NO",
          "Name": "Norway"
        },
        {
          "Iso": "OM",
          "Name": "Oman"
        },
        {
          "Iso": "PK",
          "Name": "Pakistan"
        },
        {
          "Iso": "PW",
          "Name": "Palau"
        },
        {
          "Iso": "PS",
          "Name": "Palestinian Territory, Occupied"
        },
        {
          "Iso": "PA",
          "Name": "Panama"
        },
        {
          "Iso": "PG",
          "Name": "Papua New Guinea"
        },
        {
          "Iso": "PY",
          "Name": "Paraguay"
        },
        {
          "Iso": "PE",
          "Name": "Peru"
        },
        {
          "Iso": "PH",
          "Name": "Philippines"
        },
        {
          "Iso": "PN",
          "Name": "Pitcairn"
        },
        {
          "Iso": "PL",
          "Name": "Poland"
        },
        {
          "Iso": "PT",
          "Name": "Portugal"
        },
        {
          "Iso": "PR",
          "Name": "Puerto Rico"
        },
        {
          "Iso": "QA",
          "Name": "Qatar"
        },
        {
          "Iso": "RE",
          "Name": "Reunion"
        },
        {
          "Iso": "RO",
          "Name": "Romania"
        },
        {
          "Iso": "RU",
          "Name": "Russian Federation"
        },
        {
          "Iso": "RW",
          "Name": "Rwanda"
        },
        {
          "Iso": "SH",
          "Name": "Saint Helena"
        },
        {
          "Iso": "KN",
          "Name": "Saint Kitts and Nevis"
        },
        {
          "Iso": "LC",
          "Name": "Saint Lucia"
        },
        {
          "Iso": "PM",
          "Name": "Saint Pierre and Miquelon"
        },
        {
          "Iso": "VC",
          "Name": "Saint Vincent and the Grenadines"
        },
        {
          "Iso": "WS",
          "Name": "Samoa"
        },
        {
          "Iso": "SM",
          "Name": "San Marino"
        },
        {
          "Iso": "ST",
          "Name": "Sao Tome and Principe"
        },
        {
          "Iso": "SA",
          "Name": "Saudi Arabia"
        },
        {
          "Iso": "SN",
          "Name": "Senegal"
        },
        {
          "Iso": "CS",
          "Name": "Serbia and Montenegro"
        },
        {
          "Iso": "SC",
          "Name": "Seychelles"
        },
        {
          "Iso": "SL",
          "Name": "Sierra Leone"
        },
        {
          "Iso": "SG",
          "Name": "Singapore"
        },
        {
          "Iso": "SK",
          "Name": "Slovakia"
        },
        {
          "Iso": "SI",
          "Name": "Slovenia"
        },
        {
          "Iso": "SB",
          "Name": "Solomon Islands"
        },
        {
          "Iso": "SO",
          "Name": "Somalia"
        },
        {
          "Iso": "ZA",
          "Name": "South Africa"
        },
        {
          "Iso": "GS",
          "Name": "South Georgia and the South Sandwich Islands"
        },
        {
          "Iso": "ES",
          "Name": "Spain"
        },
        {
          "Iso": "LK",
          "Name": "Sri Lanka"
        },
        {
          "Iso": "SD",
          "Name": "Sudan"
        },
        {
          "Iso": "SR",
          "Name": "Suriname"
        },
        {
          "Iso": "SJ",
          "Name": "Svalbard and Jan Mayen"
        },
        {
          "Iso": "SZ",
          "Name": "Swaziland"
        },
        {
          "Iso": "SE",
          "Name": "Sweden"
        },
        {
          "Iso": "CH",
          "Name": "Switzerland"
        },
        {
          "Iso": "SY",
          "Name": "Syrian Arab Republic"
        },
        {
          "Iso": "TW",
          "Name": "Taiwan, Province of China"
        },
        {
          "Iso": "TJ",
          "Name": "Tajikistan"
        },
        {
          "Iso": "TZ",
          "Name": "Tanzania, United Republic of"
        },
        {
          "Iso": "TH",
          "Name": "Thailand"
        },
        {
          "Iso": "TL",
          "Name": "Timor-Leste"
        },
        {
          "Iso": "TG",
          "Name": "Togo"
        },
        {
          "Iso": "TK",
          "Name": "Tokelau"
        },
        {
          "Iso": "TO",
          "Name": "Tonga"
        },
        {
          "Iso": "TT",
          "Name": "Trinidad and Tobago"
        },
        {
          "Iso": "TN",
          "Name": "Tunisia"
        },
        {
          "Iso": "TR",
          "Name": "Turkey"
        },
        {
          "Iso": "TM",
          "Name": "Turkmenistan"
        },
        {
          "Iso": "TC",
          "Name": "Turks and Caicos Islands"
        },
        {
          "Iso": "TV",
          "Name": "Tuvalu"
        },
        {
          "Iso": "UG",
          "Name": "Uganda"
        },
        {
          "Iso": "UA",
          "Name": "Ukraine"
        },
        {
          "Iso": "AE",
          "Name": "United Arab Emirates"
        },
        {
          "Iso": "GB",
          "Name": "United Kingdom"
        },
        {
          "Iso": "US",
          "Name": "United States"
        },
        {
          "Iso": "UM",
          "Name": "United States Minor Outlying Islands"
        },
        {
          "Iso": "UY",
          "Name": "Uruguay"
        },
        {
          "Iso": "UZ",
          "Name": "Uzbekistan"
        },
        {
          "Iso": "VU",
          "Name": "Vanuatu"
        },
        {
          "Iso": "VE",
          "Name": "Venezuela"
        },
        {
          "Iso": "VN",
          "Name": "Viet Nam"
        },
        {
          "Iso": "VG",
          "Name": "Virgin Islands, British"
        },
        {
          "Iso": "VI",
          "Name": "Virgin Islands, U.s."
        },
        {
          "Iso": "WF",
          "Name": "Wallis and Futuna"
        },
        {
          "Iso": "EH",
          "Name": "Western Sahara"
        },
        {
          "Iso": "YE",
          "Name": "Yemen"
        },
        {
          "Iso": "ZM",
          "Name": "Zambia"
        },
        {
          "Iso": "ZW",
          "Name": "Zimbabwe"
        }
  ];

  monedas = [
    {
      "CurrencyID": "100",
      "CurrencyCode": "EUR",
      "CurrencyName": "Euro"
    },
    {
      "CurrencyID": "101",
      "CurrencyCode": "USD",
      "CurrencyName": "Dollars"
    },
    {
      "CurrencyID": "102",
      "CurrencyCode": "ALL",
      "CurrencyName": "Leke"
    },
    {
      "CurrencyID": "103",
      "CurrencyCode": "AFN",
      "CurrencyName": "Afghanis"
    },
    {
      "CurrencyID": "104",
      "CurrencyCode": "ARS",
      "CurrencyName": "Pesos"
    },
    {
      "CurrencyID": "105",
      "CurrencyCode": "AWG",
      "CurrencyName": "Guilders"
    },
    {
      "CurrencyID": "106",
      "CurrencyCode": "AUD",
      "CurrencyName": "Dollars"
    },
    {
      "CurrencyID": "107",
      "CurrencyCode": "AZN",
      "CurrencyName": "New Manats"
    },
    {
      "CurrencyID": "108",
      "CurrencyCode": "BSD",
      "CurrencyName": "Dollars"
    },
    {
      "CurrencyID": "109",
      "CurrencyCode": "BBD",
      "CurrencyName": "Dollars"
    },
    {
      "CurrencyID": "110",
      "CurrencyCode": "BYR",
      "CurrencyName": "Rubles"
    },
    {
      "CurrencyID": "111",
      "CurrencyCode": "BZD",
      "CurrencyName": "Dollars"
    },
    {
      "CurrencyID": "112",
      "CurrencyCode": "BMD",
      "CurrencyName": "Dollars"
    },
    {
      "CurrencyID": "113",
      "CurrencyCode": "BOB",
      "CurrencyName": "Bolivianos"
    },
    {
      "CurrencyID": "114",
      "CurrencyCode": "BAM",
      "CurrencyName": "Convertible Marka"
    },
    {
      "CurrencyID": "115",
      "CurrencyCode": "BWP",
      "CurrencyName": "Pula"
    },
    {
      "CurrencyID": "116",
      "CurrencyCode": "BGN",
      "CurrencyName": "Leva"
    },
    {
      "CurrencyID": "117",
      "CurrencyCode": "BRL",
      "CurrencyName": "Reais"
    },
    {
      "CurrencyID": "118",
      "CurrencyCode": "GBP",
      "CurrencyName": "Pounds"
    },
    {
      "CurrencyID": "119",
      "CurrencyCode": "BND",
      "CurrencyName": "Dollars"
    },
    {
      "CurrencyID": "120",
      "CurrencyCode": "KHR",
      "CurrencyName": "Riels"
    },
    {
      "CurrencyID": "121",
      "CurrencyCode": "CAD",
      "CurrencyName": "Dollars"
    },
    {
      "CurrencyID": "122",
      "CurrencyCode": "KYD",
      "CurrencyName": "Dollars"
    },
    {
      "CurrencyID": "123",
      "CurrencyCode": "CLP",
      "CurrencyName": "Pesos"
    },
    {
      "CurrencyID": "124",
      "CurrencyCode": "CNY",
      "CurrencyName": "Yuan Renminbi"
    },
    {
      "CurrencyID": "125",
      "CurrencyCode": "COP",
      "CurrencyName": "Pesos"
    },
    {
      "CurrencyID": "126",
      "CurrencyCode": "CRC",
      "CurrencyName": "Colón"
    },
    {
      "CurrencyID": "127",
      "CurrencyCode": "HRK",
      "CurrencyName": "Kuna"
    },
    {
      "CurrencyID": "128",
      "CurrencyCode": "CUP",
      "CurrencyName": "Pesos"
    },
    {
      "CurrencyID": "129",
      "CurrencyCode": "CZK",
      "CurrencyName": "Koruny"
    },
    {
      "CurrencyID": "130",
      "CurrencyCode": "DKK",
      "CurrencyName": "Kroner"
    },
    {
      "CurrencyID": "131",
      "CurrencyCode": "DOP",
      "CurrencyName": "Pesos"
    },
    {
      "CurrencyID": "132",
      "CurrencyCode": "XCD",
      "CurrencyName": "Dollars"
    },
    {
      "CurrencyID": "133",
      "CurrencyCode": "EGP",
      "CurrencyName": "Pounds"
    },
    {
      "CurrencyID": "134",
      "CurrencyCode": "SVC",
      "CurrencyName": "Colones"
    },
    {
      "CurrencyID": "135",
      "CurrencyCode": "FKP",
      "CurrencyName": "Pounds"
    },
    {
      "CurrencyID": "136",
      "CurrencyCode": "FJD",
      "CurrencyName": "Dollars"
    },
    {
      "CurrencyID": "137",
      "CurrencyCode": "GHC",
      "CurrencyName": "Cedis"
    },
    {
      "CurrencyID": "138",
      "CurrencyCode": "GIP",
      "CurrencyName": "Pounds"
    },
    {
      "CurrencyID": "139",
      "CurrencyCode": "GTQ",
      "CurrencyName": "Quetzales"
    },
    {
      "CurrencyID": "140",
      "CurrencyCode": "GGP",
      "CurrencyName": "Pounds"
    },
    {
      "CurrencyID": "141",
      "CurrencyCode": "GYD",
      "CurrencyName": "Dollars"
    },
    {
      "CurrencyID": "142",
      "CurrencyCode": "HNL",
      "CurrencyName": "Lempiras"
    },
    {
      "CurrencyID": "143",
      "CurrencyCode": "HKD",
      "CurrencyName": "Dollars"
    },
    {
      "CurrencyID": "144",
      "CurrencyCode": "HUF",
      "CurrencyName": "Forint"
    },
    {
      "CurrencyID": "145",
      "CurrencyCode": "ISK",
      "CurrencyName": "Kronur"
    },
    {
      "CurrencyID": "146",
      "CurrencyCode": "INR",
      "CurrencyName": "Rupees"
    },
    {
      "CurrencyID": "147",
      "CurrencyCode": "IDR",
      "CurrencyName": "Rupiahs"
    },
    {
      "CurrencyID": "148",
      "CurrencyCode": "IRR",
      "CurrencyName": "Rials"
    },
    {
      "CurrencyID": "149",
      "CurrencyCode": "IMP",
      "CurrencyName": "Pounds"
    },
    {
      "CurrencyID": "150",
      "CurrencyCode": "ILS",
      "CurrencyName": "New Shekels"
    },
    {
      "CurrencyID": "151",
      "CurrencyCode": "JMD",
      "CurrencyName": "Dollars"
    },
    {
      "CurrencyID": "152",
      "CurrencyCode": "JPY",
      "CurrencyName": "Yen"
    },
    {
      "CurrencyID": "153",
      "CurrencyCode": "JEP",
      "CurrencyName": "Pounds"
    },
    {
      "CurrencyID": "154",
      "CurrencyCode": "KZT",
      "CurrencyName": "Tenge"
    },
    {
      "CurrencyID": "155",
      "CurrencyCode": "KPW",
      "CurrencyName": "Won"
    },
    {
      "CurrencyID": "156",
      "CurrencyCode": "KRW",
      "CurrencyName": "Won"
    },
    {
      "CurrencyID": "157",
      "CurrencyCode": "KGS",
      "CurrencyName": "Soms"
    },
    {
      "CurrencyID": "158",
      "CurrencyCode": "LAK",
      "CurrencyName": "Kips"
    },
    {
      "CurrencyID": "159",
      "CurrencyCode": "LVL",
      "CurrencyName": "Lati"
    },
    {
      "CurrencyID": "160",
      "CurrencyCode": "LBP",
      "CurrencyName": "Pounds"
    },
    {
      "CurrencyID": "161",
      "CurrencyCode": "LRD",
      "CurrencyName": "Dollars"
    },
    {
      "CurrencyID": "162",
      "CurrencyCode": "CHF",
      "CurrencyName": "Switzerland Francs"
    },
    {
      "CurrencyID": "163",
      "CurrencyCode": "LTL",
      "CurrencyName": "Litai"
    },
    {
      "CurrencyID": "164",
      "CurrencyCode": "MKD",
      "CurrencyName": "Denars"
    },
    {
      "CurrencyID": "165",
      "CurrencyCode": "MYR",
      "CurrencyName": "Ringgits"
    },
    {
      "CurrencyID": "166",
      "CurrencyCode": "MUR",
      "CurrencyName": "Rupees"
    },
    {
      "CurrencyID": "167",
      "CurrencyCode": "MXN",
      "CurrencyName": "Pesos"
    },
    {
      "CurrencyID": "168",
      "CurrencyCode": "MNT",
      "CurrencyName": "Tugriks"
    },
    {
      "CurrencyID": "169",
      "CurrencyCode": "MZN",
      "CurrencyName": "Meticais"
    },
    {
      "CurrencyID": "170",
      "CurrencyCode": "NAD",
      "CurrencyName": "Dollars"
    },
    {
      "CurrencyID": "171",
      "CurrencyCode": "NPR",
      "CurrencyName": "Rupees"
    },
    {
      "CurrencyID": "172",
      "CurrencyCode": "ANG",
      "CurrencyName": "Guilders"
    },
    {
      "CurrencyID": "173",
      "CurrencyCode": "NZD",
      "CurrencyName": "Dollars"
    },
    {
      "CurrencyID": "174",
      "CurrencyCode": "NIO",
      "CurrencyName": "Cordobas"
    },
    {
      "CurrencyID": "175",
      "CurrencyCode": "NGN",
      "CurrencyName": "Nairas"
    },
    {
      "CurrencyID": "176",
      "CurrencyCode": "NOK",
      "CurrencyName": "Krone"
    },
    {
      "CurrencyID": "177",
      "CurrencyCode": "OMR",
      "CurrencyName": "Rials"
    },
    {
      "CurrencyID": "178",
      "CurrencyCode": "PKR",
      "CurrencyName": "Rupees"
    },
    {
      "CurrencyID": "179",
      "CurrencyCode": "PAB",
      "CurrencyName": "Balboa"
    },
    {
      "CurrencyID": "180",
      "CurrencyCode": "PYG",
      "CurrencyName": "Guarani"
    },
    {
      "CurrencyID": "181",
      "CurrencyCode": "PEN",
      "CurrencyName": "Nuevos Soles"
    },
    {
      "CurrencyID": "182",
      "CurrencyCode": "PHP",
      "CurrencyName": "Pesos"
    },
    {
      "CurrencyID": "183",
      "CurrencyCode": "PLN",
      "CurrencyName": "Zlotych"
    },
    {
      "CurrencyID": "184",
      "CurrencyCode": "QAR",
      "CurrencyName": "Rials"
    },
    {
      "CurrencyID": "185",
      "CurrencyCode": "RON",
      "CurrencyName": "New Lei"
    },
    {
      "CurrencyID": "186",
      "CurrencyCode": "RUB",
      "CurrencyName": "Rubles"
    },
    {
      "CurrencyID": "187",
      "CurrencyCode": "SHP",
      "CurrencyName": "Pounds"
    },
    {
      "CurrencyID": "188",
      "CurrencyCode": "SAR",
      "CurrencyName": "Riyals"
    },
    {
      "CurrencyID": "189",
      "CurrencyCode": "RSD",
      "CurrencyName": "Dinars"
    },
    {
      "CurrencyID": "190",
      "CurrencyCode": "SCR",
      "CurrencyName": "Rupees"
    },
    {
      "CurrencyID": "191",
      "CurrencyCode": "SGD",
      "CurrencyName": "Dollars"
    },
    {
      "CurrencyID": "192",
      "CurrencyCode": "SBD",
      "CurrencyName": "Dollars"
    },
    {
      "CurrencyID": "193",
      "CurrencyCode": "SOS",
      "CurrencyName": "Shillings"
    },
    {
      "CurrencyID": "194",
      "CurrencyCode": "ZAR",
      "CurrencyName": "Rand"
    },
    {
      "CurrencyID": "195",
      "CurrencyCode": "LKR",
      "CurrencyName": "Rupees"
    },
    {
      "CurrencyID": "196",
      "CurrencyCode": "SEK",
      "CurrencyName": "Kronor"
    },
    {
      "CurrencyID": "197",
      "CurrencyCode": "SRD",
      "CurrencyName": "Dollars"
    },
    {
      "CurrencyID": "198",
      "CurrencyCode": "SYP",
      "CurrencyName": "Pounds"
    },
    {
      "CurrencyID": "199",
      "CurrencyCode": "TWD",
      "CurrencyName": "New Dollars"
    },
    {
      "CurrencyID": "200",
      "CurrencyCode": "THB",
      "CurrencyName": "Baht"
    },
    {
      "CurrencyID": "201",
      "CurrencyCode": "TTD",
      "CurrencyName": "Dollars"
    },
    {
      "CurrencyID": "202",
      "CurrencyCode": "TRY",
      "CurrencyName": "Lira"
    },
    {
      "CurrencyID": "203",
      "CurrencyCode": "TRL",
      "CurrencyName": "Liras"
    },
    {
      "CurrencyID": "204",
      "CurrencyCode": "TVD",
      "CurrencyName": "Dollars"
    },
    {
      "CurrencyID": "205",
      "CurrencyCode": "UAH",
      "CurrencyName": "Hryvnia"
    },
    {
      "CurrencyID": "206",
      "CurrencyCode": "UYU",
      "CurrencyName": "Pesos"
    },
    {
      "CurrencyID": "207",
      "CurrencyCode": "UZS",
      "CurrencyName": "Sums"
    },
    {
      "CurrencyID": "208",
      "CurrencyCode": "VEF",
      "CurrencyName": "Bolivares Fuertes"
    },
    {
      "CurrencyID": "209",
      "CurrencyCode": "VND",
      "CurrencyName": "Dong"
    },
    {
      "CurrencyID": "210",
      "CurrencyCode": "YER",
      "CurrencyName": "Rials"
    },
    {
      "CurrencyID": "211",
      "CurrencyCode": "ZWD",
      "CurrencyName": "Zimbabwe Dollars"
    },
    {
      "CurrencyID": "212",
      "CurrencyCode": "INR",
      "CurrencyName": "Rupees"
    }
];
}
