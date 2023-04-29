import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const Filter = () => {

    const dispatch = useDispatch()

    const handleChange = (e) => {
        e.preventDefault()
        const filter = e.target.value
        dispatch(filterChange(filter))
    }

    return (
        <div style={{marginBottom: 10}}>
            filter <input onChange={handleChange} name="filter"/>
        </div>
    )
}

export default Filter