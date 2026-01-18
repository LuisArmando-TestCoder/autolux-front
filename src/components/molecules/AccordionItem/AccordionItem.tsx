'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import styles from './AccordionItem.module.scss';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={styles.item}>
      <button className={styles.trigger} onClick={onClick}>
        <span>{question}</span>
        <FaChevronDown className={`${styles.icon} ${isOpen ? styles['icon--open'] : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.content}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.inner}>{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccordionItem;
