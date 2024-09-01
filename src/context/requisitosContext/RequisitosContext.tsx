import React, {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import militaresData from '../../assets/militares.json';
import postosData from '../../assets/postos.json';
import { useToast } from '@chakra-ui/react';
import {
  handleSortByPostoGrad,
  handleSortByPostoGradTwoMilitar,
  Militar,
  optionsMilitares,
} from '../../types/typesMilitar';
import { useRequisitos } from './useRequesitos';
import { useMilitares } from '../militares/useMilitares';
import { usePostos } from '../postosContext/usePostos';
import { object } from 'prop-types';

export type Requisito = {
  columns?: string[];
  registers?: { [key: string]: any }[];
};

export type Militares_service = {
  nome_completo: string;
  opm: string;
  matricula: string;
  posto_grad: string;
};

/* export type Postos = {
  Municipio: string;
  Local_de_Votacao: string;
  Endereco: string;
  Bairro: string;
  CEP: string;
}; */
export type Postos = {
  cidade: string;
  local: string;
  rua: string;
  bairro: string;
  numero: number;
};

export type RequisitoServico = {
  quantity_militars: number;
  quantity_turnos: number;
  aleatoriedade: boolean;
  antiguidade: string[];
  modalidade: string;
  dateFirst: Date;
  dateFinish: Date;
  turnos: {
    initial: Date;
    finished: Date;
  }[];
};

export type Service = {
  posto: string;
  dia: Date;
  turno: [Date, Date];
  modalidade: string;
  militares: Militares_service[];
};

export interface IContextRequisitoData {
  requisitoServico: RequisitoServico;
  militars: Militares_service[];
  militaresRestantes: Militares_service[];
  postosServices: Postos[];
  services: Service[];
  handleSubmitRequisitos: (data: RequisitoServico) => void;
  handleRandomServices: () => void;
  //loadTotalMilitar: () => number;
  totalMilitar: number;
  totalMilitarEscalados: number;
}

export const RequisitosContext = createContext<
  IContextRequisitoData | undefined
>(undefined);

export const RequisitosProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Supondo que `useMilitares` retorna o tipo correto
  const { militares } = useMilitares();
  const { postos } = usePostos();
  // Inicializa o estado com `militares` se ele for do tipo correto
  const [militars, setMilitares] = useState<Militares_service[]>(militares);
  //console.log('militars', militars);
  //console.log('postos', postos);

  const [militaresRestantes, setMilitaresRestantes] = useState<
    Militares_service[]
  >([]);
  const [postosServices, setPostosServices] = useState<Postos[]>(postos);
  const [totalMilitar, setTotalMilitar] = useState<number>(0);
  const [totalMilitarEscalados, setTotalMilitarEscalados] = useState<number>(0);
  const [services, setServices] = useState<Service[]>([]);
  const [requisitoServico, setRequisitoServico] = useState<RequisitoServico>();

  const handleSubmitRequisitos = useCallback((data: RequisitoServico) => {
    setRequisitoServico(data);
  }, []);
  const loadTotalMilitar = () => {
    setTotalMilitar(militars.length);
  };
  const loadTotalMilitarEscalados = (int: number) => {
    setTotalMilitarEscalados(p => p + int);
  };
  useEffect(() => {
    loadTotalMilitar();
  }, [militars, militares]);
  useEffect(() => {
    if (militares && Array.isArray(militares)) {
      setMilitares(militares);
    } else {
      setMilitares([]); // Inicializa como array vazio se não for um array
    }
  }, [militares]);
  useEffect(() => {
    if (postos && Array.isArray(postos)) {
      setPostosServices(postos);
      //console.log('postos services', postosServices);
    } else {
      setPostosServices([]); // Inicializa como array vazio se não for um array
    }
  }, [postos, postosServices]);
  const handleRandomServices = () => {
    const generateServices = () => {
      const services: Service[] = [];
      let remainingMilitares = [...militars]; // Clona a lista de militares

      const groupedMilitares: Record<string, Militares_service[]> = {};

      if (!requisitoServico || !postosServices) return;

      let currentDate = new Date(requisitoServico.dateFirst);
      if (!requisitoServico.aleatoriedade) {
        while (currentDate <= requisitoServico.dateFinish) {
          requisitoServico.antiguidade.forEach((a, index) => {
            // Separa por posto/graduação

            const beforeAntiguidade = requisitoServico.antiguidade[index - 1];
            // Filtra militares de acordo com a antiguidade
            groupedMilitares[a] = remainingMilitares.filter(m => {
              //console.log('m', m);
              if (a === 'aleatorio') {
                // Se for 'aleatorio', incluir lógica específica aqui
                console.log('entrou em aleatorio');
                const aux = {
                  label: m.posto_grad,
                  name: m.nome_completo,
                  militarRank: optionsMilitares.find(
                    opt => opt.value === m.posto_grad,
                  )?.militarRank,
                };
                const aux2 = {
                  label: groupedMilitares[beforeAntiguidade][0].posto_grad,
                  name: groupedMilitares[beforeAntiguidade][0].nome_completo,
                  militarRank: optionsMilitares.find(
                    opt =>
                      opt.value ===
                      groupedMilitares[beforeAntiguidade][0].posto_grad,
                  )?.militarRank,
                };
                console.log('aux1', aux);
                console.log('aux2', aux2);
                if (
                  aux?.militarRank &&
                  aux2?.militarRank &&
                  Number(aux.militarRank) > Number(aux2.militarRank)
                ) {
                  return Number(aux.militarRank) > Number(aux2.militarRank); // Incluir no grupo 'aleatorio' se a condição for atendida
                }
              } else {
                return m.posto_grad === a; // Filtra militares que têm posto/graduação igual a 'a'
              }
            });
            console.log(groupedMilitares[a]);
            console.log(groupedMilitares[a]?.length);
          });

          requisitoServico.turnos.forEach(turno => {
            postosServices?.forEach(posto => {
              const selectedMilitares: Militares_service[] = [];

              // Preenche militares conforme a antiguidade e lotação
              requisitoServico.antiguidade.forEach(a => {
                const militaresComLotacao = groupedMilitares[a].filter(
                  m =>
                    selectedMilitares.length > 0 &&
                    m.opm === selectedMilitares[0].opm,
                );

                let militar;
                if (militaresComLotacao.length > 0) {
                  militar = militaresComLotacao[0];
                } else {
                  militar = groupedMilitares[a][0];
                }

                if (militar) {
                  selectedMilitares.push(militar);
                  groupedMilitares[a] = groupedMilitares[a].filter(
                    m => m.matricula !== militar.matricula,
                  );
                  remainingMilitares = remainingMilitares.filter(
                    m => m.matricula !== militar.matricula,
                  );
                }
              });

              requisitoServico.antiguidade.forEach((a, index) => {
                if (
                  selectedMilitares.length <
                    requisitoServico.quantity_militars &&
                  groupedMilitares[a].length === 0
                ) {
                  const nextAntiguidade =
                    requisitoServico.antiguidade[index + 1];
                  if (
                    nextAntiguidade &&
                    groupedMilitares[nextAntiguidade].length > 0
                  ) {
                    selectedMilitares.push(
                      groupedMilitares[nextAntiguidade].shift()!,
                    );
                  }
                }
              });

              // Cria o objeto de serviço
              const service: Service = {
                posto: `${posto?.Local} - ${posto?.Rua}-${posto?.Numero}, ${posto?.Bairro}, ${posto?.Cidade}`,
                dia: new Date(currentDate), // Clone para evitar mutação
                turno: [new Date(turno.initial), new Date(turno.finished)], // Hora do turno
                modalidade: requisitoServico.modalidade,
                militares: handleSortByPostoGrad(selectedMilitares, '2'), // Adiciona os militares selecionados
              };

              services.push(service);
              loadTotalMilitarEscalados(service.militares.length);
            });
          });

          currentDate.setDate(currentDate.getDate() + 1);
        }
      } else {
        requisitoServico.turnos.forEach(turno => {
          postosServices?.forEach(posto => {
            const selectedMilitares: Militares_service[] = [];
            let i = 0;
            // Preenche militares conforme a antiguidade e lotação
            while (i < requisitoServico.quantity_militars) {
              //Agora separa por lotação os que já foram separados por antiguidade
              const militaresComLotacao = remainingMilitares.filter(
                m =>
                  selectedMilitares.length > 0 &&
                  m.opm === selectedMilitares[0].opm,
              );

              let militar;
              if (militaresComLotacao.length > 0) {
                militar = militaresComLotacao[0];
              } else {
                militar = remainingMilitares[0];
              }

              if (militar) {
                selectedMilitares.push(militar);
                //console.log(selectedMilitares);
                remainingMilitares = remainingMilitares.filter(
                  m => m.matricula !== militar.matricula,
                );
              }

              i++;
            }

            /* requisitoServico.antiguidade.forEach((a, index) => {
              if (
                selectedMilitares.length < requisitoServico.quantity_militars &&
                groupedMilitares[a].length === 0
              ) {
                const nextAntiguidade = requisitoServico.antiguidade[index + 1];
                if (
                  nextAntiguidade &&
                  groupedMilitares[nextAntiguidade].length > 0
                ) {
                  selectedMilitares.push(
                    groupedMilitares[nextAntiguidade].shift()!,
                  );
                }
              }
            }); */

            // Cria o objeto de serviço
            const service: Service = {
              posto: `${posto?.Local} - ${posto?.Rua}-${posto?.Numero}, ${posto?.Bairro}, ${posto?.Cidade}`,
              dia: new Date(currentDate), // Clone para evitar mutação
              turno: [new Date(turno.initial), new Date(turno.finished)], // Hora do turno
              modalidade: requisitoServico.modalidade,
              militares: handleSortByPostoGrad(selectedMilitares, '2'), // Adiciona os militares selecionados
            };

            services.push(service);
            loadTotalMilitarEscalados(service.militares.length);
          });
        });
      }

      setServices(services);
      setMilitaresRestantes(remainingMilitares);
      return services;
    };

    generateServices();
  };

  const contextValue = useMemo(
    () => ({
      militars,
      postosServices,
      requisitoServico,
      services,
      totalMilitar,
      totalMilitarEscalados,
      militaresRestantes,
      handleSubmitRequisitos,
      handleRandomServices,
    }),
    [
      militars,
      postosServices,
      requisitoServico,
      services,
      totalMilitar,
      totalMilitarEscalados,
      militaresRestantes,
      handleSubmitRequisitos,
      handleRandomServices,
    ],
  );

  return (
    <RequisitosContext.Provider value={contextValue}>
      {children}
    </RequisitosContext.Provider>
  );
};
