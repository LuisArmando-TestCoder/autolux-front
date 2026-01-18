import React from 'react';
import styles from './Services.module.scss';
import SectionTitle from '../../atoms/SectionTitle';
import ServiceCard from '../../molecules/ServiceCard';
import { FaCar, FaPaintRoller, FaShieldAlt, FaSprayCan, FaTools, FaGem } from 'react-icons/fa';

const servicesData = [
  {
    title: 'Enderezado y Pintura',
    description: 'Reparación experta de carrocería y acabado de color preciso para devolver la línea original a tu auto.',
    icon: <FaCar />
  },
  {
    title: 'Recubrimientos Cerámicos',
    description: 'Centro autorizado Diamond ProTech e Icon Rocklear. Protección avanzada de larga duración.',
    icon: <FaShieldAlt />
  },
  {
    title: 'Pulido Profesional',
    description: 'Corrección de pintura y restauración del brillo (Paint Correction) eliminando imperfecciones.',
    icon: <FaGem />
  },
  {
    title: 'Detallado Automotriz',
    description: 'Limpieza y restauración minuciosa de cada detalle, interior y exterior.',
    icon: <FaSprayCan />
  },
  {
    title: 'Limpieza de Interiores',
    description: 'Higienización completa de tapicería, tablero y componentes internos.',
    icon: <FaTools />
  },
  {
    title: 'Restauración de Faros',
    description: 'Devolvemos la transparencia y luminosidad a tus faros para mayor seguridad.',
    icon: <FaPaintRoller />
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className={styles.section}>
      <div className="container">
        <SectionTitle 
          title="Nuestros Servicios" 
          subtitle="Soluciones integrales de estética y protección vehicular con estándares internacionales." 
        />
        <div className={styles.grid}>
          {servicesData.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
