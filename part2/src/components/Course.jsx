const Header = ({ content }) => {
  return <h1>{content}</h1>
}

const Content = ({ content }) => {
  const total = content.reduce((sum, part) => sum + part.exercises, 0)
  return(
    <>
      {content.map(part =>
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      )}
      <p><strong>total of {total} exercises</strong></p>
    </>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header content={course.name} />
      <Content content={course.parts} />
      
    </>
  )
}

export default Course