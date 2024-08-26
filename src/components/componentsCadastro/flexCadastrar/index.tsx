import { Flex } from '@chakra-ui/react';
import React from 'react';
import { TitleCadastro } from '../tilteCadastro';
import { FlexMenor } from '../flexMenor';
import { useForm } from 'react-hook-form';
import { AccordinCadastro } from '../accordion/AccordionCadastro';

interface IFlexCadastrar {
  isOpen: boolean;
  handleToggle: () => void;
}

export const FlexConteudo: React.FC<IFlexCadastrar> = ({
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
        {/*  <Flex
          position="absolute"
          top={0}
          left={0}
          width="32px"
          height="32px"
          bg={'#D9D9D9'}
        /> */}
        <Flex
          position="absolute"
          top={'32px'}
          ml={10}
          //left={'32px'}
          //border={'1px solid black'}
          fontWeight={'700'}
        >
          <TitleCadastro />
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
            <Flex>
              <AccordinCadastro
                isOpen={isOpen}
                handleToggle={handleToggle}
                handleSubmit={function(): void {
                  throw new Error('Function not implemented.');
                }}
              />
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