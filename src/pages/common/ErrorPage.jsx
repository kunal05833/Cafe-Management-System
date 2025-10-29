import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <AlertTriangle className="w-24 h-24 text-destructive mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong</h1>
        <p className="text-muted-foreground mb-4">
          {error?.statusText || error?.message || 'An unexpected error occurred'}
        </p>
        <div className="space-y-4">
          <Button
            variant="gradient"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
          <Link to="/">
            <Button variant="outline">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;