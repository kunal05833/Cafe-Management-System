import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-primary-100 dark:from-background dark:via-primary-950 dark:to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-20 left-20 w-20 h-20 bg-primary-200 rounded-full opacity-20 blur-xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [360, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-20 right-20 w-32 h-32 bg-primary-300 rounded-full opacity-20 blur-2xl"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-8"
          >
            <Star className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Rated #1 Café in the City</span>
          </motion.div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Welcome to
            </span>
            <br />
            <span className="text-foreground">Café Delight</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the perfect blend of taste and technology. 
            Order your favorite coffee with just a few taps!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu">
              <Button size="lg" variant="gradient" className="group">
                <Coffee className="w-5 h-5 mr-2" />
                Order Now
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { label: 'Happy Customers', value: '10K+' },
              { label: 'Coffee Varieties', value: '50+' },
              { label: 'Years of Service', value: '15+' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Animated Coffee Cup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 relative"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-primary/20 blur-3xl animate-pulse" />
            <Coffee className="w-32 h-32 text-primary relative z-10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;