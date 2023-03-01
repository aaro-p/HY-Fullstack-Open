const Persons = ({ searchWord, persons, filteredPersons, onClick }) => {
    return (
        <>
            {!searchWord
                ? persons.map((person, index) => (
                      <div key={index}>
                          {person.name} {person.number}
                          <button onClick={() => onClick(person)}>
                              Delete
                          </button>
                      </div>
                  ))
                : filteredPersons.map((person, index) => (
                      <div key={index}>
                          {person.name} {person.number}
                          <button onClick={() => onClick(person)}>
                              Delete
                          </button>
                      </div>
                  ))}
        </>
    );
};

export default Persons;
