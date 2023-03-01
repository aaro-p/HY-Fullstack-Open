const Results = ({ data, onClick }) => {
    console.log(data);
    return data.map((country, index) => (
        <div key={index}>
            {country.name.common}
            <button value={country.name.common} onClick={onClick}>
                show
            </button>
        </div>
    ));
};

export default Results;
