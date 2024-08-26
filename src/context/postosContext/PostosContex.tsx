import React, { createContext, useState, ReactNode, useMemo } from 'react';

import { useToast } from '@chakra-ui/react';
import { readString } from 'react-papaparse';
export type Posto = {
  columns?: string[];
  registers?: { [key: string]: any }[];
};

export interface IContextPostoData {
  postos: Posto[];
  hasMore: boolean;
  currentPosition: number;
  handleClick: () => void;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnSubmitP: (e: React.FormEvent) => void;
  loadMore: () => void;
  loadLess: () => void;
}

export const PostosContext = createContext<IContextPostoData | undefined>(
  undefined,
);

export const PostosProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [postos, setPostos] = useState<Posto[]>([]);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const rowsPerLoad = 100; // Número de linhas para carregar por vez

  const handleClick = () => {
    document.getElementById('postoInput')?.click();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);

      const fileReader = new FileReader();

      fileReader.onload = event => {
        const text = event.target?.result;
        if (typeof text === 'string') {
          loadCSVChunk(text, 1, rowsPerLoad);
          setCurrentPosition(rowsPerLoad);
        }
      };

      fileReader.readAsText(e.target.files?.[0], 'ISO-8859-1'); // Usando encoding para suportar acentos

      setCurrentPosition(0);
      setHasMore(true);
    }
  };

  const loadCSVChunk = (text: string, start: number, end: number) => {
    const lines = text.split('\n');

    // Garantir que o header seja corretamente identificado
    const headerLine = lines[0];
    const csvRows = lines.slice(start, end);

    if (!headerLine || csvRows.length === 0) {
      setHasMore(false);
      return;
    }

    // Parse the header to get the column names
    const result = readString([headerLine, ...csvRows].join('\n'), {
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
        setPostos(prevArray => [...prevArray, ...parsedArray]);

        console.log('Postos', parsedArray);

        // Checar se há mais dados para carregar
        if (parsedArray.length < end - start) {
          setHasMore(false);
        }
      },
    });
    return result;
  };

  const handleOnSubmitP = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = event => {
        const text = event.target?.result;
        if (typeof text === 'string') {
          loadCSVChunk(text, 1, rowsPerLoad);
          setCurrentPosition(rowsPerLoad);
        }
      };

      fileReader.readAsText(file, 'ISO-8859-1'); // Usando encoding para suportar acentos
    }
  };

  const loadMore = () => {
    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = event => {
        const text = event.target?.result;
        if (typeof text === 'string') {
          loadCSVChunk(
            text,
            currentPosition + 1,
            currentPosition + rowsPerLoad,
          );
          setCurrentPosition(currentPosition + rowsPerLoad);
        }
      };

      fileReader.readAsText(file, 'ISO-8859-1');
    }
  };
  const loadLess = () => {
    if (file && currentPosition > rowsPerLoad) {
      const fileReader = new FileReader();

      fileReader.onload = event => {
        const text = event.target?.result;
        if (typeof text === 'string') {
          const newStart = Math.max(0, currentPosition - 2 * rowsPerLoad);
          const newEnd = currentPosition - rowsPerLoad;

          loadCSVChunk(text, newStart, newEnd);

          setCurrentPosition(newStart + rowsPerLoad);
        }
      };

      fileReader.readAsText(file, 'ISO-8859-1');
    }
  };

  //const headerKeys = postos.length > 0 ? Object.keys(postos[0]) : [];

  const contextValue = useMemo(
    () => ({
      postos,
      hasMore,
      currentPosition, // Incluído
      handleClick,
      loadMore,
      loadLess,
      handleOnChange,
      handleOnSubmitP,
    }),
    [
      postos,
      hasMore,
      currentPosition, // Incluído
      handleClick,
      loadMore,
      loadLess,
      handleOnChange,
      handleOnSubmitP,
    ],
  );

  return (
    <PostosContext.Provider value={contextValue}>
      {children}
    </PostosContext.Provider>
  );
};
