import React from 'react';
import { H4, SizableText, styled, YStack } from 'tamagui';

const info = {
  churchName: 'Iglesia Episcopal San Mateo',
  address: '6635 Alder Dr., Houston, TX 77081',
  phone: '(713) 664-7792',
  email: 'admin@iglesiasanmateo.org',
  schedules:
    'Lunes - Jueves: 9:00 AM – 4:00 PM\nSábado: 8:00 AM – 12:00 PM\nDomingo: 8:00 AM – 12:00 PM',
};

interface InfoProps {
  churchName?: string;
  address?: string;
  phone?: string;
  email?: string;
  schedules?: string;
}

const Text = styled(SizableText, {
  fontSize: '$7',
});

const StaticInfo: React.FC<InfoProps> = ({
  churchName = info.churchName,
  address = info.address,
  phone = info.phone,
  email = info.email,
  schedules = info.schedules,
}) => {
  return (
    <YStack gap="$4" my={'$8'}>
      <H4>{churchName}</H4>
      <Text>
        <Text fontFamily={'$heading'} fontSize={'$6'}>
          Dirección:{' '}
        </Text>
        {address}
      </Text>
      <Text>
        <Text fontFamily={'$heading'} fontSize={'$6'}>
          Phone:{' '}
        </Text>
        {phone}
      </Text>
      <Text>
        <Text fontFamily={'$heading'} fontSize={'$6'}>
          Email:{' '}
        </Text>
        {email}
      </Text>
      <Text fontFamily={'$heading'} fontSize={'$6'}>
        Oficina Parroquial:{' '}
      </Text>
      <Text>{schedules}</Text>
    </YStack>
  );
};

export default StaticInfo;
