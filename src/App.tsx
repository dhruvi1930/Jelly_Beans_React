import {
  Button,
  Close,
  Container,
  DataContainer,
  InputContainer,
  InputFiled,
  Label,
  Logo,
  Modal,
  ModalContent,
} from "./styled";
import logo from "./logo.png";
import { useCallback, useState } from "react";

const App = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showPlaySection, setShowPlaySection] = useState<boolean>(false);
  const [showDataSection, setShowDataSection] = useState<boolean>(false);
  const [numberOfPlayers, setNumberOfPlayers] = useState<number>(0);
  const [feedbackMessage, setFeedBackMessage] = useState<string>("");

  const handlePlayButton = useCallback(() => {
    setShowPlaySection(true);
    setIsPlaying(true);
  }, []);

  const handleStartGame = useCallback(() => {
    if (numberOfPlayers <= 0) {
      setFeedBackMessage("Please enter a vaild number of players");
      return;
    }
    setShowPlaySection(false);
    setShowDataSection(true);
  }, [numberOfPlayers]);

  return (
    <Container>
      <Logo src={logo} />
      <h2>Guess the Number of Jelly Beans (1 to 100)</h2>
      {!showPlaySection && (
        <Button disabled={isPlaying} onClick={() => handlePlayButton()}>
          Play
        </Button>
      )}
      {showPlaySection && (
        <InputContainer>
          <Label>Number of Players: </Label>
          <InputFiled
            type="number"
            min="1"
            value={numberOfPlayers}
            onChange={(event) => setNumberOfPlayers(event.target.valueAsNumber)}
          />
          <Button onClick={() => handleStartGame()}>Start</Button>
        </InputContainer>
      )}
      {showDataSection && (
        <DataContainer>
          <InputContainer>
            <Label>Name: </Label>
            <InputFiled type="text" />
          </InputContainer>
          <InputContainer>
            <Label>Guess: </Label>
            <InputFiled type="number" min="1" max="100" />
          </InputContainer>
          <Button>Submit</Button>
        </DataContainer>
      )}
      <Modal show={feedbackMessage !== ""}>
        <ModalContent>
          {feedbackMessage}
          <Close onClick={() => setFeedBackMessage("")}>&times;</Close>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default App;
