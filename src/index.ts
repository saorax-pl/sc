import { after } from "@bunny/patcher";
import { ReactNative as RN } from "@bunny/metro/common";

const AudioManager =
    RN.TurboModuleRegistry.get("NativeAudioManagerModule") ??
    RN.TurboModuleRegistry.get("RTNAudioManager");

const AndroidAudio = RN.NativeModules.AndroidAudioManager ?? null;

export const onUnload = AudioManager
    ? after("setCommunicationModeOn", AudioManager, () => {
        try {
            AndroidAudio?.setMode?.(0);
            AndroidAudio?.setSpeakerphoneOn?.(false);
        } catch (_) {}
    })
    : undefined;
