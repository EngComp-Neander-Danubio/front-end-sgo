import { Checkbox } from '@chakra-ui/react';

export const CheckBoxTable = () => {
  return (
    <Checkbox
      size="md"
      //placeholder="Todos"
      color={'rgba(102, 112, 133, 1)'}
      fontSize={'12px'}
      //fontWeight={'400px'}
      textTransform={'capitalize'}
      letterSpacing={'0em'}
      //className="chakra-text css-10iahqc"
      fontFamily={'--chakra-fonts-heading'}
      lineHeight={'18px'}
    >
      Todos
    </Checkbox>
  );
};
