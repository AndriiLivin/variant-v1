import { useContext, useState } from "react";
import { VoiceContext } from "../App";
import { VoiceoverText } from "./VoiceoverText";

export default function SpeechPlayer() {
  // из глобальноо стэйта
  let [voiceover] = useContext(VoiceContext);

  const [inputText, setInputText] = useState("Наберите текст для озвучивания.");

  if (voiceover === null) {
    voiceover = {
      default: false,
      lang: "",
      localService: false,
      name: "",
      voiceURI: "",
    };
  }

  return (
    <>
      <div
        id="wrapper"
        style={{ border: "1px solid magenta", paddingBottom: "5px" }}
      >
        <h1>Speech Synthesis - Player</h1>
        <input
          id="input-speech"
          className="input-speech"
          placeholder="Наберите текст для озвучивания."
          value={inputText} // ...force the input's value to match the state variable...
          onClick={() => setInputText("")}
          onChange={(e) => setInputText(e.target.value)} // ... and update the state variable on any edits!
          size={53}
        />

        <div id="buttons">
          <button
            id="speak"
            className="speak"
            onClick={() => {
              VoiceoverText(
                inputText,
                () => console.log("Start of Player."),
                () => console.log("End of Player."),
                () => console.log("Error of Player."),
                {
                  voice: voiceover,
                  lang: voiceover.lang,
                  rate: 1.2,
                }
              );
            }}
          >
            Озвучить
          </button>
          <button className="pause" onClick={() => speechSynthesis.pause()}>
            Приостановить
          </button>
          <button className="resume" onClick={() => speechSynthesis.resume()}>
            Продолжить
          </button>
          <button className="cancel" onClick={() => speechSynthesis.cancel()}>
            Отменить
          </button>
        </div>
      </div>
    </>
  );
}
