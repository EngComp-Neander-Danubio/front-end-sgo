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
import { Militar, optionsMilitares } from '../../types/typesMilitar';
import { useRequisitos } from './useRequesitos';
import { useMilitares } from '../militares/useMilitares';

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

export type Postos = {
  Municipio: string;
  Local_de_Votacao: string;
  Endereco: string;
  Bairro: string;
  CEP: string;
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
  postos: Postos[];
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

  console.log(militares);

  // Inicializa o estado com `militares` se ele for do tipo correto
  const [militars, setMilitares] = useState<Militares_service[]>(militares);
  //console.log('militars', militars);

  const [militaresRestantes, setMilitaresRestantes] = useState<
    Militares_service[]
  >([]);
  const [postos, setPostos] = useState<Postos[]>(postosData);
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

  const handleRandomServices = () => {
    const generateServices = () => {
      const services: Service[] = [];
      let remainingMilitares = [...militars]; // Clona a lista de militares
      const groupedMilitares: Record<string, Militares_service[]> = {};

      if (!requisitoServico || !postosData) return;

      let currentDate = new Date(requisitoServico.dateFirst);
      while (currentDate <= requisitoServico.dateFinish) {
        requisitoServico.antiguidade.forEach(a => {
          //separa por posto/graduação
          groupedMilitares[a] = remainingMilitares.filter(
            m => m.posto_grad === a,
          );
        });

        postosData.forEach(posto => {
          requisitoServico.turnos.forEach(turno => {
            const selectedMilitares: Militares_service[] = [];

            // Preenche militares conforme a antiguidade e lotação
            requisitoServico.antiguidade.forEach(a => {
              //Agora separa por lotação os que já foram separados por antiguidade
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
                //console.log(selectedMilitares);
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
              }
            );

            // Cria o objeto de serviço
            const service: Service = {
              posto: `${posto.Local_de_Votacao}-${posto.Endereco}, ${posto.Bairro}, ${posto.Municipio}`,
              dia: new Date(currentDate), // Clone para evitar mutação
              turno: [new Date(turno.initial), new Date(turno.finished)], // Hora do turno
              modalidade: requisitoServico.modalidade,
              militares: selectedMilitares, // Adiciona os militares selecionados
            };

            services.push(service);
            loadTotalMilitarEscalados(service.militares.length);
          });
        });

        currentDate.setDate(currentDate.getDate() + 1);
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
      postos,
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
      postos,
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
