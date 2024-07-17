import { Button, Container, Logo } from "./styled";
import logo from "./logo.png";
import { useCallback, useState } from "react";

const App = () => {
  const [showPlaySelection, setShowPlaySection] = useState<boolean>(false);

  const handlePlayButton = useCallback(() => {
    setShowPlaySection(true);
  }, []);
  return (
    <Container>
      <Logo src={logo} />
      <h2>Guess the Number of Jelly Beans (1 to 100)</h2>
      {!showPlaySelection && (
        <Button onClick={() => handlePlayButton()}>Play</Button>
      )}
    </Container>
  );
};

export default App;
