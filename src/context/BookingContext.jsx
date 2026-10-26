/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_MOCK_BOOKINGS } from '../data/travelData';

const BookingContext = createContext();

const STORAGE_KEYS = {
  BOOKINGS: 'travelease_bookings_inr',
  WISHLIST: 'travelease_wishlist',
  USER: 'travelease_user',
  REGISTERED_USERS: 'travelease_registered_users',
};

let toastCounter = 0;
const getNextToastId = () => `toast_${++toastCounter}`;

export const BookingProvider = ({ children }) => {
  // Load initial bookings from localStorage or fallback to mock
  const [bookings, setBookings] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      if (stored) {
        return JSON.parse(stored);
      }
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(INITIAL_MOCK_BOOKINGS));
      return INITIAL_MOCK_BOOKINGS;
    } catch {
      return INITIAL_MOCK_BOOKINGS;
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return stored ? JSON.parse(stored) : ['pkg-bali-paradise', 'pkg-swiss-glacier'];
    } catch {
      return ['pkg-bali-paradise'];
    }
  });

  // User Authentication state
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Registered Users Directory (strictly checks email and password on sign in)
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
      if (stored) {
        return JSON.parse(stored);
      }
      const initialUsers = [
        {
          name: 'Priya Sharma',
          email: 'priya@gmail.com',
          phone: '9876543210',
          password: 'password123',
        }
      ];
      localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(initialUsers));
      return initialUsers;
    } catch {
      return [];
    }
  });

  // Sync registered users to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(registeredUsers));
    } catch (e) {
      console.error('Failed syncing registered users to localStorage:', e);
    }
  }, [registeredUsers]);

  // Auth Modal state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('signin'); // 'signin' or 'register'

  // Global Toasts system
  const [toasts, setToasts] = useState([]);

  // Sync bookings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    } catch (e) {
      console.error('Failed writing bookings to localStorage:', e);
    }
  }, [bookings]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed writing wishlist to localStorage:', e);
    }
  }, [wishlist]);

  // Sync user to localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch (e) {
      console.error('Failed syncing user to localStorage:', e);
    }
  }, [user]);

  // Format price strictly in Indian Rupee (₹)
  const formatPrice = (amount) => {
    if (typeof amount !== 'number') amount = Number(amount) || 0;
    return `₹${Math.round(amount).toLocaleString('en-IN')}`;
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Toast functions - strictly ONE popup message at any given time
  const addToast = (message, type = 'success') => {
    const id = getNextToastId();
    setToasts([{ id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  // Add new booking
  const addBooking = (bookingData) => {
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const newBooking = {
      ...bookingData,
      id: `TE-${new Date().getFullYear()}-${randomCode}`,
      bookedAt: new Date().toISOString(),
      status: 'Confirmed'
    };

    setBookings((prev) => [newBooking, ...prev]);
    addToast(`Trip to ${newBooking.destination} booked successfully! Reference: ${newBooking.id}`, 'success');
    return newBooking;
  };

  // Cancel booking
  const cancelBooking = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' } : b))
    );
    addToast(`Booking ${bookingId} has been cancelled.`, 'warning');
  };

  // Delete booking permanently
  const deleteBooking = (bookingId) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    addToast(`Booking ${bookingId} removed from history.`, 'info');
  };

  // Reset bookings
  const resetBookingsToDefault = () => {
    setBookings(INITIAL_MOCK_BOOKINGS);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(INITIAL_MOCK_BOOKINGS));
    addToast('Bookings reset to sample mock data.', 'info');
  };

  // Wishlist toggle
  const toggleWishlist = (packageId) => {
    setWishlist((prev) => {
      const exists = prev.includes(packageId);
      if (exists) {
        addToast('Removed from your wishlist', 'info');
        return prev.filter((id) => id !== packageId);
      } else {
        addToast('Added to your wishlist!', 'success');
        return [...prev, packageId];
      }
    });
  };

  // Authentication handlers
  const loginWithCredentials = (email, password, rememberMe = true) => {
    const trimmedEmail = email.trim().toLowerCase();
    const foundUser = registeredUsers.find((u) => u.email.toLowerCase() === trimmedEmail);

    if (!foundUser) {
      return {
        success: false,
        message: 'No registered account found with this email. Please register first.'
      };
    }

    if (foundUser.password !== password) {
      return {
        success: false,
        message: 'Incorrect password. Please enter the password you registered with.'
      };
    }

    setUser({
      name: foundUser.name,
      email: foundUser.email,
      phone: foundUser.phone,
      rememberMe,
    });
    setIsAuthModalOpen(false);
    addToast(`Welcome back, ${foundUser.name}!`, 'success');
    return { success: true };
  };

  const loginUser = (userData) => {
    setUser(userData);
    setIsAuthModalOpen(false);
    addToast(`Welcome back, ${userData.name || 'Traveler'}!`, 'success');
  };

  const registerUser = (userData) => {
    const trimmedEmail = userData.email.trim().toLowerCase();
    const existing = registeredUsers.find((u) => u.email.toLowerCase() === trimmedEmail);

    if (existing) {
      return {
        success: false,
        message: 'An account with this email is already registered. Please sign in.'
      };
    }

    const newUser = {
      name: userData.name.trim(),
      email: trimmedEmail,
      phone: userData.phone.trim(),
      password: userData.password,
    };

    setRegisteredUsers((prev) => [...prev, newUser]);
    setUser({
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
    });
    setIsAuthModalOpen(false);
    addToast(`Account created successfully! Welcome to TravelEase, ${newUser.name}!`, 'success');
    return { success: true };
  };

  const logoutUser = () => {
    setUser(null);
    addToast('You have been signed out.', 'info');
  };

  const openAuthModal = (tab = 'signin') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const isWishlisted = (packageId) => wishlist.includes(packageId);

  return (
    <BookingContext.Provider
      value={{
        bookings,
        wishlist,
        user,
        isAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        openAuthModal,
        closeAuthModal,
        loginUser,
        loginWithCredentials,
        registerUser,
        registeredUsers,
        logoutUser,
        formatPrice,
        addBooking,
        cancelBooking,
        deleteBooking,
        resetBookingsToDefault,
        toggleWishlist,
        isWishlisted,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
