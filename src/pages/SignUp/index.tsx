/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useRef, useState } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { Link, useHistory } from 'react-router-dom';

import { Helmet } from 'react-helmet';

import { toast } from 'react-toastify';
import GoogleLogo from '../../assets/Google__G__Logo.svg';

import {
  Container,
  Content,
  AnimationContainer,
  Background,
  OrBox,
  GoogleSignIn,
  RedirectLink,
} from './styles';

import Input from '../../components/Login/Input';
import Button from '../../components/Login/Button';
import Carousel from '../../components/Login/Carousel';
import { useAuth } from '../../context/AuthContext';
import getValidationErrors from '../../utils/getValidationErrors';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();

  const handleSubmit = async (data: SignUpFormData) => {
    try {
      setLoading(true);

      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome não pode ser vazio'),
        email: Yup.string()
          .required('E-mail não pode ser vazio')
          .email('O e-mail está incorreto'),
        password: Yup.string()
          .min(6, 'A senha não pode ter menos de 6 caracteres')
          .required('Senha não pode ser vazia'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
      }).then(() => {
        toast.success('Conta criada com sucesso!');
        setTimeout(() => {
          history.push('/');
        }, 1500);
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        if (errors.name) {
          toast.error(errors.name);
        }
        if (errors.email) {
          toast.error(errors.email);
        }
        if (errors.password) {
          toast.error(errors.password);
        }
        formRef.current?.setErrors(errors);
        return;
      }

      toast.error('Criação de conta Falhou. Verifique os dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Helmet>
        <title>Welcome To Invision</title>
      </Helmet>

      <Background>{window.screen.width < 768 ? ' ' : <Carousel />}</Background>
      <Content>
        <h1>Invision</h1>
        <AnimationContainer>
          <h2>Getting Started</h2>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <p>Full Name</p>
            <Input
              name="name"
              placeholder="Carolina Galvão dos Santos Zaglia"
            />
            <p>Users name or Email</p>
            <Input name="email" placeholder="carolinagalvaosantos@gmail.com" />
            <p>Password</p>
            <Input
              name="password"
              isPassword
              type="password"
              placeholder="****************"
            />

            <Button role="signup" loading={loading} type="submit">
              Sign Up
            </Button>
          </Form>

          <OrBox>
            <hr />
            Or
            <hr />
          </OrBox>

          <GoogleSignIn>
            <img src={GoogleLogo} alt="Google Logo" />
            <p>Sign in with Google</p>
          </GoogleSignIn>
          <RedirectLink>
            <>
              <span>
                By signing up, you agree to <b>Invision</b>
                <div>
                  <a href="#">Terms of Conditions</a>&nbsp; and &nbsp;
                  <a href="#">Privacy Policy</a>
                </div>
              </span>
            </>
          </RedirectLink>
          <RedirectLink>
            <p>
              Already on
              <b> invision?&nbsp;</b>
            </p>
            <Link to="/"> Log in</Link>
          </RedirectLink>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
