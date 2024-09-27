import React from 'react';
import { Flex, FlexProps, HStack, Text, VStack } from '@chakra-ui/react';
interface IDados extends FlexProps {}
export const DadosFicha: React.FC<IDados> = () => {
  return (
    <>
      <Flex
        gap={5}
        align={'center'}
        fontSize={{ base: '16px', lg: '16px', md: '16px', sm: '12px' }}
        flexDirection={'column'}
        alignContent={'flex-start'}
        h={'fit-content'}
      >
        <Flex flexDirection={'row'} gap={4} w={'100%'}>
          <Flex gap={2}>
            <Text fontWeight={700}>OPM: </Text>
            <Text>CETIC</Text>
          </Flex>
          <Flex gap={2}>
            <Text fontWeight={700}>Comandante:</Text>
            <Text>Ten-Cel PM Issac Newton</Text>
          </Flex>
          <Flex gap={2}>
            <Text fontWeight={700}>Sub Comandante:</Text>
            <Text>Major PM Leibiniz</Text>
          </Flex>
        </Flex>
        <Flex flexDirection={'row'} gap={4} w={'100%'}>
          <Flex gap={2}>
            <Text fontWeight={700}>Operação:</Text>
            <Text>Evangelizar</Text>
          </Flex>
          <Flex gap={2}>
            <Text fontWeight={700}>Solicitante:</Text>
            <Text>CGO</Text>
          </Flex>
          <Flex gap={2}>
            <Text fontWeight={700}>Prazo Final:</Text>
            <Text>20.01.2012</Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
