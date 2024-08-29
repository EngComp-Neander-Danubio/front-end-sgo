import { Flex, Grid, GridItem, Icon, Image, Text } from '@chakra-ui/react';
import Brasao from '../../../assets/img/BRASAOPMCEbranco2.png';
import Relogio from '../../componentesGerais/relogio';
import { IconeMinhaArea } from '../../componentesGerais/iconesMenuLateral/iconeMinhaArea';
import { AccordionMenuLateral } from '../../componentesGerais/accordionMenuLateral';
import { IconeSistema } from '../../componentesGerais/iconesMenuLateral/iconeSistema';
import { IconeCadastro } from '../../componentesGerais/iconesMenuLateral/iconeMenulateralCadastro';
import '../../border.modules.css';
import React from 'react';
import { IconeBusca } from '../../componentesGerais/iconesMenuLateral/iconeMenulateralBusca';
import { IconeRelatorio } from '../../componentesGerais/iconesMenuLateral/iconeMenuLateralRelatorios';
import { Link, useNavigate } from 'react-router-dom';

interface IMenuLateral {
  isOpen: boolean;
  handleToggle: () => void;
}

export const MenuLateral: React.FC<IMenuLateral> = props => {
  const navigate = useNavigate();
  return (
    <>
      <Flex
        flexDirection={'column'}
        w={{
          base: props.isOpen ? '240px' : '0px',
          lg: props.isOpen ? '240px' : '80px',
          md: props.isOpen ? '240px' : '80px',
          sm: props.isOpen ? '240px' : '0px',
        }}
        //w={props.isOpen ? "12vw" : "3vw"}
        transitionDuration="1.0s"
        height={'98vh'}
        //border={"1px solid red"}
        bg={'#276749'}
        borderRadius={'15px'}
        display={{
          lg: 'block',
          md: 'block',
          sm: 'block',
        }}
        //opacity={{sm: '0.5'}}
      >
        <Flex
          //flex para a imagem
          pb={4}
          className="gradient-border"
          display={props.isOpen ? 'flex' : 'none'}
          align={'center'}
          justify={'center'}
        >
          <Link to={'/'}>
            <Image
              src={Brasao}
              pt={4}
              //w={'8vw'}
              w={'164px'}
              display={{ base: 'none', lg: 'flex', md: 'flex', sm: 'block' }}
            />
          </Link>
        </Flex>

        <Flex flexDirection="column">
          <Flex
            pt={6}
            pb={0}
            className="gradient-border"
            align={'center'}
            justify={'center'}
          >
            <Text
              color={'white'}
              //width={'60vw'}
              //height={"8vh"}
              width={'224px'}
              height={'88px'}
              //fontSize={'0.9vw'}
              fontSize={'20px'}
              textAlign={'center'}
              fontWeight={500}
              display={
                props.isOpen
                  ? { base: 'none', lg: 'block', md: 'block', sm: 'block' }
                  : 'none'
              }
            >
              SISTEMA INTEGRADO DE GERENCIAMENTO
              <br />
              DE OPERAÇÔES
            </Text>
            {/* <Link to="/"></Link> */}

            <Text
              color={'white'}
              /* width={'60vw'}
                                height={"8vh"} */
              width={'224px'}
              height={'88px'}
              //fontSize={'0.9vw'}
              fontSize={'20px'}
              //fontWeight={800}
              display={!props.isOpen ? 'visibility' : 'none'}
              textAlign={'center'}
            >
              SGO
            </Text>
          </Flex>
          <Flex
            color={'white'}
            gap="8px"
            className="gradient-border"
            display={'-ms-inline-flexbox'}
          >
            <Flex
              p={6}
              pl={4}
              //width={"25vh"}
              _hover={{
                transform: 'scale(1.0)',
                bgColor: 'white',
                textColor: 'black',
                cursor: 'pointer',
                transition: '.9s',
              }}
              align="center"
              justify={!props.isOpen ? 'center' : 'left'}
            >
              <IconeSistema />
              <Text
                pl={10}
                display={props.isOpen ? 'block' : 'none'}
                //display={props.isOpen ? { base: "none", lg: 'block', md: "none", sm: 'none' } : "none"}
                //fontSize={'0.9vw'}
                fontSize={'14px'}
              >
                Sistemas
              </Text>
            </Flex>

            {/* <Link to="/ficha">
              <Flex
                p={6}
                pl={4}
                _hover={{
                  base: {
                    transform: 'scale(1.0)',
                    bgColor: 'white',
                    textColor: 'black',
                    cursor: 'pointer',
                    transition: '.9s',
                  },
                }}
                align={'center'}
                justify={!props.isOpen ? 'center' : 'left'}
              >
                <IconeMinhaArea />

                <Text
                  pl={10}
                  display={props.isOpen ? 'block' : 'none'}
                  //display={props.isOpen ? { base: "none", lg: 'block', md: "none", sm: 'none' } : "none"}
                  //fontSize={'0.9vw'}
                  fontSize={'14px'}
                >
                  Minha área
                </Text>
              </Flex>
            </Link> */}
          </Flex>
        </Flex>

        <Flex
          p={8}
          color="white"
          textAlign={'center'}
          align={'center'} // Adicionado para centralizar verticalmente
          justify={'center'} // Adicionado para centralizar horizontalmente
        >
          <Text
            fontWeight={800}
            whiteSpace="nowrap" // Adicionado para evitar quebras de linha
            /* width={'60vw'}
                        height={"8vh"}
                        fontSize={'0.8vw'} */
            width={'186px'}
            height={'28px'}
            fontSize={'16px'}
            display={props.isOpen ? 'visibility' : 'none'}
            //display={props.isOpen ? { base: "none", lg: 'block', md: "none", sm: 'none' } : "none"}
          >
            SISTEMAS INTEGRADOS
          </Text>
          <Text
            fontWeight={800}
            whiteSpace="nowrap" // Adicionado para evitar quebras de linha
            width={'60vw'}
            height={'8vh'}
            display={!props.isOpen ? 'visibility' : 'none'}
            //display={!props.isOpen ? { base: "none", lg: 'block', md: "none", sm: 'none' } : "none"}
          >
            SI
          </Text>
        </Flex>

        <Flex
          color={'white'}
          //border={"1px solid yellow"}
          flexDirection={'column'}
          //width={"25vh"}
          height={'168px'}
          align="center"
        >
          <AccordionMenuLateral
            displayCustom={{
              lg: props.isOpen ? 'block' : 'none',
              md: props.isOpen ? 'block' : 'none',
              sm: props.isOpen ? 'block' : 'none',
            }}
            namePrimary="Cadastro"
            nameSecondary="Cadastrar evento/operação"
            customIcon={<Icon as={IconeCadastro} boxSize={5} />}
            handleToggle={!props.isOpen ? props.handleToggle : undefined}
            handleClick={() => navigate('/servico')}
          />
          <AccordionMenuLateral
            displayCustom={{
              lg: props.isOpen ? 'block' : 'none',
              md: props.isOpen ? 'block' : 'none',
              sm: props.isOpen ? 'block' : 'none',
            }}
            namePrimary="Consulta"
            nameSecondary="Lista de Eventos"
            customIcon={<Icon as={IconeBusca} boxSize={5} />}
            handleToggle={!props.isOpen ? props.handleToggle : undefined}
            handleClick={() => navigate('/lista-de-eventos')}
          />

          <AccordionMenuLateral
            displayCustom={{
              lg: props.isOpen ? 'block' : 'none',
              md: props.isOpen ? 'block' : 'none',
              sm: props.isOpen ? 'block' : 'none',
            }}
            namePrimary="Escalas"
            nameSecondary="Escala"
            customIcon={<Icon as={IconeRelatorio} boxSize={5} />}
            handleToggle={!props.isOpen ? props.handleToggle : undefined}
            handleClick={() => navigate('/escalas')}
          />
        </Flex>

        <Flex
          color={'white'}
          fontSize="12px"
          fontWeight="500"
          lineHeight="16px"
          letterSpacing="0"
          textAlign="center"
          fontFamily="Roboto"
          align={'center'}
          justify={'center'}
          h={'100%'}
          display={props.isOpen ? 'visibility' : 'none'}
        >
          <Grid
            templateAreas={`"header"
                  "footer"`}
            gridTemplateRows={'90% 1fr'}
            gridTemplateColumns={'1fr'}
            h={'100%'}
          >
            <GridItem area={'header'}></GridItem>
            <GridItem area={'footer'}>
              {/* <Relogio /> */}
            </GridItem>
          </Grid>
        </Flex>
      </Flex>
    </>
  );
};
