import { Flex, HStack, Text } from '@chakra-ui/react';
import { InputDashHeader } from '../../componentesGerais/inputDashHeader';
import { IconeConfig } from '../../componentesGerais/iconeDashHeader/iconeEnginner';
import { IconeLogin } from '../../componentesGerais/iconeDashHeader/iconeLogin';
import { ListDashHeader } from '../../componentesGerais/listDashHeader';
import { IconeSino } from '../../componentesGerais/iconeDashHeader/iconeSino';
import React from 'react';
import { useAuth } from '../../../context/AuthProvider/useAuth';
import { getUserLocalStorage } from '../../../context/AuthProvider/util';

interface IDashHeader {
  isOpen: boolean;
  handleToggle: () => void;
}

export const DashHeader: React.FC<IDashHeader> = props => {
  const { isTokenValid, token, logout } = useAuth();
  const u = isTokenValid();
  console.log(u);
  return (
    <Flex
      alignItems="center"
      textAlign="center"
      justify="center"
      flexDirection="row"
      //w={props.isOpen ? "1200px" : "1400px"}
      w={{
        lg: props.isOpen ? '87vw' : '94vw',
        md: props.isOpen ? '87vw' : '94vw',
        sm: props.isOpen ? '87vw' : '94vw',
      }}
      transitionDuration="1.0s"
      height={'80px'}
      borderRadius={'8px'}
      borderBottom="1px solid rgba(0, 0, 0, 0.5)"
      boxShadow="0px 4px 4px -2px rgba(0, 0, 0, 0.5)"
      bg={'white'}
    >
      <HStack justifyContent="space-between" w="100%">
        <ListDashHeader handleToggle={props.handleToggle} pr={4} />

        <Flex
          flexShrink={0} // Impede que este item encolha excessivamente
          //w={"180px"}
          w={'15%'}
          height={'80px'}
          textAlign="center"
          align={'center'}
          justify={'center'}
          borderLeftWidth="0.5px"
          borderRightWidth="0.5px"
          borderColor="rgba(229, 229, 229, 1)"
          display={{ base: 'none', lg: 'flex', md: 'flex', sm: 'none' }}
          //border={"1px solid green"}
        >
          <Text fontWeight={700} fontSize={'18px'}>
            PMCE
          </Text>
        </Flex>

        <HStack
          spacing={2}
          height={'80px'}
          //border={"1px solid yellow"}
          w={'70%'}
          ml={'auto'}
          pr={2}
        >
          <InputDashHeader width={'85%'} />
          <IconeLogin handleLogout={logout} />
          <IconeConfig />
          <IconeSino />
        </HStack>
      </HStack>
    </Flex>
  );
};
