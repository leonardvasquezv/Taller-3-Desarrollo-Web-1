import React from "react";
import { nanoid } from "nanoid";
import swal from "sweetalert"
import { firebase } from './firebase'

const Formulario = () => {
  const [nombre, setNombre] = React.useState("");
  const [cedula, setCedula] = React.useState("");
  const [telefono, setTelefono] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");
  const [url, setURL] = React.useState("")
  const [id, setId] = React.useState("")
  const [listaCandidatos, setListaCandidatos] = React.useState([])
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [error, setError] = React.useState(null)



  const obtenerImagenes = async () => {
    let azar = parseInt(Math.random() * 100)
    try {
      const res = await fetch("https://picsum.photos/id/" + azar + "/500")
      const url = await res.url
      setURL(url)
    } catch (error) {

    }
  }


  React.useEffect(() => {


    const obtenerDatos = async () => {
      try {
        const db = firebase.firestore()
        const data = await db.collection('candidatos').get()
        const arrayData = data.docs.map(doc => (
          { id: doc.id, ...doc.data() }
        ))
        //console.log(arrayData)
        setListaCandidatos(arrayData)
      } catch (error) {

      }
    }
    obtenerDatos();

  })

  const guardarEmpleado = async (e) => {


    e.preventDefault()

    if (!nombre.trim()) {
      setError('Digite el nombre')
      return
    }
    if (!cedula.trim()) {
      setError('Digite la cedula')
      return
    }
    if (!telefono.trim()) {
      setError('Digite la telefono')
      return
    }
    if (!email.trim()) {
      setError('Digite el email')
      return
    }
    if (!descripcion.trim()) {
      setError('Digite el descripcion')
      return
    }

    try {
      swal({
        position: 'top-end',
        icon: 'success',
        title: 'Agregado',
        showConfirmButton: false,
        timer: 700
      })
      const db = firebase.firestore()
      const nuevoEmpleado = {
        aNombre: nombre, aCedula: cedula, aTelefono: telefono, aEmail: email, aDescripcion: descripcion, aFoto: url
      }
      await db.collection('candidatos').add(nuevoEmpleado)

      setListaCandidatos([
        ...listaCandidatos,
        { id: nanoid(), aNombre: nombre, aCedula: cedula, aTelefono: telefono, aEmail: email, aDescripcion: descripcion, aFoto: url }
      ])

      e.target.reset()
      setNombre('')
      setCedula('')
      setTelefono('')
      setEmail('')
      setDescripcion('')
      setError(null)

    } catch (error) {
      console.log(error)
    }
  }

  const editar = item => {
    setId(item.id)
    setNombre(item.aNombre)
    setCedula(item.aCedula)
    setTelefono(item.aTelefono)
    setEmail(item.aEmail)
    setDescripcion(item.aDescripcion)
    setModoEdicion(true)
    setError(null)
  }

  const editarEmpleado = async e => {
    e.preventDefault()

    if (!nombre.trim()) {
      setError('Digite el nombre')
      return
    }
    if (!cedula.trim()) {
      setError('Digite la cedula')
      return
    }
    if (!telefono.trim()) {
      setError('Digite el telefono')
      return
    }
    if (!email.trim()) {
      setError('Digite el email')
      return
    }
    if (!descripcion.trim()) {
      setError('Digite la descripcion')
      return
    }

    try {
      const db = firebase.firestore()
      await db.collection('candidatos').doc(id).update({
        aNombre: nombre, aCedula: cedula, aTelefono: telefono, aEmail: email, aDescripcion: descripcion, aFoto: url
      })
      const arrayEditado = listaCandidatos.map(
        item => item.id === id ? { id: id, aNombre: nombre, aCedula: cedula, aTelefono: telefono, aEmail: email, aDescripcion: descripcion, aFoto: url } : item
      )
      setListaCandidatos(arrayEditado)
      setId('')
      setNombre('')
      setCedula('')
      setTelefono('')
      setEmail('')
      setDescripcion('')
      setModoEdicion(false)
    } catch (error) {
      console.log(error)
    }
  }

  const eliminar = id => {
    swal({
      title: '¿Estás seguro?',
      text: "No podrás deshacer esta acción.",
      icon: 'warning',
      buttons: ["No", "Sí"]
    }).then(async (result) => {
      if (result) {
        try {
          const db = firebase.firestore()
          await db.collection('candidatos').doc(id).delete()
          const aux = listaCandidatos.filter(item => item.id !== id)
          setListaCandidatos(aux)
        } catch (error) {
          console.log(error)
        }
        swal({
          position: 'top-end',
          icon: 'success',
          title: 'Eliminado',
          showConfirmButton: false,
          timer: 700
        })
      }
    })
  }

  const cancelar = () => {
    setModoEdicion(false)
    setId('')
    setNombre('')
    setCedula('')
    setTelefono('')
    setEmail('')
    setDescripcion('')
    setError(null)
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center row justify-content-center mb-5 colortexto">Test Psicotécnico B/N</h1>

      <div className="formularioEmpleados row">
        <div className="col-4 ladoFoto" style={{backgroundImage: 'url(' + url + ')'}}>
          <button className="btn btn-primary btn-block ibutton" onClick={() => obtenerImagenes()}>Cambiar Imagen</button>
        </div>
        <div className="col-8 justify-content-end ladoCajas">
          <form onSubmit={modoEdicion ? editarEmpleado : guardarEmpleado} className="text-center">
            {
              error ? <span className="text-danger">{error}</span> : null
            }
            <input className="txt mb-2" type="text" placeholder="Nombre..."
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
            />
            <input className="txt mb-2" type="text" placeholder="Cedula..."
              onChange={(e) => setCedula(e.target.value)}
              value={cedula}
            />
            <input className="txt mb-2" type="text" placeholder="Telefono..."
              onChange={(e) => setTelefono(e.target.value)}
              value={telefono}
            />
            <input className="txt mb-2" type="text" placeholder="Email..."
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input className="txt mb-2" type="text" placeholder="Por favor, escriba una descripcion de la imágen en 2 palabras..."
              onChange={(e) => setDescripcion(e.target.value)}
              value={descripcion}
            />
            {
              modoEdicion ?
                (
                  <>
                    <button className="btn btn-warning btn-block" type="submit">Editar</button>
                    <button className="btn btn-dark btn-block" onClick={() => cancelar}>Cancelar</button>
                  </>
                )
                :
                <>
                  <button className="btn btn-primary btn-block mt-4" type="submit">Agregar Registro</button>
                </>

            }
          </form>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <h4 className="text-center mb-3 colortexto">Registros</h4>
          <ul className="list-group">
            {
              listaCandidatos.map(item => (
                <li className="list-group-item listadoEmpleados row" key={item.id}>
                  <span className="lead col-8">{item.aNombre} - {item.aCedula} - {item.aTelefono} - {item.aEmail} - {item.aDescripcion}</span>
                  <div className="col-1"><img src={item.aFoto} alt="" /></div>
                  <button className="btn btn-danger btn-sm float-end mx-2 col-1" onClick={() => eliminar(item.id)}>Eliminar</button>
                  <button className="btn btn-warning btn-sm float-end mx-2 col-1" onClick={() => editar(item)}>Editar</button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Formulario;