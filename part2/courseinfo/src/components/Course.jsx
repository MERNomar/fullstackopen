const TotalExercises = ({ parts }) => {
  const sumOfExercises = parts.reduce((accumulator, currentValue) => {
    return (accumulator = accumulator + currentValue.exercises);
  }, 0);
  return (
    <>
      <div>
        <strong>Total of {sumOfExercises} exercises</strong>
      </div>
    </>
  );
};

const Part = ({ part }) => {
  return <li>{part.name + " " + part.exercises}</li>;
};

const Content = ({ parts }) => {
  return (
    <ul>
      {parts.map((part) => {
        return <Part key={part.id} part={part} />;
      })}
    </ul>
  );
};

const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <TotalExercises parts={course.parts} />
    </div>
  );
};

export default Course;
