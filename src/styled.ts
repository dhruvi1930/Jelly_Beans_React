import styled from "styled-components";
import { ModalProps } from "./types";

const Container = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.img`
  width: 200px;
  @media (max-width: 300px) {
    width: 100px;
  }
`;

const Button = styled.button`
  padding: 10px 30px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  background: #00b3ff;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding-top: 20px;
`;

const Label = styled.label`
  font-weight: 600;
`;

const InputFiled = styled.input`
  font-size: 16px;
  width: 200px;
  @media (max-width: 300px) {
    width: 100px;
  }
`;

const Modal = styled.div<ModalProps>`
  display: ${({ show }) => (show ? "block" : "none")};
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
  z-index: 1;
  top: 0;
  left: 0;
  overflow: auto;
`;

const ModalContent = styled.div`
  background-color: #fff;
  margin: 30% auto;
  padding: 30px;
  border: 1px solid #888;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 10px;
`;

const Close = styled.span`
  color: #aaa;
  font-size: 28px;
  font-weight: 600;
  cursor: pointer;

  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
  }
`;

const DataContainer = styled.div`
  margin: 30px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 50%;
  border-radius: 10px;
  background: #fff;
`;

export {
  Container,
  Logo,
  Button,
  InputContainer,
  Label,
  InputFiled,
  Modal,
  ModalContent,
  Close,
  DataContainer,
};
