export function VoiceoverText(
  textForVoiceover = "",
  CBStart: () => void,
  CBEnd: () => void,
  CBError: (err: SpeechSynthesisErrorEvent) => void,
  options: {
    voice: SpeechSynthesisVoice;
    lang: string;
    rate: number;
  }
): boolean {
  if (!SpeechSynthesisUtterance) {
    return false;
  }
  if (textForVoiceover !== "") {
    // создаем объект для озвучивания текста
    //utterance - высказывание т.е. здесь получаем звуковую дорожку по тексту
    const utterance: SpeechSynthesisUtterance = new SpeechSynthesisUtterance();

    // обработчики событий
    utterance.voice = options.voice;
    utterance.text = textForVoiceover.trim();
    utterance.lang = options.lang;
    // utterance.pitch = options.pitch;
    utterance.rate = options.rate;
    // utterance.volume = options.volume;
    // // Обработчик события при старте проигрывателя.
    utterance.onstart = CBStart;
    // Обработчик события при завершении проигрывателя.
    utterance.onend = CBEnd;
    utterance.onerror = (err) => CBError(err);

    // Мне не удалось добиться возникновения этих событий
    utterance.onpause = () => console.log("Paused");
    utterance.onresume = () => console.log("Resumed");

    // Создаем объект проигрывателя.
    const recordPlayer: SpeechSynthesis = window.speechSynthesis;
    // console.log(recordPlayer);

    // если в данный момент какой-то текст уже звучит,
    // то его нужно отключить , чтобы запустить новый
    recordPlayer.cancel(); // utterance stops being spoken immediately, and removed from the queue

    //проверяем наличие текста в очереди на озвучивание с помощью атрибута `speaking`
    if (!speechSynthesis.speaking) {
      // запускаем озвучку
      // можно просто использовать speechSynthesis.speak(utterance)
      // и не создавать объект проигрывателя :))))))))
      // speechSynthesis.speak(utterance)
      recordPlayer.speak(utterance);
    }
  }
  return true;
}
