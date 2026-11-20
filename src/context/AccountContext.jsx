import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { hashPassword, verifyPassword } from '../services/passwords';
const AccountContext = createContext(null);
const SESSION_KEY = 'manna-delight-session';
const ACCOUNTS_KEY = 'manna-delight-accounts';
function load(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}
const emailKey = email => email.trim().toLowerCase();
const publicUser = account => ({
  name: account.name,
  email: account.email,
  provider: account.provider
});
export function AccountProvider({
  children
}) {
  const [user, setUser] = useState(() => load(SESSION_KEY, null));
  const [accounts, setAccounts] = useState(() => load(ACCOUNTS_KEY, []));
  useEffect(() => {
    try {
      if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));else localStorage.removeItem(SESSION_KEY);
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    } catch {}
  }, [user, accounts]);
  const register = useCallback(async (name, email, password) => {
    const key = emailKey(email);
    if (accounts.some(a => emailKey(a.email) === key)) {
      return {
        ok: false,
        error: 'An account with this email already exists. Please sign in instead.'
      };
    }
    const credentials = await hashPassword(password);
    const account = {
      name: name.trim(),
      email: email.trim(),
      provider: 'password',
      ...credentials
    };
    setAccounts([...accounts, account]);
    setUser(publicUser(account));
    return {
      ok: true
    };
  }, [accounts]);
  const login = useCallback(async (email, password) => {
    const fail = {
      ok: false,
      error: 'Email or password is incorrect.'
    };
    const account = accounts.find(a => a.provider === 'password' && emailKey(a.email) === emailKey(email));
    if (!account) return fail;
    const matches = await verifyPassword(password, account);
    if (!matches) return fail;
    setUser(publicUser(account));
    return {
      ok: true
    };
  }, [accounts]);
  const loginWithGoogle = useCallback(async ({
    name,
    email,
    sub
  }) => {
    const key = emailKey(email);
    const existing = accounts.find(a => emailKey(a.email) === key);
    if (existing) {
      setUser(publicUser(existing));
      return {
        ok: true
      };
    }
    const account = {
      name: name.trim(),
      email: email.trim(),
      provider: 'google',
      sub
    };
    setAccounts([...accounts, account]);
    setUser(publicUser(account));
    return {
      ok: true
    };
  }, [accounts]);
  const signOut = useCallback(() => setUser(null), []);
  const value = useMemo(() => ({
    user,
    register,
    login,
    loginWithGoogle,
    signOut
  }), [user, register, login, loginWithGoogle, signOut]);
  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}
export function useAccount() {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error('useAccount must be used inside AccountProvider');
  return ctx;
}
