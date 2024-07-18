import {
  Button,
  Close,
  Container,
  Data,
  DataContainer,
  Display,
  InputContainer,
  InputFiled,
  Label,
  Logo,
  Modal,
  ModalContent,
  UserEntry,
  themes,
} from "./styled";
import logo from "./logo.png";
import { useCallback, useState } from "react";
import { User } from "./types";

const App = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showPlaySection, setShowPlaySection] = useState<boolean>(false);
  const [showDataSection, setShowDataSection] = useState<boolean>(false);
  const [numberOfPlayers, setNumberOfPlayers] = useState<number>(0);
  const [feedbackMessage, setFeedBackMessage] = useState<string>("");
  const [winnerMessage, setWinnerMessage] = useState<string>("");
  const [jellyBeanNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [currentPlayerName, setCurrentPlayerName] = useState<string>("");
  const [currentPlayerGuess, setCurrentPlayerGuess] = useState<number>(0);
  const [players, setPlayers] = useState<User[]>([]);
  const [isDiscoverEnabled, setIsDiscoverEnabled] = useState<boolean>(false);
  const [feedbackTheme, setFeedbackTheme] = useState<string>("");

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

  const handleSubmit = () => {
    console.log(currentPlayerGuess, currentPlayerName);
    //Check validation
    if (
      !currentPlayerName ||
      !currentPlayerGuess ||
      currentPlayerGuess < 1 ||
      currentPlayerGuess > 100
    ) {
      setFeedBackMessage("Please enter Valid name and guess");
      return;
    }

    if (players.some((player) => player.guess === currentPlayerGuess)) {
      setFeedBackMessage(
        "This number has already been guessed. Please choose a different number."
      );
      return;
    }

    if (numberOfPlayers === 0) {
      setFeedBackMessage("No more players are allowed.");
      setIsDiscoverEnabled(true);
      return;
    }

    //Positive feedback section
    const playerGuess = currentPlayerGuess;
    const difference = Math.abs(playerGuess - jellyBeanNumber);
    let theme;

    if (difference <= 5) {
      setFeedBackMessage("Very close! You're within 5 numbers.");
      theme = themes.veryClose;
    } else if (difference <= 10) {
      setFeedBackMessage("Close! You're within 10 numbers.");
      theme = themes.close;
    } else if (difference <= 20) {
      setFeedBackMessage("Not too far! You're within 20 numbers.");
      theme = themes.notTooFar;
    } else {
      setFeedBackMessage("Way off! You are more than 20 numbers away.");
      theme = themes.wayOff;
    }

    setFeedbackTheme(theme);
    setPlayers([
      ...players,
      { name: currentPlayerName, guess: currentPlayerGuess, theme },
    ]);
    setCurrentPlayerGuess(0);
    setCurrentPlayerName("");
    setNumberOfPlayers(numberOfPlayers - 1);
    if (numberOfPlayers === 1) {
      setIsDiscoverEnabled(true);
      setShowDataSection(false);
      setIsPlaying(false);
    }
  };

  const handleDiscoverClick = useCallback(() => {
    const winner = players.find((player) => player.guess === jellyBeanNumber);
    if (winner) {
      setWinnerMessage(
        `${winner.name} is the winner! The correct number of jelly beans was ${jellyBeanNumber}. 🎉🎊`
      );
    } else {
      setWinnerMessage(
        `No one guessed the correct number. The correct number of jelly beans was ${jellyBeanNumber}.`
      );
    }
  }, []);

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
            <InputFiled
              type="text"
              value={currentPlayerName}
              onChange={(event) => setCurrentPlayerName(event.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <Label>Guess: </Label>
            <InputFiled
              type="number"
              min="1"
              max="100"
              value={currentPlayerGuess}
              onChange={(event) =>
                setCurrentPlayerGuess(event.target.valueAsNumber)
              }
            />
          </InputContainer>
          <Button onClick={() => handleSubmit()}>Submit</Button>
        </DataContainer>
      )}
      <Display>
        {players.map((player, index) => (
          <UserEntry key={index} theme={player.theme}>
            <InputContainer>
              <Data>Name:</Data>
              <Data>{player.name}</Data>
            </InputContainer>
            <InputContainer>
              <Data>Guess:</Data>
              <Data>{player.guess}</Data>
            </InputContainer>
          </UserEntry>
        ))}
      </Display>

      <Button onClick={handleDiscoverClick} disabled={!isDiscoverEnabled}>
        Discover
      </Button>

      <Modal show={feedbackMessage !== ""}>
        <ModalContent>
          {feedbackMessage}
          <Close onClick={() => setFeedBackMessage("")}>&times;</Close>
        </ModalContent>
      </Modal>
      <Modal show={winnerMessage !== ""}>
        <ModalContent>
          {winnerMessage}
          <Close onClick={() => setWinnerMessage("")}>&times;</Close>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default App;
