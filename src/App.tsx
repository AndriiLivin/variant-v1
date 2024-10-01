import "./App.css";
import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import Dictaphone from "./components/Dictophone.d";
import AvailableVoices from "./components/AvailableVoices";
import SpeechPlayer from "./components/SpeechPlayer";

type TVoiceContext = [
  SpeechSynthesisVoice | null,
  Dispatch<SetStateAction<SpeechSynthesisVoice>> | null
];
export const VoiceContext = createContext<TVoiceContext>([null, null]);

function App() {

  const [voiceover, setVoiceover] = useState<SpeechSynthesisVoice>({
    default: false,
    lang: "ru-Ru",
    localService: false,
    name: "Google русский",
    voiceURI: "Google русский",
  });

  return (
    <VoiceContext.Provider value={[voiceover, setVoiceover]}>
      <p className="read-the-docs" style={{ fontSize: "1rem" }}>
        Привет ВСЕМУ Вашему семейству !.
      </p>
      <Dictaphone />
      <AvailableVoices />

      <SpeechPlayer />
    </VoiceContext.Provider>
  );
}

export default App;
