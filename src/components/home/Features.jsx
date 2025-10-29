import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Clock, CreditCard, Truck, Shield, Award } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Coffee,
      title: "Premium Coffee",
      description: "Carefully selected beans from the world's best coffee regions",
      color: "text-amber-600"
    },
    {
      icon: Clock,
      title: "Quick Service",
      description: "Order online and get your coffee ready in minutes",
      color: "text-blue-600"
    },
    {
      icon: CreditCard,
      title: "Udhari System",
      description: "Convenient credit system for our regular customers",
      color: "text-green-600"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Get your favorite coffee delivered to your doorstep",
      color: "text-purple-600"
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Your data and payments are always protected",
      color: "text-red-600"
    },
    {
      icon: Award,
      title: "Best Quality",
      description: "Award-winning coffee and exceptional service",
      color: "text-indigo-600"
    }
  ];

  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Café Delight?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We combine traditional coffee making with modern technology to give you the best experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 ${feature.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;