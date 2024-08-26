import React, { createContext, useState, ReactNode, useMemo } from 'react';
import { useToast } from '@chakra-ui/react';
import { readString } from 'react-papaparse';
import { Militares_service } from '../requisitosContext/RequisitosContext';

export type Militares = {
  columns?: string[];
  registers?: { [key: string]: any }[];
};

export interface IContextMilitaresData {
  militares: Militares_service[];
  hasMoreMilitar: boolean;
  currentPositionMilitar: number;
  handleClickMilitar: () => void;
  handleOnChangeMilitar: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnSubmitMilitar: (e: React.FormEvent) => void;
  loadMoreMilitar: () => void;
  loadLessMilitar: () => void;
}

export const MilitaresContext = createContext<
  IContextMilitaresData | undefined
>(undefined);

export const MilitaresProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const toast = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [militares, setMilitares] = useState<Militares_service[]>([]);
  const [currentPositionMilitar, setCurrentPositionMilitar] = useState(0);
  const [hasMoreMilitar, setHasMoreMilitar] = useState(true);
  const rowsPerLoad = 100; // Número de linhas para carregar por vez

  const handleClickMilitar = () => {
    document.getElementById('militarInput')?.click();
  };

  const handleOnChangeMilitar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      const fileReader = new FileReader();

      fileReader.onload = event => {
        const text = event.target?.result;
        if (typeof text === 'string') {
          loadCSVChunk(text, 1, rowsPerLoad);
          setCurrentPositionMilitar(rowsPerLoad);
        }
      };

      fileReader.readAsText(e.target.files?.[0], 'ISO-8859-1'); // Usando encoding para suportar acentos

      // setMilitares([]);
      setCurrentPositionMilitar(0);
      setHasMoreMilitar(true);
    }
  };

  const loadCSVChunk = (text: string, start: number, end: number) => {
    const lines = text.split('\n');

    // Garantir que o header seja corretamente identificado
    const headerLine = lines[0];
    const csvRows = lines.slice(start, end);

    if (!headerLine || csvRows.length === 0) {
      setHasMoreMilitar(false);
      return;
    }

    // Parse the header to get the column names
    const results = readString([headerLine, ...csvRows].join('\n'), {
      header: true,
      delimiter: ';',
      skipEmptyLines: true,
      complete: result => {
        // Verifique se há problemas com o parsing
        if (result.errors.length > 0) {
          console.error('Erro ao processar CSV:', result.errors);
          return;
        }

        const parsedArray = result.data as any[];

        // Atualizar o estado com os novos dados
        setMilitares(prevArray => [...prevArray, ...parsedArray]);

        //console.log('Militares', parsedArray);

        // Checar se há mais dados para carregar
        if (parsedArray.length < end - start) {
          setHasMoreMilitar(false);
        }
      },
    });
    return results;
  };

  const handleOnSubmitMilitar = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = event => {
        const text = event.target?.result;
        if (typeof text === 'string') {
          loadCSVChunk(text, 1, rowsPerLoad);
          setCurrentPositionMilitar(rowsPerLoad);
        }
      };

      fileReader.readAsText(file, 'ISO-8859-1'); // Usando encoding para suportar acentos
    }
  };

  const loadMoreMilitar = () => {
    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = event => {
        const text = event.target?.result;
        if (typeof text === 'string') {
          loadCSVChunk(
            text,
            currentPositionMilitar + 1,
            currentPositionMilitar + rowsPerLoad,
          );
          setCurrentPositionMilitar(currentPositionMilitar + rowsPerLoad);
        }
      };

      fileReader.readAsText(file, 'ISO-8859-1');
    }
  };
  const loadLessMilitar = () => {
    if (file && currentPositionMilitar > rowsPerLoad) {
      const fileReader = new FileReader();

      fileReader.onload = event => {
        const text = event.target?.result;
        if (typeof text === 'string') {
          const newStart = Math.max(
            0,
            currentPositionMilitar - 2 * rowsPerLoad,
          );
          const newEnd = currentPositionMilitar - rowsPerLoad;

          loadCSVChunk(text, newStart, newEnd);

          setCurrentPositionMilitar(newStart + rowsPerLoad);
        }
      };

      fileReader.readAsText(file, 'ISO-8859-1');
    }
  };

  //const headerKeys = Militares.length > 0 ? Object.keys(Militares[0]) : [];

  const contextValue = useMemo(
    () => ({
      militares,
      hasMoreMilitar,
      currentPositionMilitar, // Incluído
      handleClickMilitar,
      loadMoreMilitar,
      loadLessMilitar,
      handleOnChangeMilitar,
      handleOnSubmitMilitar,
    }),
    [
      militares,
      hasMoreMilitar,
      currentPositionMilitar, // Incluído
      handleClickMilitar,
      loadMoreMilitar,
      loadLessMilitar,
      handleOnChangeMilitar,
      handleOnSubmitMilitar,
    ],
  );

  return (
    <MilitaresContext.Provider value={contextValue}>
      {children}
    </MilitaresContext.Provider>
  );
};
