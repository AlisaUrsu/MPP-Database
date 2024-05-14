import React, { useState } from 'react';

const LoginPage: React.FC = () => {
  //const history = useHistory();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<'user' | 'admin'>('user');

  const handleRoleSelection = (role: 'user' | 'admin') => {
    setSelectedRole(role);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you can add your logic for authenticationp
    // For now, just redirecting to another page based on role
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="role-buttons">
          <button
            className={selectedRole === 'user' ? 'selected' : ''}
            onClick={() => handleRoleSelection('user')}
          >
            User
          </button>
          <button
            className={selectedRole === 'admin' ? 'selected' : ''}
            onClick={() => handleRoleSelection('admin')}
          >
            Admin
          </button>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
