const LoginForm = ({handleLogin,username,pass,handleUsernameChange,handlePasswordChange}) => (
    <form className="loginForm" data-testid="LoginForm" onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
        id="password"
          type="text"
          value={pass}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  export default LoginForm