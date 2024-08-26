import { Button, ButtonProps, Text } from '@chakra-ui/react';
import React from 'react';
import { BiPencil } from 'react-icons/bi';
interface IButton extends ButtonProps {
  handleSubmit?: () => void;
  label?: string;
}
export const BotaoCadastrar: React.FC<IButton> = ({
  label,
  handleSubmit,
}: IButton) => {
  return (
    <Button
      type="submit"
      color={'white'}
      rightIcon={<BiPencil size={'16px'} />}
      colorScheme=" #38A169"
      backgroundColor={'#38A169'}
      variant="ghost"
      w={{ base: '152px', lg: '152px', md: '152px', sm: '100px' }}
      fontSize={{ base: '18px', lg: '18px', md: '16px', sm: '12px' }}
      onClick={handleSubmit}
    >
      {label}
    </Button>
  );
};
