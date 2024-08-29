import {
  Card,
  CardBody,
  Heading,
  Text,
  CardProps,
  Flex,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Table,
  Divider,
} from '@chakra-ui/react';
import { Service } from '../../../context/requisitosContext/RequisitosContext';
import React from 'react';
import { optionsModalidade } from '../../../types/typesModalidade';
import { TdTable } from '../../componentesFicha/table/td';
import { IconeEditar, IconeDeletar } from '../../ViewLogin';
import { IconePermutar } from '../../componentesFicha/registrosMedicos/icones/iconePermuta/IconePermuta';
import { IconeMore } from '../../componentesFicha/registrosMedicos/icones/iconeMais/IconeMore';
interface ICard extends CardProps {
  services: Service[];
  isOpen: boolean;
}
export const CardService: React.FC<ICard> = ({ services, isOpen }) => {
  return (
    <>
      <Flex
        flexWrap="wrap"
        justifyContent="space-between"
        overflowY="auto"
        overflowX="auto"
        w={'100%'}
        h={services.length > 0 ? '100vh' : 'fit-content'}
        ml={4}
        mt={4}
      >
        {services?.map((service, index) => (
          <Flex
            key={index}
            flexDirection="column"
            gap={1}
            w={'49%'}
            mb={4} // Espaçamento entre as linhas de cards
            //border="1px solid green"
            align="center"
            justify="center"
          >
            <Card
              direction={{ base: 'column', sm: 'row' }}
              overflow="hidden"
              variant="outline"
              //h="35vh"
              w="full" // Faz o card ocupar toda a largura do seu contêiner
            >
              <CardBody>
                <Heading
                  size="md"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Flex align="center" justify="space-between">
                    <Text>
                      Serviço do dia:{' '}
                      {service.dia.toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                      })}
                    </Text>
                    <Flex gap={2}>
                      <IconeEditar
                        _hover={{ cursor: 'pointer' }}
                        label_tooltip="Posto de Serviço"
                      />
                      <IconeDeletar
                        _hover={{ cursor: 'pointer' }}
                        label_tooltip="Posto de Serviço"
                      />
                      <IconeMore _hover={{ cursor: 'pointer' }} />
                    </Flex>
                  </Flex>
                </Heading>
                <Flex
                  flexDirection="row"
                  gap={1}
                  //justifyContent="space-between"
                >
                  <Text fontWeight="bold">Posto de Serviço: </Text>
                  <Text>{service.posto}</Text>
                </Flex>

                <Flex flexDirection="row" mr="4" gap={2} align="center">
                  <Text>
                    Início:{' '}
                    {service.turno[0].toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                  <Text>
                    Fim:{' '}
                    {service.turno[1].toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </Flex>
                <Flex flexDirection="row" mr="4" gap={2} align="center">
                  <Text fontWeight="bold">Modalidade:</Text>
                  <Text>
                    {
                      optionsModalidade.find(
                        option => option.value === service.modalidade,
                      )?.label
                    }
                  </Text>
                </Flex>

                <TableContainer
                  //w={'40vw'}
                  w={{
                    lg: isOpen ? '45vw' : '90vw',
                    md: isOpen ? '80vw' : '90vw',
                    sm: isOpen ? '80vw' : '90vw',
                  }}
                >
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Posto/Grad</Th>
                        <Th>Nome Completo</Th>
                        <Th>Matrícula</Th>
                        <Th>Lotação</Th>
                        <Th>Ações</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {service.militares.map((militar, idx) => (
                        <Tr key={idx}>
                          <Td>{militar.posto_grad}</Td>
                          <Td>{militar.nome_completo}</Td>
                          <Td>{militar.matricula}</Td>
                          <Td>{militar.opm}</Td>
                          <TdTable
                            customIcons={[
                              <IconePermutar
                                key="permutar"
                                _hover={{ cursor: 'pointer' }}
                              />,
                              <IconeDeletar
                                key="deletar"
                                _hover={{ cursor: 'pointer' }}
                                label_tooltip="militar"
                              />,
                            ]}
                          />
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </CardBody>
            </Card>
          </Flex>
        ))}
      </Flex>
    </>
  );
};
