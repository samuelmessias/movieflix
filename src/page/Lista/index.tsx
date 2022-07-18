import ButtonIcon from 'component/ButtonIcon';
import Card from 'component/Card';
import Navbar from 'component/Navbar';
import './style.css';

const Lista = () => {
  
  return (
    <div>      
      <div className="list-main">
        <div className="list-container">
          <h1>Tela detalhes do filme id: 1</h1>
        </div>
        <div className="base-card list-form">
          <form>
            <div className="mb-4">
              <input
                type="text"
                className="form-control base-input"
                placeholder="Email"
                name="pesquisar"
              />
            </div>

            <div className="login-submit">
              <ButtonIcon text="SALVAR AVALIAÇÃO" />
            </div>
          </form>
        </div>
        <div className="base-card list-card">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
};

export default Lista;
