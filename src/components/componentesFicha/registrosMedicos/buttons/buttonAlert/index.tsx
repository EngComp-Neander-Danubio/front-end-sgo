import { Button } from '@chakra-ui/react';
import React from 'react';
import { GoDotFill } from 'react-icons/go';

interface IBotaoAlert {
  text: string;
}

export const BotaoAlert: React.FC<IBotaoAlert> = props => {
  // Definindo as cores com base no valor de props.text
  let colorOne = '';
  let colorTwo = '';

  if (props.text === 'Pendente') {
    colorOne = 'rgba(254, 178, 178, 1)';
    colorTwo = 'rgba(197, 48, 48, 1)';
  } else if (props.text === 'Completa') {
    colorOne = 'rgba(154, 230, 180, 1)';
    colorTwo = 'rgba(56, 161, 105, 1)';
  } else if (props.text === 'Atual') {
    colorOne = 'rgba(144, 205, 244, 1)';
    colorTwo = 'rgba(49, 130, 206, 1)';
  } else if (props.text === 'Alerta') {
    colorOne = 'rgba(251, 211, 141, 1)';
    colorTwo = 'rgba(237, 137, 54, 1)';
  }

  return (
    <Button
      fontWeight={500}
      bg={colorOne}
      leftIcon={<GoDotFill size={'8px'} />}
      variant="outline"
      borderRadius={'16px'}
      w={'83px'}
      h={'22px'}
      fontSize={'12px'}
      color={colorTwo}
      alignContent={'center'}
      justifyContent={'center'}
    >
      {props.text}
    </Button>
  );
};
