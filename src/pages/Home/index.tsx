import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { Activity } from '../../types/activity'
import { Container } from '../../styles/layout'
import {
  ActivityList,
  ActivityItem,
  TitleWrapper,
  NewActivityLink,
  Wrapper,
  Status,
  ButtonWrapper,
} from './styles'
import { SearchForm } from '../../components/SearchForm'
import { ActivityContext } from '../../contexts/ActivityContext'

const Home: React.FC = () => {
  const context = useContext(ActivityContext)

  const activities = context.activities
  const deleteActivity = context.deleteActivity

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm(
      'Você realmente deseja deletar esta atividade?',
    )

    if (isConfirmed) {
      try {
        await deleteActivity(id)
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <Container>
      <TitleWrapper>
        <h1>Sign Activities</h1>
        <NewActivityLink to="/add">Nova atividade</NewActivityLink>
      </TitleWrapper>
      <SearchForm />
      <Wrapper>
        <ActivityList>
          {activities.length > 0 ? (
            activities.map((activity: Activity) => (
              <ActivityItem key={activity.id}>
                <div className="info">
                  <h3>{activity.title}</h3>
                  <p>Tipo: {activity.type}</p>
                  <p>{activity.description}</p>
                </div>
                <p>Início: {format(activity.startDate, 'dd/MM/yyyy')}</p>
                <p>Prazo: {format(activity.dueDate, 'dd/MM/yyyy')}</p>
                {activity.endDate && (
                  <p>
                    Conclusão:
                    {format(activity.endDate, 'dd/MM/yyyy')}
                  </p>
                )}
                <Status $status={activity.status}>{activity.status}</Status>
                <ButtonWrapper>
                  <Link to={`/edit/${activity.id}`}>Editar</Link>
                  <button onClick={() => handleDelete(activity.id)}>
                    Excluir
                  </button>
                </ButtonWrapper>
              </ActivityItem>
            ))
          ) : (
            <p>Nenhuma atividade cadastrada</p>
          )}
        </ActivityList>
      </Wrapper>
    </Container>
  )
}

export default Home
