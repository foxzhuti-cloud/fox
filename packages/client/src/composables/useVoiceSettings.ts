import { ref, watch, type Ref } from 'vue'

export type TtsProvider = 'webspeech' | 'openai' | 'custom' | 'edge' | 'mimo'
export type MimoAuthMode = 'api-key' | 'bearer' | 'both'

export interface VoiceSettingsData {
  provider: TtsProvider

  // WebSpeech
  webspeechVoice: string

  // OpenAI
  openaiApiKey: string
  openaiBaseUrl: string
  openaiModel: string
  openaiVoice: string

  // Custom endpoint (OpenAI-compatible)
  customUrl: string
  customApiKey: string

  // Edge TTS
  edgeUrl: string
  edgeVoice: string
  edgeRate: number    // 语速倍率 0.5~2.0，1.0 = 正常
  edgePitchHz: number // 音调偏移 Hz，-20~20，0 = 正常

  // MiMo TTS
  mimoApiKey: string
  mimoAuthMode: MimoAuthMode
  mimoBaseUrl: string
  mimoModel: string
  mimoVoice: string
  mimoVoiceDesignDesc: string
  mimoVoiceCloneDataUri: string
  mimoVoiceCloneFileName: string
  mimoVoiceCloneFormat: 'mp3' | 'wav'
  mimoStylePrompt: string
}

const STORAGE_KEY = 'hermes-tts-settings-v2'

function migrateOldKeys() {
  const oldKey = 'hermes-tts-settings'
  try {
    const old = localStorage.getItem(oldKey)
    if (old) {
      const parsed = JSON.parse(old)
      // Old 'custom' provider maps to new 'custom'
      // Old 'gptsovits' provider maps to new 'custom'
      if (parsed.provider === 'gptsovits') {
        parsed.provider = 'custom'
        // old gptsovitsUrl -> customUrl
        if (parsed.gptsovitsUrl && !parsed.customUrl) {
          parsed.customUrl = parsed.gptsovitsUrl
        }
      }
      // Store as new format
      const data = { ...DEFAULT, ...parsed }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      localStorage.removeItem(oldKey)
    }
  } catch { /* ignore */ }
}

const DEFAULT: VoiceSettingsData = {
  provider: 'webspeech',

  webspeechVoice: '',

  openaiApiKey: '',
  openaiBaseUrl: '',
  openaiModel: 'tts-1',
  openaiVoice: 'alloy',

  customUrl: '',
  customApiKey: '',

  edgeUrl: '',
  edgeVoice: 'zh-CN-XiaoxiaoNeural',
  edgeRate: 1.0,
  edgePitchHz: 0,

  mimoApiKey: '',
  mimoAuthMode: 'bearer',
  mimoBaseUrl: 'https://api.xiaomimimo.com/v1',
  mimoModel: 'mimo-v2.5-tts',
  mimoVoice: '冰糖',
  mimoVoiceDesignDesc: '',
  mimoVoiceCloneDataUri: '',
  mimoVoiceCloneFileName: '',
  mimoVoiceCloneFormat: 'wav',
  mimoStylePrompt: '',
}

function sanitize(data: VoiceSettingsData): VoiceSettingsData {
  // Clear old Edge TTS adapter URLs — now uses internal node-edge-tts
  if (data.edgeUrl && data.edgeUrl !== '') {
    data.edgeUrl = ''
  }
  if (data.mimoAuthMode !== 'api-key' && data.mimoAuthMode !== 'bearer' && data.mimoAuthMode !== 'both') {
    data.mimoAuthMode = 'bearer'
  }
  if (data.mimoVoiceCloneFormat !== 'mp3' && data.mimoVoiceCloneFormat !== 'wav') {
    data.mimoVoiceCloneFormat = 'wav'
  }
  return data
}

function load(): VoiceSettingsData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return sanitize({ ...DEFAULT, ...JSON.parse(raw) })
  } catch { /* ignore */ }
  return { ...DEFAULT }
}

// Run migration once on import
migrateOldKeys()

// ── Reactive state ──
const provider = ref<TtsProvider>(load().provider)

// WebSpeech
const webspeechVoice = ref<string>(load().webspeechVoice)

// OpenAI
const openaiApiKey = ref<string>(load().openaiApiKey)
const openaiBaseUrl = ref<string>(load().openaiBaseUrl)
const openaiModel = ref<string>(load().openaiModel)
const openaiVoice = ref<string>(load().openaiVoice)

