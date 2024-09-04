import { IconProps, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { BiTrash } from 'react-icons/bi';
interface IIcone extends IconProps {
  label_tooltip?: string;
  handleDelete?: (id: string) => Promise<void>;
}
export const IconeDeletar: React.FC<IIcone> = ({
  label_tooltip,
  handleDelete,
}) => {
  return (
    <>
      <Tooltip
        label={`Deletar ${label_tooltip}`}
        aria-label="A tooltip"
        placement="top"
      >
        <span>
          <BiTrash color="#A0AEC0" size={'20px'} onClick={() => handleDelete} />
        </span>
      </Tooltip>
    </>
  );
};
