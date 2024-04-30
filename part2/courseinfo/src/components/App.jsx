import courses_data from "../courses_data.js";
import Course from "./Course.jsx";
const App = () => {
  return (
    <>
      {courses_data.map((course) => {
        return <Course key={course.id} course={course} />;
      })}
    </>
  );
};

export default App;
