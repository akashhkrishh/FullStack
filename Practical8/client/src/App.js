import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  ListGroup,
  ListGroupItem,
  Row,
  Table,
} from "reactstrap";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useEffect } from "react";


function App() {
  const [todos, setTodos] = useState([{}]);
  const url = 'http://localhost:5000'
  const [title,setTitle] = useState("")
  useEffect(()=>{
    getAllTodo()
  },[])

  const getAllTodo = async ()=>{
    fetch(url+'/todos').then(async (data)=>{
      setTodos(await data.json())
    })
  }


  const createTodo = async()=>{

    if(title==""){
      return;
    }
   const res = await fetch(url+"/todo",{
      method:"post",
      body:JSON.stringify({
        title:title,
        completed:false
      }),
      headers:{
        'content-type':"application/json"
      }
    });

    const data = await res.json()
    setTitle("")

    getAllTodo()


  }


  const deleteTodo = async (id)=>{
    const res = await fetch(url+"/todo/"+id+"/remove",{
      method:"get",
    
      headers:{
        'content-type':"application/json"
      }
    });

    const data = await res.json()
    setTitle("")

    getAllTodo()
  }

  const markDone = async (id)=>{
    const res = await fetch(url+"/todo/"+id+"/markdone",{
      method:"get",
    
      headers:{
        'content-type':"application/json"
      }
    });

    const data = await res.json()
    setTitle("")

    getAllTodo()
  }

  return (
    <Container className="py-3">
      <h2>Todo List</h2>

      <Card className="mt-4">
        <CardBody>
          <Row>
            <Col xs="10">
              <Input value={title} onChange={(e)=>{
                setTitle(e.target.value)
              }} >sd</Input>
            </Col>
            <Col xs="2">
              <Button onClick={()=>{
                createTodo()
              }}>Add</Button>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <ListGroup className="mt-4">
        {todos.map((todo,i) => (
          <ListGroupItem key={i}>
            <Row
              style={{
                alignItems: "center",
              }}
            >
              <Col sm="9">
                <p className="m-0" style={{
                  textDecoration: todo.completed?"line-through":""

                }}>{todo.title}</p>
              </Col>
              <Col
                sm="1"
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <Button onClick={()=>{
                  deleteTodo(i)
                }} size="sm" color="danger">
                  Remove
                </Button>
                <Button style={{
                  margin:"0px"
                }} onClick={()=>{
                  markDone(i)
                }} size="sm" color="success">
                  {todo.completed?<p style={{
                  margin:"0px"
                }}>Un Done</p>:<p style={{
                  margin:"0px"
                }}>Done</p>}
                </Button>
              </Col>
            </Row>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
}

export default App;
