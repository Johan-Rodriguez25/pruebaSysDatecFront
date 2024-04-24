import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function RegistrosClase() {
  const [registroClases, setRegistroClases] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/registroClases`)
      .then((response) => response.json())
      .then((data) => {
        // Obtener el nombre de la clase y del estudiante por su id
        const promises = data.map((registro) =>
          Promise.all([
            fetch(
              `${process.env.REACT_APP_API_URL}/api/clases/${registro.clase_id}`
            ).then((response) => response.json()),
            fetch(
              `${process.env.REACT_APP_API_URL}/api/estudiantes/${registro.estudiante_id}`
            ).then((response) => response.json()),
          ])
        );

        Promise.all(promises).then((results) => {
          const registrosActualizados = data.map((registro, index) => ({
            ...registro,
            nombre_clase: results[index][0].nombre_clase,
            nombre_estudiante: results[index][1].nombre,
          }));
          setRegistroClases(registrosActualizados);
        });
      })
      .catch((error) => {
        console.error("Error al obtener los registros de las clases:", error);
      });
  }, []);

  const deleteRegistroClase = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/registroClases/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al eliminar el registro de clase");
        }
        // Actualizar el estado para reflejar los cambios después de la eliminación
        setRegistroClases((prevRegistros) =>
          prevRegistros.filter((registro) => registro.registro_id !== id)
        );
      })
      .catch((error) => {
        console.error("Error al eliminar el registro de clase:", error);
      });
  };

  return (
    <Row xs={1} className="g-4">
      {registroClases.map((registro) => (
        <Col key={registro.registro_id}>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{registro.nombre_estudiante}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {registro.nombre_clase}
              </Card.Subtitle>
              <Link
                to={{
                  pathname: `/editarRegistrosClase/${registro.registro_id}`,
                  state: {
                    registro_id: registro.registro_id,
                  },
                }}
              >
                <Button variant="warning">Modificar Registro</Button>
              </Link>
              <Button
                variant="danger"
                onClick={() => deleteRegistroClase(registro.registro_id)}
              >
                Eliminar Registro
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
