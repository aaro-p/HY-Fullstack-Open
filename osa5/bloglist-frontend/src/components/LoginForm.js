import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit, handleUserNameChange, handlePasswordChange,username, password }) => {
  return (
    <>
      <form onSubmit={handleSubmit} className='loginform'>
        <h2>Login</h2>
        <div>
            username
          <input
            id="username"
            value={username}
            onChange={handleUserNameChange}
          />
        </div>
        <div>
            password
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUserNameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm