import { BehaviorSubject } from 'rxjs';

const currentUser$ = new BehaviorSubject(
  JSON.parse(localStorage.getItem('user')) || null
);

export function loginUser(user) {
  currentUser$.next(user);
  localStorage.setItem('user', JSON.stringify(user));
}

export function logoutUser() {
  currentUser$.next(null);
  localStorage.removeItem('user');
}

export function getCurrentUser() {
  return currentUser$.getValue();
}

export function getUserObservable() {
  return currentUser$.asObservable();
}

export function isAdmin() {
  return getCurrentUser()?.role === 'admin';
}

export function isUser() {
  return getCurrentUser()?.role === 'utilisateur';
}
