import { Flex, Icon, Image, Text } from '@chakra-ui/react';
import Brasao from '../../../assets/img/BRASAOPMCEbranco2.png';
import { IconeCadastro } from '../../componentesGerais/iconesMenuLateral/iconeMenulateralCadastro';
import '../../border.modules.css';
import React from 'react';
import { IconeBusca } from '../../componentesGerais/iconesMenuLateral/iconeMenulateralBusca';
import { Link, useNavigate } from 'react-router-dom';
import { IconeRelatorio } from '../../componentesGerais/iconesMenuLateral/iconeMenuLateralRelatorios';
import { IconeSolicitacoes } from '../../componentesGerais/iconesMenuLateral/iconeMenuLateralSolicitacoes';
import { FooterCetic } from '../../componentsCadastro/footerImgCETIC';
import { AccordionMenuLateral } from '../../componentesGerais/accordionMenuLateral/AccordionMenuLateral';
import { useIsOpen } from '../../../context/isOpenContext/useIsOpen';

export const MenuLateral: React.FC = () => {
  const navigate = useNavigate();
  const { handleOnOpen, isOpen } = useIsOpen();
  const perfil = 'cgo';
  return (
    <>
      <Flex
        flexDirection={'column'}
        justifyContent={'space-between'}
        w={{
          base: isOpen ? '240px' : '0px',
          lg: isOpen ? '240px' : '80px',
          md: isOpen ? '240px' : '80px',
          sm: isOpen ? '240px' : '0px',
        }}
        //w={isOpen ? "12vw" : "3vw"}
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
      >
        {isOpen ? (
          <Flex
            //flex para a imagem
            pb={4}
            className="gradient-border"
            align={'center'}
            justify={'center'}
          >
            <Link to={'/'}>
              <Image
                src={Brasao}
                pt={4}
                //w={'8vw'}
                w={'164px'}
              />
            </Link>
          </Flex>
        ) : (
          <Flex align={'center'} justify={'center'}></Flex>
        )}

        <Flex flexDirection="column">
          <Flex
            pt={6}
            pb={0}
            className="gradient-border"
            align={'center'}
            justify={'center'}
          >
            {' '}
            {isOpen ? (
              <Text
                color={'white'}
                width={'224px'}
                height={'88px'}
                mb={10}
                fontSize={'20px'}
                textAlign={'center'}
                fontWeight={500}
              >
                SISTEMA DE GERENCIAMENTO
                <br />
                DE OPERAÇÕES
              </Text>
            ) : (
              <Text
                color={'white'}
                width={'224px'}
                height={'88px'}
                fontSize={'20px'}
                fontWeight={800}
                mb={2.5}
                textAlign={'center'}
              >
                SGO
              </Text>
            )}
          </Flex>
        </Flex>

        <Flex
          color={'white'}
          //border={"1px solid yellow"}
          flexDirection={'column'}
          //width={"25vh"}
          //height={'168px'}
          align="center"
          mt={!isOpen ? 4 : 0}
          pt={4}
        >
          <AccordionMenuLateral
            customIcons={[
              <Icon as={IconeCadastro} boxSize={5} />,
              <Icon as={IconeBusca} boxSize={5} />,
              <Icon as={IconeSolicitacoes} boxSize={5} />,
              <Icon as={IconeRelatorio} boxSize={5} />,
            ]}
            nameLabels={
              perfil.includes('cgo')
                ? ['Cadastro', 'Consulta', 'Solicitacões', 'Escalas']
                : ['Solicitacões', 'Escalas']
            }
            handleClick={
              perfil.includes('cgo')
                ? [
                    () => navigate('/criar-operacao'),
                    () => navigate('/listar-operacoes'),
                    [
                      () => navigate('/listar-solicitacoes-postos'),
                      () => navigate('/listar-solicitacoes-pms'),
                    ],
                    () => navigate('/escalas'),
                  ]
                : [
                    [
                      () => navigate('/listar-solicitacoes-postos'),
                      () => navigate('/listar-solicitacoes-pms'),
                    ],
                    () => navigate('/escalas'),
                  ]
            }
            nameLabelSecundarys={
              perfil.includes('cgo')
                ? [
                    ['Cadastrar Operação'],
                    ['Lista de Operações'],
                    ['Postos', 'PMs'],
                    ['Escalas'],
                  ]
                : [['Postos', 'PMs'], ['Escalas']]
            }
            displayCustom={{
              lg: isOpen ? 'block' : 'none',
              md: isOpen ? 'block' : 'none',
              sm: isOpen ? 'block' : 'none',
            }}
            isOpen={isOpen}
            handleToggle={!isOpen ? handleOnOpen : undefined}
          />
        </Flex>

        <FooterCetic isOpen={isOpen} />
      </Flex>
    </>
  );
};
