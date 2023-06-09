import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useLazyQuery, gql } from '@apollo/client';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const FULL_QUERY = gql`
  query Full($message: String!) {
    hello(message: $message)
    alejandro(message: $message)
    mauricio(message: $message)
    nightwolf(message: $message)
    camilo(message: $message)
  }
`;


function Hello() {
  const [message, setMessage] = useState('');
  const [getGreeting, { loading, error, data }] = useLazyQuery(FULL_QUERY);

  // const alejandro = useLazyQuery(ALEJANDRO_QUERY);
  const handleSubmit = (e) => {
    e.preventDefault();
    getGreeting({ variables: { message } });
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formMessage">
          <Form.Control
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje"
          />
        </Form.Group>
        <Button className='mt-2' variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
      {data && <h2 className='mt-3'>{data.hello}</h2>}
      {data && <h2 className='mt-3'>{data.alejandro}</h2>}
      {data && <h2 className='mt-3'>{data.mauricio}</h2>}
      {data && <h2 className='mt-3'>{data.nightwolf}</h2>}
      {data && <h2 className='mt-3'>{data.camilo}</h2>}
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Container className="my-5">
        <Row>
          <Col xs={12} md={{ span: 6, offset: 3 }}>
            <h1>Aplicación Ejemplo SmartMarketPlace</h1>
            <Hello />
          </Col>
        </Row>
      </Container>
    </ApolloProvider>
  );
}

export default App;