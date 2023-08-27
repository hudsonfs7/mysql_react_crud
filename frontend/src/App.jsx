import Global from "./styles/global"
import Form from "./components/Form"
import Grid from "./components/Grid"
import axios from "axios"
import { useState, useEffect } from "react"

import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import {Container, Title} from './styles/app'

function App() {
const [users, setUsers] = useState([])
const [onEdit, setOnEdit] = useState(null)

const getUsers = async () => {
  try {
    const res = await axios.get('http://localhost:8800/')
    setUsers(res.data.sort((a, b) => (a.name > b.name ? 1 : -1)))
  } catch (error){
    toast.error(error)
  }
}

useEffect(() => {
  getUsers()
}, [setUsers])



  return (
    <>
      <Container>
      <Title>Usuários</Title>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />

      <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />

      </Container>

      
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <Global />
    </>
  )
}

export default App
