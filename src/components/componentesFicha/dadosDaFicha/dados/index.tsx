import React from "react";
import { Flex, HStack, Text, VStack } from "@chakra-ui/react";

export const DadosFicha = (props) => {
  return (
    <>
      <HStack
        gap={5}
        align={'center'}
        fontSize={{ base: '16px', lg: '16px', md: '16px', sm: '12px' }}
        {...props}
      >

        <VStack
          align={'flex-start'}
          //justifyContent={'center'}
          //border={'1px solid black'}
          //paddingLeft={6}
        >
          <Flex>
            <Text fontWeight={700}>Posto/Grad: </Text>
            <Text>Cel QOPM</Text>
          </Flex>
          <Flex >
            <Text fontWeight={700}>Nome:</Text>
            <Text>Viviane Caxias</Text>
          </Flex>
          <Flex>
            <Text fontWeight={700}>Matrícula:</Text>
            <Text>999.99-9-9</Text>
          </Flex>
          <Flex>
            <Text fontWeight={700}>OPM:</Text>
            <Text>SELVA</Text>
          </Flex>
        </VStack>

        <VStack
          align={'flex-start'}
          //paddingLeft={6}
        >
          <Flex>
            <Text fontWeight={700}>Capacidade Laborativa:</Text>
            <Text>Disponível Total</Text>
          </Flex>
          <Flex>
            <Text fontWeight={700}>Documento médico vigente:</Text>
            <Text>Não</Text>
          </Flex>
          <Flex>
            <Text fontWeight={700}>Último afastamento:</Text>
            <Text>20.01.2012 - 02 dias</Text>
          </Flex>
          <Flex>
            <Text fontWeight={700}>Afastamento em 360 dias:</Text>
            <Text>20 registros - 100 dias</Text>
          </Flex>
        </VStack>

      </HStack>
    </>
  );
};
