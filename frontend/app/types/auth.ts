export interface OtpInputProps {
  length?: number;
  onChangeOtp?: (otp: string) => void;
}

export type CountryPrefix = '+234' | '+91' | '+1' | '+44' | '+61';

export const countryFlags: Record<CountryPrefix, string> = {
  '+234': 'NG',
  '+91': 'IN',
  '+1': 'US',
  '+44': 'GB',
  '+61': 'AU',
};

export const countryList = [
  'United States',
  'India',
  'Nigeria',
  'United Kingdom',
  'Australia',
  'Japan',
];
