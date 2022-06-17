import { useEffect } from "react";

const Home: React.FC = () => {
  
  useEffect(() => {
    test()  
  }, [])

  async function test() {
    fetch('/routest')
      .then(response => response.json())
      .then(res => console.log(res))
  }

  return (
    <div>
      <h1>test</h1>
    </div>
  );
};

export default Home;
