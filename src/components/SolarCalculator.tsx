
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface CalculatorResult {
  systemSize: string;
  totalCost: number;
  subsidyAmount: number;
  finalCost: number;
  monthlySavings: number;
  paybackMonths: number;
}

const SolarCalculator = () => {
  const { t } = useLanguage();
  const [monthlyBill, setMonthlyBill] = useState('');
  const [monthlyUnits, setMonthlyUnits] = useState('');
  const [hasRooftop, setHasRooftop] = useState('');
  const [householdType, setHouseholdType] = useState('');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculateSolar = () => {
    const bill = parseInt(monthlyBill) || 0;
    const units = parseInt(monthlyUnits) || 0;

    // Simple calculation logic
    let systemSize = '1kW';
    let basePrice = 60000; // Base price for 1kW system

    if (units > 300 || bill > 2000) {
      systemSize = '3kW';
      basePrice = 150000;
    } else if (units > 150 || bill > 1000) {
      systemSize = '2kW';
      basePrice = 100000;
    }

    // Calculate subsidy based on household type and category
    let subsidyPercentage = 0.3; // Default 30%
    if (householdType === 'farmer') subsidyPercentage = 0.4; // 40% for farmers

    const subsidyAmount = basePrice * subsidyPercentage;
    const finalCost = basePrice - subsidyAmount;
    const monthlySavings = Math.min(bill * 0.8, bill); // 80% savings max
    const paybackMonths = Math.ceil(finalCost / monthlySavings);

    setResult({
      systemSize,
      totalCost: basePrice,
      subsidyAmount,
      finalCost,
      monthlySavings,
      paybackMonths
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-green-700">
            {t('calcTitle')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="monthly-bill">{t('monthlyBill')}</Label>
              <Input
                id="monthly-bill"
                type="number"
                placeholder="2000"
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="monthly-units">{t('monthlyUnits')}</Label>
              <Input
                id="monthly-units"
                type="number"
                placeholder="200"
                value={monthlyUnits}
                onChange={(e) => setMonthlyUnits(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>{t('rooftopSpace')}</Label>
            <RadioGroup value={hasRooftop} onValueChange={setHasRooftop}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="rooftop-yes" />
                <Label htmlFor="rooftop-yes">{t('yes')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="rooftop-no" />
                <Label htmlFor="rooftop-no">{t('no')}</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>{t('householdType')}</Label>
            <Select value={householdType} onValueChange={setHouseholdType}>
              <SelectTrigger>
                <SelectValue placeholder="Select household type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="single">{t('single')}</SelectItem>
                <SelectItem value="family">{t('family')}</SelectItem>
                <SelectItem value="farmer">{t('farmer')}</SelectItem>
                <SelectItem value="business">{t('business')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={calculateSolar}
            className="w-full bg-orange-500 hover:bg-orange-600"
            disabled={!monthlyBill || !hasRooftop || !householdType}
          >
            {t('calculate')}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-gradient-to-r from-green-50 to-orange-50">
          <CardHeader>
            <CardTitle className="text-green-700">{t('recommendedSystem')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow">
                  <span className="font-medium">System Size:</span>
                  <span className="text-lg font-bold text-green-600">{result.systemSize}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow">
                  <span className="font-medium">{t('estimatedCost')}:</span>
                  <span className="text-lg">₹{result.totalCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow">
                  <span className="font-medium">{t('subsidy')}:</span>
                  <span className="text-lg text-green-600">-₹{result.subsidyAmount.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow">
                  <span className="font-medium">{t('afterSubsidy')}:</span>
                  <span className="text-lg font-bold text-orange-600">₹{result.finalCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow">
                  <span className="font-medium">{t('monthlySavings')}:</span>
                  <span className="text-lg text-green-600">₹{result.monthlySavings}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow">
                  <span className="font-medium">{t('paybackPeriod')}:</span>
                  <span className="text-lg">{Math.floor(result.paybackMonths / 12)} years {result.paybackMonths % 12} months</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SolarCalculator;
