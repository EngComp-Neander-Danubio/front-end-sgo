import React from 'react';
import { Text } from '@chakra-ui/react';

export const TitlePerfil: React.FC = () => {
  return (
    <>
      <Text
        color={'rgba(0, 0, 0, 0.48)'}
        fontWeight={'700'}
        //fontSize={'1.2vw'}
        fontSize={{ base: '25px', lg: '25px', md: '20px', sm: '20px' }}
        textDecoration={'underline'}
      >
        Dados da OPM
      </Text>
    </>
  );
};
