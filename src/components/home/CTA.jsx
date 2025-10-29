import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience the Best Coffee?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of coffee lovers who have made Café Delight their daily choice
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu">
              <Button size="lg" variant="secondary" className="group">
                Order Now
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Download className="w-4 h-4 mr-2" />
              Download App
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold mb-1">24/7</div>
              <div className="opacity-90">Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">30min</div>
              <div className="opacity-90">Delivery</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">100%</div>
              <div className="opacity-90">Satisfaction</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;