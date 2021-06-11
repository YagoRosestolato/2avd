import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api'
import { Container } from './styles';
import FcLike from 'react-icons/fc';

interface Cadastro {
  id: string;
  nomeevento: string;
  local: string;
  diasemana: string;
  horario: string;
  like?:number;
  dislike?: number;

 }
 const Dashboard: React.FC = () => {
  const history = useHistory();

  const [festa, setFesta] = useState<Cadastro[]>();
  useEffect(() => {
    api.get('/events').then((response) => {
      setFesta(response.data);
    });
  }, []);


  async function handleAddEvent(event: any) {
    event.preventDefault();

    const { target: form } = event;

    const novoCadastro = {
      nomeevento: form.nomeevento.value,
      local: form.local.value,
      diasemana: form.diasemana.value,
      horario: form.horario.value,
    };

    await api.post('/events', novoCadastro);
    document.location.reload(true);
    form.reset();
  }
     function deletarEvento(id: string) {
      api.delete(`/events/${id}`);
      window.location.href='/'
    }
    async function botaoLike(id: string) {
      await api.post(`/events/like/${id}`);

      document.location.reload(true);
    }

    async function botaoDislike(id: string) {
      await api.post(`/events/dislike/${id}`);

      document.location.reload(true);
    }



  return (
    <Container>
      <form onSubmit = {handleAddEvent}>
        <input type='text' name='nomeevento' placeholder='Nome do Evento' />
        <input type='text' name='local' placeholder='Local do Evento' />
        <input type='text' name='diasemana' placeholder='Dia da Semana' />
        <input type='text' name="horario" placeholder="Horário" />
        <button type="submit">Salvar</button>
      </form>
      <ul>
        {festa
          ? festa.map((festaUnitaria) => (
              <li key={festaUnitaria.nomeevento}>
                  <span>Evento: {festaUnitaria.nomeevento}</span>
                  <span>Local: {festaUnitaria.local}</span>
                  <span>Dia Semana: {festaUnitaria.diasemana}</span>
                  <span>Horario: {festaUnitaria.horario}</span>
                  <button
                      onClick={() => {
                        deletarEvento(festaUnitaria.id);
                      }}
                    >
                      Deletar
                    </button>
                    <button
                      onClick={() => {
                      botaoLike(festaUnitaria.id);
                      }}
                    >
                      Like
                      ({festaUnitaria.like
                        ? festaUnitaria.like
                        : '0'})
                    </button>
                    <button
                      onClick={() => {
                        botaoDislike(festaUnitaria.id);
                      }}
                    >
                      Dislike
                      ({festaUnitaria.dislike
                        ? festaUnitaria.dislike
                        : '0'})
                    </button>



              </li>
            ))
          : ''}

      </ul>
    </Container>
  )
}
export default Dashboard



