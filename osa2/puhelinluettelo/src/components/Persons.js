const Persons = ({ searchWord, persons, filteredPersons }) => {
    return (
        <>
            {!searchWord
                ? persons.map((person, index) => (
                      <div key={index}>
                          {person.name} {person.number}
                      </div>
                  ))
                : filteredPersons.map((person, index) => (
                      <div key={index}>
                          {person.name} {person.number}
                      </div>
                  ))}
        </>
    );
};

export default Persons;
