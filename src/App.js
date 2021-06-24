import React, { useState } from 'react';
import './style.css';

export default function App() {
  const db = [
    {
      id: 1,
      personaje: 'Capitán América',
      pelicula: 'El primer Vengador'
    },
    {
      id: 2,
      personaje: 'Iron Man',
      pelicula: 'Avengers: Infinity Wars'
    }
  ];

  const [datos, setDatos] = useState(db);

  const [form, setForm] = useState({
    id: null,
    personaje: '',
    pelicula: ''
  });

  const capturadorInput = e => {
    const { name, value } = e.target;
    // console.log(value)
    setForm({
      ...form,
      [name]: value
    });
  };
  const crearDatos = nuevoIngreso => {
    const id = datos[datos.length - 1].id + 1;
    const nuevosDatos = { ...nuevoIngreso, id: id };
    //console.log(nuevosDatos)
    setDatos([...datos, nuevosDatos]);
  };
  const enviarFormulario = e => {
    e.preventDefault();
    crearDatos(form);
    e.target.reset();
  };

  const [favoritos, setFavoritos] = useState([]);

  const agregarFavorito = person => {
    setFavoritos(favoritos.concat(person));
  };
  const eliminarFavorito = id => {
    setFavoritos(favoritos.filter(item => item.id !== id))
  }

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <h2 className="navbar-brand">Personajes Favoritos</h2>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {favoritos.length} Favoritos <i className="fas fa-star text-warning" />
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end justify-content-end"
              aria-labelledby="dropdownMenuButton2"
            >
              {favoritos.length > 0 ? (
                favoritos.map(favorito => {
                  return (
                    <li key={favorito.id} className="dropdown-item px-3 d-flex justify-content-end">
                      {favorito.personaje}
                      <button
                        className="btn btn-danger ms-3"
                        type="button"
                        onClick={()=> eliminarFavorito(favorito.id)}
                      >
                        <i className="fas fa-trash" />
                      </button>
                    </li>
                  );
                })
              ) : (
                <li> Aún no hay favoritos</li>
              )}
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="d-grid gap-2">
                <button className="dropdown-item">Eliminar todos</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <form onSubmit={enviarFormulario}>
        <input
          className="form-control my-2"
          name="personaje"
          type="text"
          placeholder="Nombre Personaje"
          onChange={capturadorInput}
        />
        <input
          className="form-control my-2"
          name="pelicula"
          type="text"
          placeholder="Pelicula"
          onChange={capturadorInput}
        />
        <button className="btn btn-primary" type="submit">
          Crear
        </button>
      </form>
      <hr />
      <div className="container">
        <p className="text-center">
          Haz click en el <i className="fas fa-heart text-danger" /> para añadir
          a favoritos
        </p>
        <div className="row">
          {datos.map(item => {
            return (
              <div key={item.id} className="col-6 my-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{item.personaje}</h5>
                    <p className="card-text">{item.pelicula}</p>
                    <button
                      onClick={() => agregarFavorito(item)}
                      className="btn btn-light"
                    >
                      <i className="fas fa-heart text-danger" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
