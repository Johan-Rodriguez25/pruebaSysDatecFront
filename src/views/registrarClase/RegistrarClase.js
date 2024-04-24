import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";

export default function RegistrarClase() {
  const [estudianteId, setEstudianteId] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/api/registroClases`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        estudiante_id: estudianteId,
        clase_id: history.location.state.clase_id,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al registrar la clase");
        }

        console.log("Registro exitoso:", res.data);
        history.push("/");
      })
      .catch((error) => {
        console.error("Error al registrar la clase", error);
      });
  };

  const handleChange = (e) => {
    setEstudianteId(e.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formRegistrarClase">
        <Form.Label>Id del estudiante</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese el id del estudiante"
          value={estudianteId}
          onChange={handleChange}
        />
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
