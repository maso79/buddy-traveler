import React, { Component } from "react";
import { IonInput, IonLabel } from "@ionic/react";

const SignIn: React.FC = () => {
  return (
    <>
      <h1>Sign In Page</h1>
      <div>
        <IonLabel position="stacked">Inserisci la tua email:</IonLabel>
        <IonInput placeholder="example@gmail.com"></IonInput>
      </div>
    </>
  );
};

export default SignIn;
