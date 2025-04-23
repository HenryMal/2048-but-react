import "./App.css";
import { GameContextProvider } from "./components/context/GameContextProvider";
import Game from "./pages/Game";

function App() {
  return (
    <>
      <GameContextProvider>
        <Game />
      </GameContextProvider>
    </>
  );
}

export default App;
