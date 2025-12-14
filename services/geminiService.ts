import { GoogleGenAI, Modality } from "@google/genai";
import { TTSRequest, VoiceOption } from "../types";
import { VOICES } from "../constants";
import { decodeAudio, pcmToWav } from "./audioUtils";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using a singleton AudioContext to prevent limit errors
let audioContext: AudioContext | null = null;
const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  }
  return audioContext;
};

export const generateSpeech = async (
  request: TTSRequest
): Promise<{ buffer: AudioBuffer; blob: Blob }> => {
  const selectedVoice: VoiceOption | undefined = VOICES.find((v) => v.id === request.voiceId);
  if (!selectedVoice) throw new Error("Voz no encontrada");

  // Construct a rich system instruction to guide the model's prosody and style
  // Note: While 'speechConfig' sets the timbre, these instructions help with the emotion and speed/pitch nuances 
  // that the model can simulate via prosody.
  const systemInstruction = `
    Act as a professional Spanish Text-to-Speech engine.
    
    Parameters:
    - Accent: ${request.accent}
    - Style: ${request.style}
    - Voice Personality: ${selectedVoice.variantDescription}
    - Speed Level: ${request.speed} (0.5 is slow, 1.0 is normal, 2.0 is fast)
    - Pitch Level: ${request.pitch} (Lower is deeper, Higher is more acute)

    Tags Handling:
    - [pausa]: Insert a distinct silence of approximately 2 seconds.
    - [risa]: Perform a laugh appropriate to the context.
    - [grito]: Speak the phrase forcefully and loudly.
    - [llanto]: Make a crying sound or speak with a crying tone.

    Your goal is to generate high-quality audio that matches these parameters.
    Read the provided text clearly.
  `;

  // We add explicit hints to the user prompt as well to reinforce the instructions
  const augmentedPrompt = `
    [Instruction: Speak with a ${request.accent} accent. Style: ${request.style}. Speed: ${request.speed}. Pitch: ${request.pitch}.]
    ${request.text}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [
        {
          parts: [{ text: augmentedPrompt }],
        },
      ],
      config: {
        systemInstruction: systemInstruction,
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: selectedVoice.apiVoiceName,
            },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!base64Audio) {
      throw new Error("No se generó audio. Inténtalo de nuevo.");
    }

    const ctx = getAudioContext();
    const audioBuffer = await decodeAudio(base64Audio, ctx);
    const wavBlob = pcmToWav(audioBuffer);

    return { buffer: audioBuffer, blob: wavBlob };
  } catch (error) {
    console.error("Error generating speech:", error);
    throw error;
  }
};
