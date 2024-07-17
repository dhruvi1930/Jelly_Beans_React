interface User {
  name: string;
  guess: number;
  theme: string;
}

interface UserProps {
  theme: string;
}

interface ModalProps {
  show: boolean;
}

export type { User, UserProps, ModalProps };
