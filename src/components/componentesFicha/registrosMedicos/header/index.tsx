import { HStack, Spacer } from "@chakra-ui/react";
import React from "react";
import { ButtonExportar } from "../buttons/butttonExportar";
import { InputBuscaFicha } from "../inputs/inputBusca";
import { ButtonFilter } from "../buttons/buttonFilter";
import { ButtonSelecionar } from "../buttons/buttonSelecionar";


export const HeaderRegistrosMedicos = () => {

    return (
        <>
            <HStack 
            spacing={4} 
            position={{lg:'absolute', md:'absolute', sm:'relative'}}              
            left={{lg: 8 , md: 8, sm: 1}}         
            
            >
                <ButtonFilter />
                <ButtonSelecionar />
                <InputBuscaFicha />
                <Spacer />

            </HStack>

            <HStack 
            
            marginLeft={{lg:'auto', md:'auto', sm: '0'}} 
            marginRight={4}
            
            >
                <ButtonExportar />
            </HStack>

        </>
    );

};

