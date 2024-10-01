import "regenerator-runtime";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Dictaphone = () => {
  const {
    transcript,
    // listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  function OnDictophone() {
    return SpeechRecognition.startListening();
  }

  return (
    <div
      style={{
        backgroundColor: "blue",
      }}
    >
      <p>Operations with Microphone: </p>
      <button onClick={OnDictophone}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>

      <p>Вы сказали мне: - {transcript}. </p>
    </div>
  );
};
export default Dictaphone;
