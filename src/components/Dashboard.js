import React, { useState, useEffect, useRef } from "react";
import Popup from "./Popup";
import Filter from "./Filter";
import { data } from "../json/data";
import { Button, Table, Container, Row, Col } from "reactstrap";

function Dashboard() {
  const [courses, setCourses] = useState([]);
  let setSorting = useState(true);
  const arrLength = data[0].lessons.length;

  const [elRefs, setElRefs] = useState([]);
  useEffect(() => {
    setCourses(data[0].lessons);
  }, [data]);

  useEffect(() => {
    setElRefs((elRefs) =>
      Array(arrLength)
        .fill()
        .map((_, i) => elRefs[i])
    );
  }, [arrLength]);

  const filterCallback = (name) => {
    console.log(name);
    if (name == "") {
      setCourses(data[0].lessons);
    } else {
      let newlist = courses.filter((val) => {
        if (
          val.author.toLowerCase().includes(name.toLowerCase()) ||
          val.name.toLowerCase().includes(name.toLowerCase()) ||
          val.description.toLowerCase().includes(name.toLowerCase())
        ) {
          return name;
        }
      });
      setCourses(newlist);
    }
  };

  const compareByAsc = (key) => {
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  };

  const compareByDesc = (key) => {
    return function (a, b) {
      if (a[key] < b[key]) return 1;
      if (a[key] > b[key]) return -1;
      return 0;
    };
  };
  const sorting = (key) => {
    let dataCopy = [...courses];
    const beforeSortCourses = JSON.stringify(dataCopy);
    dataCopy.sort(compareByAsc(key));
    const afterSortCourses = JSON.stringify(dataCopy);
    if (beforeSortCourses === afterSortCourses) {
      dataCopy.sort(compareByDesc(key));
    }
    setCourses(dataCopy);
  };
  return (
    <Container className="Dashboard">
      <Row>
        <Col md="6">
          <Filter filterCallback={filterCallback}></Filter>
        </Col>
        <Col md="12">
          <Table bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Author</th>
                <th>
                  <Button
                    onClick={() => {
                      sorting("publishDate");
                    }}
                  >
                    Publish Date
                  </Button>
                </th>
                <th>
                  <Button
                    onClick={() => {
                      sorting("duration");
                    }}
                  >
                    Duration
                  </Button>
                </th>
                <th>Image</th>
                <th>Show Button</th>
              </tr>
            </thead>

            <tbody>
              {courses.map((list, index) => {
                const {
                  id,
                  name,
                  description,
                  author,
                  publishDate,
                  duration,
                  image,
                  showButton,
                } = list; //destructuring
                return (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{description}</td>
                    <td>{author}</td>
                    <td>{publishDate}</td>
                    <td>{duration}</td>
                    <td className="list-image">
                      <img src={image}></img>
                    </td>
                    <td>
                    <Popup buttonLabel="Login" className ="login-popup" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
