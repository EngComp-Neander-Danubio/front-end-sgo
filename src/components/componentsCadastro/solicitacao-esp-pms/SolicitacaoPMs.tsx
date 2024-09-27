import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { FlexMenor } from '../flexMenor';
import { SolicitacaoPMsContent } from './SolicitacaoPMsContent';

interface IFlexCadastrar {
  isOpen: boolean;
  handleToggle: () => void;
}
export const SolicitacaoPMs: React.FC<IFlexCadastrar> = ({
  isOpen,
  handleToggle,
}) => {
  return (
    <Flex h={'98%'} flexDirection={'column'} gap={2}>
      <FlexMenor />
      <Flex
        pl={2}
        pr={2}
        //border={'1px solid black'}
        borderRadius={'8px'}
        borderTopLeftRadius={0}
        w={isOpen ? '87vw' : '94vw'}
        transitionDuration="1.0s"
        h={'100%'}
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
            Solicitação de PMs n° XX
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
          {/* <Flex
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


          </Flex> */}
          <Flex p={8} w={isOpen ? '86vw' : '93vw'}>
            <SolicitacaoPMsContent
              isOpen={isOpen}
              handleToggle={handleToggle}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
