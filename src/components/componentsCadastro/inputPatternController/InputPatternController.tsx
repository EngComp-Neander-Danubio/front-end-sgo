import {
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

interface IInput extends InputProps {
  error?: FieldError | { message?: string };
  children?: React.ReactNode; // Define a prop children corretamente
}

export const InputPatternController: React.FC<IInput> = ({
  error,
  children, // Corrige para "children"
  ...props
}) => {
  return (
    <FormControl flexDirection={'column'} isInvalid={!!error}>
      <InputGroup>
        {children && (
          <InputRightElement pointerEvents="none">{children}</InputRightElement>
        )}
        <Flex flexDirection={'column'}>
          <Input type={props.type} placeholder={props.placeholder} {...props} />
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </Flex>
      </InputGroup>
    </FormControl>
  );
};
