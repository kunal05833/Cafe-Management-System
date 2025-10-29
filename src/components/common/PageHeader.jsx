import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const PageHeader = ({ title, subtitle, children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("mb-8", className)}
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
      {subtitle && (
        <p className="text-muted-foreground text-lg">{subtitle}</p>
      )}
      {children && <div className="mt-4">{children}</div>}
    </motion.div>
  );
};

export default PageHeader;