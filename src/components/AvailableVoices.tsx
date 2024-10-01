import {
  useContext,
  useState,
} from "react";
import { VoiceContext } from "../App";


export default function AvailableVoices() {
  // из глобальноо стэйта
  const [voiceover, setVoiceover] = useContext(VoiceContext);

  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(-1);

  // Пытаемся получить доступные голоса
  // (именно "пытаемся", поскольку в первый раз,
  // по крайней мере, в Chrome возвращается пустой массив):
  let availableSpeechVoices: SpeechSynthesisVoice[] =
    window.speechSynthesis.getVoices();

  // При вызове метода getVoices() возникает событие voiceschanged.
  // Обрабатываем это событие для "настоящего" получения голосов
  window.speechSynthesis.onvoiceschanged = () => {
    availableSpeechVoices = window.speechSynthesis.getVoices();

    // Находим индекс голоса по умолчанию
    // "Google русский" выбран по рекомендации автора
    // и говорит он быстрее остальных
    const defaultIndex = availableSpeechVoices.findIndex(
      (voice) => voice.name === "Google русский"
    );

    setSelectedVoiceIndex(defaultIndex);
    // устанавливаем голос приложения
    setVoiceover!(availableSpeechVoices[defaultIndex]);
  };

  return (
    <>
      <div
        style={{
          border: "1px solid maroon",
          paddingBottom: "5px",
          maxWidth: "400px",
          backgroundColor: "black",
        }}
      >
        <h1> Выбор из доступных голосов за кадром. </h1>

        <h2>По умолчанию предлогается 'Google русский"</h2>
        <h2>с ним получается быстрее проговаривать</h2>

        <div>
          Голос приложения:**
          {voiceover!.name}**{selectedVoiceIndex}**
          {availableSpeechVoices.length}
        </div>

        <select
          value={selectedVoiceIndex}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedVoiceIndex(e.target.selectedIndex);
            setVoiceover!(availableSpeechVoices[e.target.selectedIndex]);
          }}
        >
          {availableSpeechVoices.map((voice, index) => (
            <option value={index} key={index}>
              {voice.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
