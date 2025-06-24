
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Key, CheckCircle, AlertCircle } from 'lucide-react';
import { translateService } from '../services/translateService';

const ApiKeyInput = () => {
  const [apiKey, setApiKey] = useState('');
  const [isKeySet, setIsKeySet] = useState(false);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const existingKey = translateService.getApiKey();
    setIsKeySet(!!existingKey);
    if (existingKey) {
      setApiKey(existingKey);
    }
  }, []);

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      translateService.setApiKey(apiKey.trim());
      setIsKeySet(true);
      setShowInput(false);
    }
  };

  const handleRemoveKey = () => {
    localStorage.removeItem('google_translate_api_key');
    setApiKey('');
    setIsKeySet(false);
    setShowInput(false);
  };

  if (isKeySet && !showInput) {
    return (
      <Alert className="mb-4 border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="flex items-center justify-between">
          <span className="text-green-700">Google Translate API key is configured</span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setShowInput(true)}>
              Change Key
            </Button>
            <Button size="sm" variant="outline" onClick={handleRemoveKey}>
              Remove Key
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="mb-4 border-orange-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Key className="h-5 w-5 text-orange-600" />
          Google Translate API Setup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            To enable automatic translation, please enter your Google Translate API key. 
            Your key will be stored locally in your browser.
            <br />
            <a 
              href="https://cloud.google.com/translate/docs/setup" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline mt-1 inline-block"
            >
              Get your API key here →
            </a>
          </AlertDescription>
        </Alert>
        
        <div className="space-y-2">
          <Label htmlFor="api-key">Google Translate API Key</Label>
          <div className="flex gap-2">
            <Input
              id="api-key"
              type="password"
              placeholder="Enter your Google Translate API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSaveKey} disabled={!apiKey.trim()}>
              Save
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeyInput;
