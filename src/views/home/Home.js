import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [clases, setClases] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/clases`)
      .then((response) => response.json())
      .then((data) => {
        // Para cada clase, obtener el nombre del profesor
        Promise.all(
          data.map((clase) =>
            fetch(
              `${process.env.REACT_APP_API_URL}/api/profesores/${clase.profesor_id}`
            )
              .then((response) => response.json())
              .then((profesorData) => ({
                ...clase,
                profesor_nombre: profesorData.nombre_profesor,
              }))
          )
        )
          .then((clasesWithProfessors) => {
            setClases(clasesWithProfessors);
          })
          .catch((error) => {
            console.error("Error al obtener las clases:", error);
          });
      })
      .catch((error) => {
        console.error("Error al obtener las clases:", error);
      });
  }, []);

  const deleteClase = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/registroClases/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al eliminar la clase");
        }

        setClases((prevClases) =>
          prevClases.filter((clase) => clase.clase_id !== id)
        );
      })
      .catch((error) => {
        console.error("Error al eliminar la clase:", error);
      });
  };

  return (
    <Row xs={1} className="g-4">
      {clases.map((clase) => (
        <Col key={clase.clase_id}>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{clase.nombre_clase}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {clase.profesor_nombre}
              </Card.Subtitle>
              <Link
                to={{
                  pathname: `/registrarClase/${clase.clase_id}`,
                  state: { clase_id: clase.clase_id },
                }}
              >
                <Button variant="primary">Registrar Clase</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
