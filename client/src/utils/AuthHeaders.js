const AuthHeaders = { 
	headers: { 
		Authorization: `Bearer ${localStorage.getItem('token')}` 
	} 
}

export default AuthHeaders