(function(n, s, g) {
  "use strict";

  const { ReactNative: RN } = g;

  const AudioManager =
    RN.TurboModuleRegistry.get("NativeAudioManagerModule") ??
    RN.TurboModuleRegistry.get("RTNAudioManager");

  const AndroidAudio = RN.NativeModules.AndroidAudioManager ?? null;

  const patches = AudioManager ? [
    s.after("setCommunicationModeOn", AudioManager, () => {
      try {
        AndroidAudio?.setMode?.(0);
        AndroidAudio?.setSpeakerphoneOn?.(false);
      } catch (_) {}
    })
  ] : [];

  const onUnload = () => patches.forEach(p => p());
  return n.onUnload = onUnload, n;

})({}, vendetta.patcher, vendetta.metro.common);
