import React, {useState} from "react";
import "./style.css";

export default function App() {
  const db = [{
    id: 1,
    nombre: "María",
    apellido: "Castillo"
  },
  {
    id: 2,
    nombre: "José",
    apellido: "Caro"
  }
  ];

  const [datos, setDatos] = useState(db);

  const [form, setForm] = useState({
    id: null,
    nombre: "",
    apellido: ""
  })

  const capturadorInput = (e) => {
    const {name, value} = e.target;
     // console.log(value)
    setForm({
      ...form,
      [name] : value
    })
  }
  const crearDatos = (nuevoIngreso) => {
    const id = datos[datos.length-1].id + 1;
    const nuevosDatos = {...nuevoIngreso, id: id}
    //console.log(nuevosDatos)
    setDatos([
      ...datos,
      nuevosDatos
    ])
  }
  const enviarFormulario = (e) => {
      e.preventDefault();
      crearDatos(form)
      setForm()
  }

  return (
    <div>
      <form onSubmit={enviarFormulario}>
        <input 
          name="nombre"
          type="text"
          placeholder="nombre"
          onChange={capturadorInput}
        />
        <input 
          name="apellido"
          type="text"
          placeholder="apellido"
          onChange={capturadorInput}
        />
        <button type="submit">Enviar</button>
      </form>
      <hr/>
      <ul>
        {
          datos.map(item => {
            return (
              <li key={item.id}>{item.id}- {item.nombre} {item.apellido} </li>
            )
          })
        }
      </ul>
    </div>
  );
}
