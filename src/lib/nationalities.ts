/**
 * World passport-issuing countries, for the "resident of" / "citizen of" pickers
 * in the visa checker. Deliberately broader than our destinations database (which
 * only covers the ~92 countries we have travel content for) — a traveller can hold
 * any nationality, including ones we don't cover as a destination.
 *
 * Flag emoji is derived from the ISO 3166-1 alpha-2 code (regional indicator
 * symbols), not hand-typed, so it can't drift from the code.
 */

function flagFromCode(code: string): string {
  return code
    .toUpperCase()
    .replace(/./g, (ch) => String.fromCodePoint(127397 + ch.charCodeAt(0)));
}

// [ISO 3166-1 alpha-2, name]
const RAW: [string, string][] = [
  ["AF", "Afghanistan"], ["AL", "Albania"], ["DZ", "Algeria"], ["AR", "Argentina"],
  ["AM", "Armenia"], ["AU", "Australia"], ["AT", "Austria"], ["AZ", "Azerbaijan"],
  ["BS", "Bahamas"], ["BH", "Bahrain"], ["BD", "Bangladesh"], ["BB", "Barbados"],
  ["BY", "Belarus"], ["BE", "Belgium"], ["BZ", "Belize"], ["BJ", "Benin"],
  ["BT", "Bhutan"], ["BO", "Bolivia"], ["BA", "Bosnia and Herzegovina"], ["BW", "Botswana"],
  ["BR", "Brazil"], ["BN", "Brunei"], ["BG", "Bulgaria"], ["BF", "Burkina Faso"],
  ["KH", "Cambodia"], ["CM", "Cameroon"], ["CA", "Canada"], ["CL", "Chile"],
  ["CN", "China"], ["CO", "Colombia"], ["CR", "Costa Rica"], ["HR", "Croatia"],
  ["CU", "Cuba"], ["CY", "Cyprus"], ["CZ", "Czechia"], ["DK", "Denmark"],
  ["DO", "Dominican Republic"], ["EC", "Ecuador"], ["EG", "Egypt"], ["SV", "El Salvador"],
  ["EE", "Estonia"], ["ET", "Ethiopia"], ["FJ", "Fiji"], ["FI", "Finland"],
  ["FR", "France"], ["GE", "Georgia"], ["DE", "Germany"], ["GH", "Ghana"],
  ["GR", "Greece"], ["GT", "Guatemala"], ["HN", "Honduras"], ["HK", "Hong Kong"],
  ["HU", "Hungary"], ["IS", "Iceland"], ["IN", "India"], ["ID", "Indonesia"],
  ["IE", "Ireland"], ["IL", "Israel"], ["IT", "Italy"], ["JM", "Jamaica"],
  ["JP", "Japan"], ["JO", "Jordan"], ["KZ", "Kazakhstan"], ["KE", "Kenya"],
  ["KR", "South Korea"], ["KW", "Kuwait"], ["LA", "Laos"], ["LV", "Latvia"],
  ["LB", "Lebanon"], ["LT", "Lithuania"], ["LU", "Luxembourg"], ["MY", "Malaysia"],
  ["MT", "Malta"], ["MX", "Mexico"], ["MD", "Moldova"], ["MC", "Monaco"],
  ["MN", "Mongolia"], ["ME", "Montenegro"], ["MA", "Morocco"], ["MZ", "Mozambique"],
  ["MM", "Myanmar"], ["NA", "Namibia"], ["NP", "Nepal"], ["NL", "Netherlands"],
  ["NZ", "New Zealand"], ["NI", "Nicaragua"], ["NG", "Nigeria"], ["MK", "North Macedonia"],
  ["NO", "Norway"], ["OM", "Oman"], ["PK", "Pakistan"], ["PA", "Panama"],
  ["PY", "Paraguay"], ["PE", "Peru"], ["PH", "Philippines"], ["PL", "Poland"],
  ["PT", "Portugal"], ["QA", "Qatar"], ["RO", "Romania"], ["RU", "Russia"],
  ["RW", "Rwanda"], ["SA", "Saudi Arabia"], ["RS", "Serbia"], ["SG", "Singapore"],
  ["SK", "Slovakia"], ["SI", "Slovenia"], ["ZA", "South Africa"], ["ES", "Spain"],
  ["LK", "Sri Lanka"], ["SE", "Sweden"], ["CH", "Switzerland"], ["TW", "Taiwan"],
  ["TZ", "Tanzania"], ["TH", "Thailand"], ["TT", "Trinidad and Tobago"], ["TN", "Tunisia"],
  ["TR", "Turkey"], ["UG", "Uganda"], ["UA", "Ukraine"], ["AE", "United Arab Emirates"],
  ["GB", "United Kingdom"], ["US", "United States"], ["UY", "Uruguay"], ["UZ", "Uzbekistan"],
  ["VE", "Venezuela"], ["VN", "Vietnam"], ["ZM", "Zambia"], ["ZW", "Zimbabwe"],
];

export type Nationality = { code: string; name: string; flag: string };

export const NATIONALITIES: Nationality[] = RAW
  .map(([code, name]) => ({ code, name, flag: flagFromCode(code) }))
  .sort((a, b) => a.name.localeCompare(b.name));
