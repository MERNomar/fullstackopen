import { useState } from "react";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0].name} exercise={props.parts[0].exercise} />
      <Part part={props.parts[1].name} exercise={props.parts[1].exercise} />
      <Part part={props.parts[2].name} exercise={props.parts[2].exercise} />
    </>
  );
};

const Total = (props) => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {props.parts[0].exercises +
          props.parts[1].exercises +
          props.parts[2].exercises}
      </p>
    </>
  );
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercise}
      </p>
    </>
  );
};

const Test = () => {
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0,
    middle: 0,
  });

  const { left, right } = clicks;
  console.log(clicks);
  const handleClicks = (direction) => {
    const newClicks = { ...clicks, [direction]: clicks[direction] + 1 };
    setClicks(newClicks);
  };

  return (
    <div>
      {left}
      <button onClick={() => handleClicks("left")}>left</button>
      <button onClick={() => handleClicks("right")}>right</button>
      {right}
    </div>
  );
};

export default Test;
