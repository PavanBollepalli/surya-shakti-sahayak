
interface TranslateResponse {
  data: {
    translations: Array<{
      translatedText: string;
      detectedSourceLanguage?: string;
    }>;
  };
}

class TranslateService {
  private apiKey: string | null = null;
  private cache: Map<string, string> = new Map();

  constructor() {
    this.apiKey = localStorage.getItem('google_translate_api_key');
  }

  setApiKey(key: string) {
    this.apiKey = key;
    localStorage.setItem('google_translate_api_key', key);
  }

  getApiKey(): string | null {
    return this.apiKey;
  }

  private getCacheKey(text: string, targetLang: string): string {
    return `${text}_${targetLang}`;
  }

  async translateText(text: string, targetLanguage: string): Promise<string> {
    if (!this.apiKey) {
      console.warn('Google Translate API key not set');
      return text;
    }

    if (targetLanguage === 'en') {
      return text; // No translation needed for English
    }

    const cacheKey = this.getCacheKey(text, targetLanguage);
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: text,
            target: targetLanguage,
            format: 'text',
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Translation API error: ${response.status}`);
      }

      const data: TranslateResponse = await response.json();
      const translatedText = data.data.translations[0].translatedText;
      
      this.cache.set(cacheKey, translatedText);
      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Return original text on error
    }
  }

  async translateMultiple(texts: string[], targetLanguage: string): Promise<string[]> {
    if (!this.apiKey || targetLanguage === 'en') {
      return texts;
    }

    try {
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: texts,
            target: targetLanguage,
            format: 'text',
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Translation API error: ${response.status}`);
      }

      const data: TranslateResponse = await response.json();
      return data.data.translations.map(t => t.translatedText);
    } catch (error) {
      console.error('Translation error:', error);
      return texts;
    }
  }
}

export const translateService = new TranslateService();
