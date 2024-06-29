import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Wrapper = styled.div``

export const TitleWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  color: #fff;
`

export const NewActivityLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  background-color: var(--green);
  border: 0;
  padding: 0 2rem;
  border-radius: 0.25rem;
  height: 3rem;
  transition: filter 0.25s;
  text-decoration: none;

  &:hover {
    filter: brightness(0.9);
  }
`

export const ActivityList = styled.ul`
  list-style: none;
  padding: 0;
`

export const ActivityItem = styled.li`
  position: relative;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: #323238;
  border-radius: 5px;
  color: #c4c4cc;

  .info {
    margin-bottom: 20px;
  }
`

export const Status = styled.span<{ $status?: string }>`
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  background-color: ${(props) => {
    switch (props.$status) {
      case 'open':
        return props.theme['yellow-300']
      case 'completed':
        return props.theme['green-500']

      default:
        return props.theme['gray-500']
    }
  }};
  color: #fff;
  font-weight: 700;
  font-size: 0.75rem;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: start;
  margin-top: 1rem;
  gap: 1rem;

  a {
    color: #fff;
    background-color: ${(props) => props.theme['gray-500']};
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    text-decoration: none;
    font-size: 0.875rem;
  }

  button {
    color: #fff;
    background-color: ${(props) => props.theme['red-500']};
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    border: 0;
    cursor: pointer;
  }
`
