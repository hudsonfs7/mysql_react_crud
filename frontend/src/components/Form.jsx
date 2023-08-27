import axios from 'axios'
import React, { useRef, useEffect } from 'react'
import { toast } from 'react-toastify'
import { FormContainer, InputArea, Input, Label, Button } from '../styles/form';


const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef()

  useEffect(() => {
    if (onEdit) {
      const user = ref.current

      user.name.value = onEdit.name
      user.email.value = onEdit.email
      user.phone.value = onEdit.phone
      user.bdate.value = onEdit.bdate
    }
  }, [onEdit])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = ref.current

    if (
      !user.name.value || 
      !user.email.value || 
      !user.phone.value || 
      !user.bdate.value      
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
      .put('http://localhost:8800/' + onEdit.id, {
        name: user.name.value,  
        email: user.email.value,  
        phone: user.phone.value,  
        bdate: user.bdate.value,      
      }).then(({ data }) => toast.success(data)).catch(({ data }) => toast.error(data))
    } else {
      await axios.post('http://localhost:8800/', {
        name: user.name.value,  
        email: user.email.value,  
        phone: user.phone.value,  
        bdate: user.bdate.value, 
      })
      .then(({ data }) => toast.success(data))
      .catch(({ data }) => toast.error(data))
    }

    user.name.value = ""  
    user.email.value = ""  
    user.phone.value = ""  
    user.bdate.value = ""

    setOnEdit(null)
    getUsers()
  }






  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="name" />
      </InputArea>
      <InputArea>
        <Label>Email</Label>
        <Input name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="phone" />
      </InputArea>
      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input name="bdate" type="date" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  )
}

export default Form
