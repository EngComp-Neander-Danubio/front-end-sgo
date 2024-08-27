import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { TitleCadastro } from '../tilteCadastro';
import { FlexMenor } from '../flexMenor';
import { useForm } from 'react-hook-form';
import { AccordinCadastro } from '../accordion/AccordionCadastro';
import { ToListEventsContent } from './ToListEventsContent';

interface IFlexCadastrar {
  isOpen: boolean;
  handleToggle: () => void;
}
export const ToListEvents: React.FC<IFlexCadastrar> = ({
  isOpen,
  handleToggle,
}) => {
  const { handleSubmit } = useForm();
  return (
    <Flex h={'80vh'} flexDirection={'column'} gap={2}>
      <FlexMenor />
      <Flex
        pl={2}
        pr={2}
        // border={'1px solid black'}
        borderRadius={'8px'}
        borderTopLeftRadius={0}
        w={isOpen ? '87vw' : '94vw'}
        transitionDuration="1.0s"
        h={'75vh'}
        position="relative"
        borderBottom="1px solid rgba(0, 0, 0, 0.5)"
        boxShadow="0px 4px 4px -2px rgba(0, 0, 0, 0.5)"
        bg={'white'}
        overflowY={'auto'}
      >
        <Flex position="absolute" top={'32px'} ml={10} fontWeight={'700'}>
          <Text
            color={'rgba(0, 0, 0, 0.48)'}
            fontWeight={'700'}
            //fontSize={'1.2vw'}
            fontSize={{ base: '25px', lg: '25px', md: '20px', sm: '20px' }}
            textDecoration={'underline'}
          >
            Lista de Eventos/Operações
          </Text>
        </Flex>
        <Flex
          position="absolute"
          flexDirection={'column'}
          alignItems={'center'}
          justify={'center'}
          top={'72px'}
          pt={4}
          gap={2}
          align={{ base: 'flex-start' }}
        >
          <Flex
            display={{ base: 'flex', lg: 'flex', md: 'flex', sm: 'block' }}
            gap={4}
            align={'center'}
            justify={'center'}
          >
            {/* <InputInlcuir handleSubmit={() => handleSubmit} /> */}
          </Flex>

          <Flex
            borderBottom="1px solid rgba(0, 0, 0, 0.5)"
            boxShadow="0px 4px 4px -2px rgba(0, 0, 0, 0.5)"
            borderRadius={'8px'}
            bg={'white'}
            //m={4}
            w={isOpen ? '86vw' : '93vw'} //don't change
            transitionDuration="1.0s"
            align={'center'}
            justifyContent={'center'}
          >
            {/*
              O conteúdo vem aqui
              */}
            <Flex p={8} w={'100%'}>
              <ToListEventsContent />
            </Flex>
          </Flex>

          {/* <Flex mt={4} align={'center'} justify={'center'}>
            <BotaoNovoRegistro />
          </Flex> */}
        </Flex>
      </Flex>
    </Flex>
  );
};
