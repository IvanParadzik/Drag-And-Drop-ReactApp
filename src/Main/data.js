import React from "react";

import placeholder from "../square.png";
import text from "../text-editor.png";
import slika from "../image.png";


/*Unutar ovoga filea se nalazi dictionary pod imenon data u koji se spremaju trenutna stanja */

export const data = {
  /* elements predstavljaju sliku ili tekt unutar placeoldera 
    element s id-om 'text' predstavlja pomičnu tipku na navbaru kojom se stvara textarea unutar praznog placeholdera
    s druge strane element s id-om 'image' predstavlja pomičnu tipku za stvaranje elementa s mogućnosti uploada slike unutar placeholdera
  */
  elements: {
    text: {
      id: "text",
      content: (
        <>
          <img alt="text" src={text} width="28" height="28"></img>{" "}
          <h1 style={{ fontSize: "10px" }}>Text</h1>{" "}
        </>
      ),
    },
    image: {
      id: "image",
      content: (
        <>
          <img alt="slika" src={slika} width="28" height="28"></img>{" "}
          <h1 style={{ fontSize: "10px" }}>Image</h1>{" "}
        </>
      ),
    },

    1: { id: "1", content: "" },
    2: { id: "2", content: "" },
  
  },
   // textarea predstavlja dictionary u koji se sprema trenutni tekst upisan u textarea za pojedini placeholder
  textarea: {},
  //imageHttp predstavlja dicitonary u koji se sprema http slike koja je uploadana unutar placeholdera 
  imageHttp: {},

  /* columns predstavljaju placeholderer (prva dva columna  se nalaze na navbaru)
  Column sa id-om   "col-1"  predstavlja pomičnu tipku kojom se unutar redova stvara novi prazni placeholder
  s druge strane column sa id-om 'col-2' predstavlja placeholder u kojem se nalaze pomične tipke za stvaranje teksta i slike
   
  */

  columns: {
    "col-1": {
      id: "col-1",
      name: (
        <>
          <img alt="placeholder" src={placeholder} width="30" height="30"></img>{" "}
          <h1 style={{ fontSize: "10px" }}>Placeholder</h1>{" "}
        </>
      ),
      elementIds: [],
    },
    "col-2": {
      id: "col-2",
      name: "",
      elementIds: ["text", "image"],
    },
  },

  /* rows predstavljaju redove u kojima se nalaze placeholderi */

  rows: {
    //navbar
    0: {
      id: "0",
      columnIds: ["col-1", "col-2"],
    },
    //trash
    1: {
      id: "1",
      columnIds: [],
    },
    //first row with placeholders
    2: {
      id: "2",
      columnIds: [],
    },
    // second row  with placeholders
    3: {
      id: "3",
      columnIds: [],
    },
  },

  //redosljed redova 
  rowOrder: ["0", "1", "2", "3"],
};

export default data;
