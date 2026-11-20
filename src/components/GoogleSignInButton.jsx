import { useEffect, useRef } from 'react';
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const SCRIPT_SRC = 'https://accounts.google.com/gsi/client';
function decodeCredential(token) {
  const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
  const json = decodeURIComponent(atob(base64).split('').map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0')).join(''));
  return JSON.parse(json);
}
export default function GoogleSignInButton({
  onSuccess,
  onError
}) {
  const containerRef = useRef(null);
  const callbacks = useRef({
    onSuccess,
    onError
  });
  callbacks.current = {
    onSuccess,
    onError
  };
  useEffect(() => {
    if (!CLIENT_ID) return undefined;
    const init = () => {
      if (!window.google?.accounts?.id || !containerRef.current) return;
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: response => {
          try {
            const profile = decodeCredential(response.credential);
            if (!profile.email || !profile.email_verified) {
              callbacks.current.onError?.('Your Google email must be verified to sign in.');
              return;
            }
            callbacks.current.onSuccess({
              name: profile.name || profile.email.split('@')[0],
              email: profile.email,
              sub: profile.sub
            });
          } catch {
            callbacks.current.onError?.('Google sign-in failed. Please try again.');
          }
        }
      });
      window.google.accounts.id.renderButton(containerRef.current, {
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'pill',
        width: 340
      });
    };
    if (window.google?.accounts?.id) {
      init();
      return undefined;
    }
    let script = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = SCRIPT_SRC;
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener('load', init);
    return () => script.removeEventListener('load', init);
  }, []);
  if (!CLIENT_ID) {
    return <button type="button" className="auth-google-off" onClick={() => callbacks.current.onError?.('Google sign-in is not set up yet. Add REACT_APP_GOOGLE_CLIENT_ID to the .env file and restart.')}>
        Continue with Google
      </button>;
  }
  return <div className="auth-google" ref={containerRef} />;
}
