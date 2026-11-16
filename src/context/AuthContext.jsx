import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USERS } from '../data/seedData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('farmbridge_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored users', e);
      }
    }
    return INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('farmbridge_current_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error('Error parsing stored current user', e);
      }
    }
    // Default to farmer Rahim Uddin
    return INITIAL_USERS[0];
  });

  useEffect(() => {
    localStorage.setItem('farmbridge_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('farmbridge_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Switch by role (picks first user of that role)
  const switchRole = (role) => {
    const target = users.find(u => u.role === role);
    if (target) {
      setCurrentUser(target);
    }
  };

  // Switch by specific user ID
  const switchUser = (userId) => {
    const target = users.find(u => u.id === userId);
    if (target) {
      setCurrentUser(target);
    }
  };

  const login = (email, password) => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      return { success: true, user: found };
    }
    return { success: false, error: 'User not found with this email. Try selecting a demo profile.' };
  };

  const signup = ({ name, email, phone, role, district, farmOrBusinessName }) => {
    const newUser = {
      id: `user_${role}_${Date.now()}`,
      name,
      email,
      phone,
      role,
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
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const updateProfile = (updates) => {
    setCurrentUser(prev => {
      const updated = {
        ...prev,
        ...updates,
        profile: {
          ...prev.profile,
          ...(updates.profile || {})
        }
      };
      setUsers(all => all.map(u => u.id === updated.id ? updated : u));
      return updated;
    });
  };

  const logout = () => {
    // For demo simplicity, reset back to farmer Rahim or null
    setCurrentUser(users[0]);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      users,
      switchRole,
      switchUser,
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