// Custom
const customUrl = ref<string>(load().customUrl)
const customApiKey = ref<string>(load().customApiKey)

// Edge TTS
const edgeUrl = ref<string>(load().edgeUrl)
const edgeVoice = ref<string>(load().edgeVoice)
const edgeRate = ref<number>(load().edgeRate)
const edgePitchHz = ref<number>(load().edgePitchHz)

// MiMo TTS
const mimoApiKey = ref<string>(load().mimoApiKey)
const mimoAuthMode = ref<MimoAuthMode>(load().mimoAuthMode)
const mimoBaseUrl = ref<string>(load().mimoBaseUrl)
const mimoModel = ref<string>(load().mimoModel)
const mimoVoice = ref<string>(load().mimoVoice)
const mimoVoiceDesignDesc = ref<string>(load().mimoVoiceDesignDesc)
const mimoVoiceCloneDataUri = ref<string>(load().mimoVoiceCloneDataUri)
const mimoVoiceCloneFileName = ref<string>(load().mimoVoiceCloneFileName)
const mimoVoiceCloneFormat = ref<'mp3' | 'wav'>(load().mimoVoiceCloneFormat)
const mimoStylePrompt = ref<string>(load().mimoStylePrompt)

// Auto-persist on change
watch(
  [provider, webspeechVoice, openaiApiKey, openaiBaseUrl, openaiModel, openaiVoice,
   customUrl, customApiKey, edgeUrl, edgeVoice, edgeRate, edgePitchHz,
   mimoApiKey, mimoAuthMode, mimoBaseUrl, mimoModel, mimoVoice, mimoVoiceDesignDesc,
   mimoVoiceCloneDataUri, mimoVoiceCloneFileName, mimoVoiceCloneFormat, mimoStylePrompt],
  () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        provider: provider.value,
        webspeechVoice: webspeechVoice.value,
        openaiApiKey: openaiApiKey.value,
        openaiBaseUrl: openaiBaseUrl.value,
        openaiModel: openaiModel.value,
        openaiVoice: openaiVoice.value,
        customUrl: customUrl.value,
        customApiKey: customApiKey.value,
        edgeUrl: edgeUrl.value,
        edgeVoice: edgeVoice.value,
        edgeRate: edgeRate.value,
        edgePitchHz: edgePitchHz.value,
        mimoApiKey: mimoApiKey.value,
        mimoAuthMode: mimoAuthMode.value,
        mimoBaseUrl: mimoBaseUrl.value,
        mimoModel: mimoModel.value,
        mimoVoice: mimoVoice.value,
        mimoVoiceDesignDesc: mimoVoiceDesignDesc.value,
        mimoVoiceCloneDataUri: mimoVoiceCloneDataUri.value,
        mimoVoiceCloneFileName: mimoVoiceCloneFileName.value,
        mimoVoiceCloneFormat: mimoVoiceCloneFormat.value,
        mimoStylePrompt: mimoStylePrompt.value,
      }))
    } catch (err) {
      console.warn('[useVoiceSettings] Failed to persist voice settings:', err)
    }
  },
)

