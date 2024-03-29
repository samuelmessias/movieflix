import { type } from '@testing-library/user-event/dist/type';
import { AuthContext } from 'AuthContext';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { getAuthData, getTokenData, requestBackendLogin, saveAuthData } from 'util/requests';
import ButtonIcon from '../../../component/ButtonIcon';
import './styles.css';

type FormData = {
  username: string;
  password: string;
};

type LocationState = {
  from: string;
}


const Login = () => {
const location = useLocation<LocationState>();

const { from } = location.state || { from: {pathname: '/movies' }}

  const { setAuthContextData } = useContext(AuthContext);

  const [hasError, setHasError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

const history = useHistory();

  const onSubmit = (formData: FormData) => {
    requestBackendLogin(formData)
      .then((response) => {
        saveAuthData(response.data);

        const token = getAuthData().access_token; 
        setHasError(false);
        
        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData(),
        });
        history.replace(from);

      })
      .catch((error) => {
        setHasError(true);
        console.log('ERRO', error);
      });
  };

  return (
    <div className="base-conteiner">
      <div className="base-card login-card">
        <h1>LOGIN</h1>
        {hasError && (
          <div className="alert alert-danger">
            Erro ao tentar efetuar o login!
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              {...register('username', {
                required: 'Campo ogrigatório',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido',
                },
              })}
              type="text"
              className={`form-control base-input ${
                errors.username ? 'is-invalid' : ''
              }`}
              placeholder="Email"
              name="username"
            />
            <div className="invalid-feedback d-block">
              {errors.username?.message}
            </div>
          </div>
          <div className="mb-2">
            <input
              {...register('password', {
                required: 'Campo ogrigatório',
              })}
              type="password"
              className={`form-control base-input ${
                errors.password ? 'is-invalid' : ''
              }`}
              placeholder="Password"
              name="password"
            />
            <div className="invalid-feedback d-block">
              {errors.password?.message}
            </div>
          </div>

          <div className="login-submit">
            <ButtonIcon text="Fazer login" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
