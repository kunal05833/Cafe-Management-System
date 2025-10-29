import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, loginWithGoogle } from '../../features/auth/authSlice';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail, Lock, Eye, EyeOff, Coffee } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useSelector((s) => s.auth);

  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  if (isAuthenticated) return <Navigate to="/" replace />;

  const submit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(form)).unwrap();
      toast.success('Welcome back!');
      navigate('/', { replace: true });
    } catch (e) {
      toast.error(e.message || 'Login failed');
    }
  };

  const google = async () => {
    try {
      await dispatch(loginWithGoogle()).unwrap();
      navigate('/', { replace: true });
    } catch (e) {
      toast.error(e.message || 'Google login failed');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] grid place-items-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Coffee className="w-10 h-10 text-primary mx-auto" />
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="name@example.com" className="pl-10" required />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input type={show ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" className="pl-10 pr-10" required />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
            </div>
            <Button type="submit" variant="gradient" className="w-full" disabled={isLoading}>{isLoading ? 'Signing in…' : 'Sign In'}</Button>
          </form>
          <div className="mt-6">
            <Button variant="outline" className="w-full" onClick={google}>Continue with Google</Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6 text-center">Don&apos;t have an account? <Link to="/signup" className="text-primary font-medium">Sign up</Link></p>
        </CardContent>
      </Card>
    </div>
  );
};
export default Login;