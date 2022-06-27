import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    testAuthorization();
  }, []);

  async function testAuthorization() {
    await fetch("/routest")
      .then((response) => response.json())
      .then((res) => setIsAuth(true));
  }

  //**************** */

  //Controllo per autorizzazione alla visualizzazione del contenuto commentato
  //perche non so quale tra questo e il metodo sotto sia migliore apparentemente
  //funzionano entrambe

  // if(!isAuth) {
  //   return (
  //     <h1>non autorizzato</h1>
  //   )
  // }

  //***************** */

  return (
    //Secondo modo per autorizzazione
    <>{isAuth ? <h1>autorizzato</h1> : <h1>non autorizzato</h1>}</>
  );
};

export default Home;
