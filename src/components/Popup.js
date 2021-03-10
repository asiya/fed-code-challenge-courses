import React, { useState } from "react";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const Popup = (props) => {
  const { buttonLabel, className } = props;
  const [email, setEmail] = useState("");
  const [passwordvalue, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const onDismiss = () => setVisible(false);
  const onDismissError = () => setError(false);
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
    setVisible(false);
    setError(false);
    setEmail("");
    setPassword("");
  };
  const login = () => {
    if (email && passwordvalue) {
      setVisible(true);
      setError(false);
      setTimeout(()=>{
        setModal(false);
      },1000);
    } else {
      setError(true);
      setVisible(false);
    }
  };
  return (
    <div>
      <Button color="primary" onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>User Login</ModalHeader>
        <ModalBody>
          <Alert color="info" isOpen={visible} toggle={onDismiss}>
            Login Successfull
          </Alert>
          <Alert color="danger" isOpen={error} toggle={onDismissError}>
            Please enter the details
          </Alert>
          <Form>
            <FormGroup>
              <Input
                type="email"
                name="email"
                id="login-email"
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="password"
                id="login-password"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </FormGroup>
            <Button onClick={login} color="primary">
              Login
            </Button>

            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Popup;
