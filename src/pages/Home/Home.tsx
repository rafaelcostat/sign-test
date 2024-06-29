// src/components/ActivityList.tsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { getActivities, deleteActivity } from '../../services/api'
import { Activity } from '../../types/activity'
import { Container, ActivityList, ActivityItem } from './styles'

const Home: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    fetchActivities()
  }, [])

  const fetchActivities = async () => {
    const data = await getActivities()
    setActivities(data)
  }

  const handleDelete = async (id: number) => {
    await deleteActivity(id)
    fetchActivities()
  }

  return (
    <Container>
      <h2>Lista de Atividades</h2>
      <ActivityList>
        {activities.length > 0 ? (
          activities.map((activity: Activity) => (
            <ActivityItem key={activity.id}>
              <h3>{activity.title}</h3>
              <p>Tipo: {activity.type}</p>
              <p>Descrição: {activity.description}</p>
              <p>
                Início: {format(new Date(activity.startDate), 'dd/MM/yyyy')}
              </p>
              {/* <p>Fim: {format(new Date(activity.endDate), 'dd/MM/yyyy')}</p> */}
              <p>Status: {activity.status}</p>
              <Link to={`/edit/${activity.id}`}>Editar</Link>
              <button onClick={() => handleDelete(activity.id)}>Excluir</button>
            </ActivityItem>
          ))
        ) : (
          <p>Nenhuma atividade cadastrada</p>
        )}
      </ActivityList>
    </Container>
  )
}

export default Home
