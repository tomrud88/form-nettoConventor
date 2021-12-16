# Form which convert netto price to brutto price.

Form with description field, confirmation buttons options,select options with VAT values and fields with netto and brutto price.
Brutto price is calculated base on VAT and netto value.Netto price accept only numbers but both with "," and "." symbols.
When the form inputs are valid after submit the form confirmation message appear if data is send to firebase database or message with negative information when is any problem with sending the form.


## Authors

- [@tomrud88](https://www.github.com/tomrud88)


## Usage/Examples

```javascript

   const regexNetto = /^[0-9]*(.|,)?[0-9]*$/;
   const regex = /[A-Z]+$/i;

   const nettoSetter = (e) => {
    if (!e.target.value.match(regexNetto) || e.target.value.match(regex)) {
      setValidNetto(false);
    } else {
      setValidNetto(true);
    }
    setNetto(e.target.value);
  };

```


## Features

- Convert netto to brutto price
- Live previews
- Fullscreen mode
- validate each input and provide message when the input is not valid



## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```
