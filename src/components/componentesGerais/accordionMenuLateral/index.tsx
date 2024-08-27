import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Flex,
  AccordionIcon,
  AccordionPanel,
  Center,
  Icon,
  AccordionProps,
  ResponsiveValue,
  Text,
} from '@chakra-ui/react';

interface IAccordionMenu extends AccordionProps {
  namePrimary: string;
  nameSecondary: string;
  displayCustom?: any; // Display deve estar importado corretamente
  customIcon: React.ReactNode; // Propriedade para o ícone personalizado
  handleToggle?: () => void;
  handleClick?: () => void;
}

export const AccordionMenuLateral: React.FC<IAccordionMenu> = props => {
  return (
    <Accordion
      allowToggle
      color="white"
      _hover={{
        transform: 'scale(1.0)',
        bgColor: 'white',
        textColor: 'black',
        cursor: 'pointer',
        transition: '.9s',
      }}
      w="100%"
      pt={2}
    >
      <AccordionItem border="none" onClick={props.handleToggle}>
        <h2>
          <AccordionButton _hover={{ focus: 'none' }} pr={6}>
            <Flex align="center" as="span" flex="1" fontSize="1em">
              {props.customIcon}{' '}
              {/* Utilize o ícone personalizado passado como prop */}
              <Text pl={6} fontSize="14px" display={props.displayCustom}>
                {props.namePrimary}
              </Text>
            </Flex>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel
          bg="rgb(226, 232, 240)"
          width="100%"
          height="100%"
          marginBottom={0}
          display={props.displayCustom}
          onClick={props.handleClick}
        >
          <Center fontSize="14px">{props.nameSecondary}</Center>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
