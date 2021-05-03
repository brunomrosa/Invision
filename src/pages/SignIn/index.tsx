/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/aria-role */
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

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();

  const handleSubmit = async (data: SignInFormData) => {
    try {
      setLoading(true);

      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
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

      await signIn({
        email: data.email,
        password: data.password,
      }).then(() => {
        toast.success('Login feito com sucesso!');
        setTimeout(() => {
          history.push('/dashboard');
        }, 1500);
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        if (errors.email) {
          toast.error(errors.email);
        }
        if (errors.password) {
          toast.error(errors.password);
        }

        formRef.current?.setErrors(errors);
        return;
      }

      toast.error('Autenticação Falhou. Verifique os dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Helmet>
        <title>Invision</title>
      </Helmet>

      <Background>{window.screen.width < 768 ? ' ' : <Carousel />}</Background>
      <Content>
        <h1>Invision</h1>
        <AnimationContainer>
          <h2>Welcome To Invision</h2>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <p>Users name or Email</p>
            <Input name="email" placeholder="carolinagalvaosantos@gmail.com" />
            <p>Password</p>
            <Input
              name="password"
              isPassword
              type="password"
              placeholder="****************"
            />
            <Link to="#">Forgot password?</Link>

            <Button role="signin" loading={loading} type="submit">
              Sign In
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
            <p>
              New
              <b> invision?&nbsp;</b>
            </p>
            <Link to="/signup"> Create Account</Link>
          </RedirectLink>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignIn;