export function useVoiceSettings(): {
  provider: Ref<TtsProvider>
  webspeechVoice: Ref<string>
  openaiApiKey: Ref<string>
  openaiBaseUrl: Ref<string>
  openaiModel: Ref<string>
  openaiVoice: Ref<string>
  customUrl: Ref<string>
  customApiKey: Ref<string>
  edgeUrl: Ref<string>
  edgeVoice: Ref<string>
  edgeRate: Ref<number>
  edgePitchHz: Ref<number>
  mimoApiKey: Ref<string>
  mimoAuthMode: Ref<MimoAuthMode>
  mimoBaseUrl: Ref<string>
  mimoModel: Ref<string>
  mimoVoice: Ref<string>
  mimoVoiceDesignDesc: Ref<string>
  mimoVoiceCloneDataUri: Ref<string>
  mimoVoiceCloneFileName: Ref<string>
  mimoVoiceCloneFormat: Ref<'mp3' | 'wav'>
  mimoStylePrompt: Ref<string>
  setProvider(v: TtsProvider): void
  setWebSpeechVoice(v: string): void
  setOpenaiApiKey(v: string): void
  setOpenaiBaseUrl(v: string): void
  setOpenaiModel(v: string): void
  setOpenaiVoice(v: string): void
  setCustomUrl(v: string): void
  setCustomApiKey(v: string): void
  setEdgeUrl(v: string): void
  setEdgeVoice(v: string): void
  setEdgeRate(v: number): void
  setEdgePitchHz(v: number): void
  setMimoApiKey(v: string): void
  setMimoAuthMode(v: MimoAuthMode): void
  setMimoBaseUrl(v: string): void
  setMimoModel(v: string): void
  setMimoVoice(v: string): void
  setMimoVoiceDesignDesc(v: string): void
  setMimoVoiceCloneDataUri(v: string): void
  setMimoVoiceCloneFileName(v: string): void
  setMimoVoiceCloneFormat(v: 'mp3' | 'wav'): void
  setMimoStylePrompt(v: string): void
  reset(): void
} {
  return {
    provider,
    webspeechVoice,
    openaiApiKey,
    openaiBaseUrl,
    openaiModel,
    openaiVoice,
    customUrl,
    customApiKey,
    edgeUrl,
    edgeVoice,
    edgeRate,
    edgePitchHz,
    mimoApiKey,
    mimoAuthMode,
    mimoBaseUrl,
    mimoModel,
    mimoVoice,
    mimoVoiceDesignDesc,
    mimoVoiceCloneDataUri,
    mimoVoiceCloneFileName,
    mimoVoiceCloneFormat,
    mimoStylePrompt,

    setProvider(v: TtsProvider) { provider.value = v },
    setWebSpeechVoice(v: string) { webspeechVoice.value = v },
    setOpenaiApiKey(v: string) { openaiApiKey.value = v },
    setOpenaiBaseUrl(v: string) { openaiBaseUrl.value = v },
    setOpenaiModel(v: string) { openaiModel.value = v },
    setOpenaiVoice(v: string) { openaiVoice.value = v },
    setCustomUrl(v: string) { customUrl.value = v },
    setCustomApiKey(v: string) { customApiKey.value = v },
    setEdgeUrl(v: string) { edgeUrl.value = v },
    setEdgeVoice(v: string) { edgeVoice.value = v },
    setEdgeRate(v: number) { edgeRate.value = v },
    setEdgePitchHz(v: number) { edgePitchHz.value = v },
    setMimoApiKey(v: string) { mimoApiKey.value = v },
    setMimoAuthMode(v: MimoAuthMode) { mimoAuthMode.value = v },
    setMimoBaseUrl(v: string) { mimoBaseUrl.value = v },
    setMimoModel(v: string) { mimoModel.value = v },
    setMimoVoice(v: string) { mimoVoice.value = v },
    setMimoVoiceDesignDesc(v: string) { mimoVoiceDesignDesc.value = v },
    setMimoVoiceCloneDataUri(v: string) { mimoVoiceCloneDataUri.value = v },
    setMimoVoiceCloneFileName(v: string) { mimoVoiceCloneFileName.value = v },
    setMimoVoiceCloneFormat(v: 'mp3' | 'wav') { mimoVoiceCloneFormat.value = v },
    setMimoStylePrompt(v: string) { mimoStylePrompt.value = v },

    reset() {
      provider.value = DEFAULT.provider
      webspeechVoice.value = DEFAULT.webspeechVoice
      openaiApiKey.value = DEFAULT.openaiApiKey
      openaiBaseUrl.value = DEFAULT.openaiBaseUrl
      openaiModel.value = DEFAULT.openaiModel
      openaiVoice.value = DEFAULT.openaiVoice
      customUrl.value = DEFAULT.customUrl
      customApiKey.value = DEFAULT.customApiKey
      edgeUrl.value = DEFAULT.edgeUrl
      edgeVoice.value = DEFAULT.edgeVoice
      edgeRate.value = DEFAULT.edgeRate
      edgePitchHz.value = DEFAULT.edgePitchHz
      mimoApiKey.value = DEFAULT.mimoApiKey
      mimoAuthMode.value = DEFAULT.mimoAuthMode
      mimoBaseUrl.value = DEFAULT.mimoBaseUrl
      mimoModel.value = DEFAULT.mimoModel
      mimoVoice.value = DEFAULT.mimoVoice
      mimoVoiceDesignDesc.value = DEFAULT.mimoVoiceDesignDesc
      mimoVoiceCloneDataUri.value = DEFAULT.mimoVoiceCloneDataUri
      mimoVoiceCloneFileName.value = DEFAULT.mimoVoiceCloneFileName
      mimoVoiceCloneFormat.value = DEFAULT.mimoVoiceCloneFormat
      mimoStylePrompt.value = DEFAULT.mimoStylePrompt
    },
  }
}
