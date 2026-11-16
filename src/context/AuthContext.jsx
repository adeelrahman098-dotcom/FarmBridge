import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USERS } from '../data/seedData';

const AuthContext = createContext();
const ALLOWED_ROLES = ['farmer', 'buyer', 'transport'];

const hashPassword = async (password, salt = crypto.getRandomValues(new Uint8Array(16))) => {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const hash = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 120000, hash: 'SHA-256' }, key, 256);
  return {
    salt: Array.from(salt, byte => byte.toString(16).padStart(2, '0')).join(''),
    hash: Array.from(new Uint8Array(hash), byte => byte.toString(16).padStart(2, '0')).join('')
  };
};

const readStoredUsers = () => {
  try {
    const saved = localStorage.getItem('farmbridge_users');
    const parsed = saved ? JSON.parse(saved) : null;
    return Array.isArray(parsed) ? parsed : INITIAL_USERS;
  } catch (error) {
    console.error('Error parsing stored users', error);
    return INITIAL_USERS;
  }
};

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(readStoredUsers);
  const [currentUserId, setCurrentUserId] = useState(() => localStorage.getItem('farmbridge_session_user_id'));
  const currentUser = users.find(user => user.id === currentUserId) || null;

  useEffect(() => {
    localStorage.setItem('farmbridge_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUserId && users.some(user => user.id === currentUserId)) {
      localStorage.setItem('farmbridge_session_user_id', currentUserId);
    } else {
      localStorage.removeItem('farmbridge_session_user_id');
    }
  }, [currentUserId, users]);

  const login = async (email, password) => {
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const found = users.find(user => user.email.toLowerCase() === normalizedEmail);
      if (!found?.passwordHash || !found.passwordSalt) {
        return { success: false, error: 'Invalid email or password.' };
      }

      const salt = new Uint8Array(found.passwordSalt.match(/.{2}/g).map(byte => parseInt(byte, 16)));
      const credentials = await hashPassword(password, salt);
      if (credentials.hash !== found.passwordHash) {
        return { success: false, error: 'Invalid email or password.' };
      }

      setCurrentUserId(found.id);
      return { success: true, user: found };
    } catch (error) {
      console.error('Unable to verify credentials', error);
      return { success: false, error: 'Unable to sign in right now. Please try again.' };
    }
  };

  const signup = async ({ name, email, phone, role, district, farmOrBusinessName, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!ALLOWED_ROLES.includes(role)) {
      return { success: false, error: 'Select a valid account role.' };
    }
    if (password.length < 8) {
      return { success: false, error: 'Password must be at least 8 characters.' };
    }
    if (users.some(user => user.email.toLowerCase() === normalizedEmail)) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    let credentials;
    try {
      credentials = await hashPassword(password);
    } catch (error) {
      console.error('Unable to secure account credentials', error);
      return { success: false, error: 'Unable to create an account right now. Please try again.' };
    }

    const newUser = {
      id: `user_${role}_${crypto.randomUUID()}`,
      name: name.trim(),
      email: normalizedEmail,
      phone,
      role,
      passwordSalt: credentials.salt,
      passwordHash: credentials.hash,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      verificationStatus: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      profile: {
        district,
        farmName: role === 'farmer' ? farmOrBusinessName : undefined,
        businessName: role === 'buyer' ? farmOrBusinessName : undefined,
        companyName: role === 'transport' ? farmOrBusinessName : undefined,
        rating: 5.0,
        address: `${district}, Bangladesh`
      }
    };

    setUsers(prev => [newUser, ...prev]);
    setCurrentUserId(newUser.id);
    return { success: true, user: newUser };
  };

  const updateProfile = (updates) => {
    if (!currentUser) return;
    const updated = {
      ...currentUser,
      ...updates,
      profile: {
        ...currentUser.profile,
        ...(updates.profile || {})
      }
    };
    setUsers(all => all.map(user => user.id === updated.id ? updated : user));
  };

  const logout = () => {
    setCurrentUserId(null);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      users,
      login,
      signup,
      updateProfile,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
