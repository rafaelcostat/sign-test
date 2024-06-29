import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Content = styled.div`
  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      width: 100%;
      border-radius: 6px;
      border: 0;
      background: ${(props) => props.theme['gray-900']};
      color: ${(props) => props.theme['gray-300']};
      padding: 1rem;

      &::placeholder {
        color: ${(props) => props.theme['gray-500']};
      }

      &:focus {
        outline: 2px solid ${(props) => props.theme['green-500']};
      }
    }

    label {
      color: ${(props) => props.theme['gray-100']};
      font-size: 0.75rem;
      font-weight: bold;
      padding-bottom: 0.5rem;
      display: block;
    }

    button[type='submit'] {
      height: 58px;
      width: 100%;
      border: 0;
      background: ${(props) => props.theme['green-500']};
      color: ${(props) => props.theme.white};
      font-weight: bold;
      padding: 0 1.25rem;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.2s;

      &:disabled {
        opacity: 0.7;
      }

      &:not(:disabled):hover {
        background: ${(props) => props.theme['green-700']};
      }
    }

    textarea {
      width: 100%;
      height: 150px;
      border: 0;
      border-radius: 6px;
      padding: 1rem;
      background: ${(props) => props.theme['gray-900']};
      color: ${(props) => props.theme['gray-100']};
      resize: vertical;

      &::placeholder {
        color: ${(props) => props.theme['gray-500']};
      }

      &:focus {
        outline: 2px solid ${(props) => props.theme['green-500']};
      }
    }

    select {
      width: 100%;
      height: 58px;
      border: 0;
      border-radius: 6px;
      padding: 0 1rem;
      background: ${(props) => props.theme['gray-900']};
      color: ${(props) => props.theme['gray-100']};
      cursor: pointer;

      &:focus {
        outline: 2px solid ${(props) => props.theme['green-500']};
      }
    }
  }
`

export const Error = styled.p`
  color: ${(props) => props.theme['red-300']};
  font-size: 0.875rem;
`
export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  > div {
    width: 100%;
  }
`

export const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;
`

export const LinkBtn = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 58px;
  padding: 0.5rem 1rem;
  background: ${(props) => props.theme['gray-500']};
  color: ${(props) => props.theme.white};
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.2s;
  font-size: 0.875rem;
  width: 100%;

  &:hover {
    background: ${(props) => props.theme['blue-700']};
  }
`
