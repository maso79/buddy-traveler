import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    console.log("useffect");
    test();
  }, []);

  async function test() {
    await fetch("/routest")
      .then((response) => response.json())
      .then((res) => setIsAuth(true));
  }

  if (!isAuth)
    return (
      <div>
        <h1>non autorizzato</h1>
      </div>
    );

  return (
    <div>
      <h1>autorizzato</h1>
    </div>
  );
};

export default Home;
