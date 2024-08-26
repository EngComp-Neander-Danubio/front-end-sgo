import { InputGroup, InputRightElement, Input, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { IoIosSearch } from "react-icons/io";


export const InputBuscaFicha = () => {
    return (
        <Flex
            //alignItems="center" // Use alignItems para alinhamento vertical
            textAlign="center"
            justify="center"
            h={'100%'}
        >
           
            <InputGroup  >
                <Input 
                ml={1} 
                type='search' 
                placeholder='Buscar' 
                h="40px" 
                fontSize={{ lg: '14px', md: '14px', sm: '12px' }}    
                />
                <InputRightElement 
                pointerEvents='none' 
                
                h={'31px'}
                >
                    <Flex
                        align={'center'}
                        justify={'center'}
                        h={'100%'}
                    >
                        <IoIosSearch color='#A0AEC0' w={{lg:"20px", md:"20px", sm:'16px'}} />
                    </Flex>
                </InputRightElement>
            </InputGroup>
        </Flex>
    );
};