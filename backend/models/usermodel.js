const mongoose = require("mongoose");

// Dati di ogni utente
// In successiva si possono aggiungere altri parametri, come per esempio per il
// fatto dei gusti sui viaggi oppure per la data di nascita e il numero di telefono

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: false,
    },
    cognome: {
      type: String,
      required: true,
      unique: false
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    imageName: {
      type: String,
      required: false
    },
    image: {
      data: Buffer,
      contentType: String
    },
    gusti: {
      arrayGusti: Array,
      arrayPaesi: Array,
      arrayGruppi: Array
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
