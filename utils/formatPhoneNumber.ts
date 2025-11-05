export const formatPhoneNumber = (num: string) => {
  if (!num.startsWith('+')) {
    return `+1${num.replace(/\D/g, '')}`; // assuming default country code +1 (USA)
  }
  return num.replace(/\D/g, '');
};
