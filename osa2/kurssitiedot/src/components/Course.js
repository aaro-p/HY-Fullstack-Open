const Course = ({ course }) => {
    const { name, parts } = course;
    return (
        <div>
            <Header name={name} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    );
};

const Header = ({ name }) => {
    return <h1>{name}</h1>;
};

const Content = ({ parts }) => {
    return (
        <>
            {parts.map((part, index) => (
                <div key={index}>
                    <Part name={part.name} exercises={part.exercises} />
                </div>
            ))}
        </>
    );
};

const Part = ({ name, exercises }) => {
    return (
        <p>
            {name} {exercises}
        </p>
    );
};

const Total = ({ parts }) => {
    const total = parts.reduce((a, { exercises }) => a + exercises, 0);
    return (
        <p>
            <b>{`total of ${total} exercises`}</b>
        </p>
    );
};

export default Course;
