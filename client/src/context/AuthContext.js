import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut
} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        // Fetch user data from your backend
        fetch(`http://localhost:5000/api/users/${firebaseUser.uid}`)
          .then(res => res.json())
          .then(data => {
            setUser(data);
            setLoading(false);
          })
          .catch(err => {
            console.error('Error fetching user data:', err);
            setLoading(false);
          });
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const signup = async (email, password, name, role, additionalInfo) => {
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, role, ...additionalInfo }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 409) {
          throw new Error('User already exists with this email');
        }
        throw new Error(data.message || 'Failed to create account');
      }
      setUser(data.user);
      localStorage.setItem('token', data.token);
      return data.user;
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message);
      throw error;
    }
  };

  const login = async (email, password) => {
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to login');
      setUser(data.user);
      localStorage.setItem('token', data.token);
      return data.user;
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
      throw error;
    }
  };

  const checkUserExists = async (email) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/check-exists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Error checking user existence:', error);
      throw error;
    }
  };  

  const googleAuth = async () => {
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { user: firebaseUser } = result;
      
      // Check if user already exists
      const userExists = await checkUserExists(firebaseUser.email);
      
      if (userExists) {
        // User already exists, proceed with login
        const response = await fetch('http://localhost:5000/api/users/google-auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            email: firebaseUser.email, 
            googleId: firebaseUser.uid,
          }),
        });
        
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.message || 'Failed to login with Google');
        
        setUser(data.user);
        localStorage.setItem('token', data.token);
        return { userExists: true, user: data.user };
      } else {
        // New user, proceed with signup
        const response = await fetch('http://localhost:5000/api/users/google-auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            email: firebaseUser.email, 
            name: firebaseUser.displayName, 
            googleId: firebaseUser.uid,
            photoURL: firebaseUser.photoURL,
          }),
        });
        
        const data = await response.json();
        
        if (response.status === 202) {
          // User needs to complete profile
          return { needsProfileCompletion: true, partialUser: data.partialUser };
        }
        
        if (!response.ok) throw new Error(data.message || 'Failed to authenticate with Google');
        
        setUser(data.user);
        localStorage.setItem('token', data.token);
        return { userExists: false, user: data.user };
      }
    } catch (error) {
      console.error('Google auth error:', error);
      setError(error.message);
      throw error;
    }
  };

  const completeGoogleSignup = async (userData) => {
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/users/complete-google-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to complete Google signup');
      setUser(data.user);
      localStorage.setItem('token', data.token);
      return data.user;
    } catch (error) {
      console.error('Complete Google signup error:', error);
      setError(error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Logout error:', error);
      setError(error.message);
      throw error;
    }
  };

  const value = {
    user,
    signup,
    login,
    googleAuth,
    completeGoogleSignup,
    logout,
    loading,
    error,
    checkUserExists,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

