import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useHistory, useLocation } from "react-router-dom";

export default function EditarRegistrosClase() {
  const [estudianteId, setEstudianteId] = useState("");
  const [claseId, setClaseId] = useState("");
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const registroId = location.state.registro_id;

    console.log(registroId);

    fetch(`${process.env.REACT_APP_API_URL}/api/registroClases/${registroId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        estudiante_id: estudianteId,
        clase_id: claseId,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al actualizar el registro");
        }

        console.log("Registro actualizado exitosamente:", res.data);
        history.push("/"); // Redirigimos a la página principal después de actualizar
      })
      .catch((error) => {
        console.error("Error al actualizar el registro", error);
      });
  };

  const handleEstudianteChange = (e) => {
    setEstudianteId(e.target.value);
  };

  const handleClaseChange = (e) => {
    setClaseId(e.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formEditarRegistroClase">
        <Form.Label>Id del estudiante</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese el id del estudiante"
          value={estudianteId}
          onChange={handleEstudianteChange}
        />
        <Form.Label>Id de la clase</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese el id de la clase"
          value={claseId}
          onChange={handleClaseChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
