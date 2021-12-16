import React from "react";
import { useState, useEffect } from "react";
import "./Form.css";
import Modal from "./modal";

function Form() {
  const [radio, setRadio] = useState("");
  const [netto, setNetto] = useState("");
  const [brutto, setBrutto] = useState("");
  const [selectedValue, setSelectedValue] = useState("Choose VAT");
  const [selectedValueIsValid, setSelectedValueIsValid] = useState(false);
  const [textAreaIsValid, setTextAreaIsValid] = useState(false);
  const [validNetto, setValidNetto] = useState(true);
  const [radioValidator, setRadioValidator] = useState(false);
  const [textArea, setTextArea] = useState("");
  const [radioTouched, setRadioTouched] = useState(false);
  const [textAreaTouched, setTextAreaTouched] = useState(false);
  const [selectedValueTouched, setSelectedValueTouched] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [modalInfo, setModalInfo] = useState();

  
  const radioIsInvalid = radio === "" && radioTouched;
  const textAreaInputNotValid =
    (textArea.length < 1 && textAreaTouched) || textArea.length > 1;
  const selectedValueNotValid =
    selectedValue === ("Choose VAT" || "") && selectedValueTouched;

  console.log(textAreaIsValid);
  console.log(textArea.length)
  console.log(selectedValueIsValid);
  console.log(selectedValue)

  useEffect(() => {
    if (selectedValue !== ("Choose VAT" || "")) {
      setSelectedValueIsValid(true);
    } else {
      setSelectedValueIsValid(false)
    }
    

    if (textArea.length > 0) {
      setTextAreaIsValid(true);
    } else {
      setTextAreaIsValid(false);
    }


    if (radio === "yes" || "no") {
      setRadioValidator(true);
    }

    var nettoDot = netto.replace(/,/, ".");
    var nettoNumber = parseFloat(nettoDot);
    var vat = (selectedValue / 100) * nettoNumber;
    setBrutto(nettoNumber + vat);
  }, [
    netto,
    selectedValue,
    validNetto,
    textArea,
    radio,
    radioTouched,
    textArea.length,
    textAreaTouched,
    selectedValueTouched,
    selectedValueIsValid,
  ]);


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

  const selectedValueHandler = (e) => {
    setSelectedValue(e.target.value);
  };

  const radioButtonHandler = (event) => {
    if (event.target.value === "yes") {
      setRadio("yes");
    } else if (event.target.value === "no") setRadio("no");
  };

  const submitHandler = () => {
    setDidSubmit(null);
  };

  const onSubmitFormHandler = (event) => {
    event.preventDefault();

    if (radio === "yes" || "no") {
      setRadioValidator(true);
    }

    if (textArea.length > 0) {
      setTextAreaIsValid(true);
    } 

    if (selectedValue !== "Choose VAT") {
      setSelectedValueIsValid(true);
    } else {
      setSelectedValueIsValid(false)
    }

    const sendData = {
      description: textArea,
      confirmation: radio,
      netto: netto,
      brutto: brutto,
    };
    setRadioTouched(true);
    setTextAreaTouched(true);
    setSelectedValueTouched(true);

    console.log(selectedValueIsValid);
    console.log(radioValidator);
    console.log(textAreaIsValid);

    const formIsValid =
      selectedValueIsValid && radioValidator && textAreaIsValid;

    console.log(formIsValid);

    if (formIsValid) {
      fetch(
        "https://react-form-6eb89-default-rtdb.europe-west1.firebasedatabase.app/form.json",
        {
          method: "POST",
          body: JSON.stringify(sendData),
        }
      )
        .then((response) => response.json())
        .then((sendData) => {
          console.log("success:", sendData);
          setModalInfo("Congratulations! You have send the form.");
        })
        .catch((error) => {
          setModalInfo("Something went wrong. An error occur");
        });

      setDidSubmit(true);
      setSelectedValue("Choose VAT");
      setRadio("");
      setTextArea("");
      setNetto("");
      setSelectedValueIsValid(false);
      setRadioValidator(false);
      setTextAreaIsValid(false);
      setRadioTouched(false);
      setTextAreaTouched(false);
      setSelectedValueTouched(false);
    }
  };

  return (
    <>
      {didSubmit ? (
        <Modal onConfirm={submitHandler} message={modalInfo} />
      ) : (
        <div className="outerContainer">
          <form className="form" onSubmit={onSubmitFormHandler}>
            <div className="description">
              <label id="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={textArea}
                onChange={(e) => setTextArea(e.target.value)}
                rows="5"
                cols="60"
                maxLength={255}
              >
                {textArea}
              </textarea>
            </div>
            {textArea.length > 0 &&
              `You can still add ${255 - textArea.length} characters`}
            {textAreaInputNotValid && (
              <p>Text is required, You can’t enter more than 255 characters</p>
            )}
            <div className="radioButtons">
              <label htmlFor="yes_no">Send confirmation</label>
              <input
                type="radio"
                onChange={radioButtonHandler}
                id="yes"
                value="yes"
                checked={radio === "yes"}
              ></input>
              YES
              <input
                type="radio"
                onChange={radioButtonHandler}
                id="no"
                value="no"
                checked={radio === "no"}
              ></input>
              NO
              {radioIsInvalid && <p>Text is required</p>}
            </div>
            <div className="vat">
              <div className="selectContainer">
                <label id="VAT" placeholder="Choose VAT">
                  VAT
                </label>
                <select value={selectedValue} onChange={selectedValueHandler}>
                  <option value="">Choose VAT</option>
                  <option value="19">19%</option>
                  <option value="21">21%</option>
                  <option value="23">23%</option>
                  <option value="25">25%</option>
                </select>
                {selectedValueNotValid && "Text is required"}
              </div>
              <div className="nettoContainer">
                <label id="priceNetto">Price netto EUR</label>
                <input
                  type="text"
                  onChange={(e) => {
                    nettoSetter(e);
                  }}
                  value={netto}
                  disabled={selectedValue === "Choose VAT" && true}
                  required
                ></input>
                {!validNetto && "Please input a number"}
              </div>
            </div>
            <div className="priceBrutto">
              <label id="priceBrutto">Price brutto EUR</label>
              <input type="text" value={brutto} disabled></input>
            </div>
            <button className="submitFormButton">Submit</button>
          </form>
        </div>
      )}
    </>
  );
}

export default Form;
