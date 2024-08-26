import { Button } from "@chakra-ui/react";
import React from "react";
import { GoPlusCircle } from "react-icons/go";

export const BotaoNovoRegistro = () => {
    return (
        <Button color={"white"} rightIcon={<GoPlusCircle size={"12px"} />} bg=' #38A169' variant='outline'>
            Novo Registro
        </Button>
    );
}; 

