import React, { useEffect, useState } from 'react';
import styles from './Services.module.scss';
import SectionTitle from '../../atoms/SectionTitle';
import ServiceCard from '../../molecules/ServiceCard';
import * as FaIcons from 'react-icons/fa';

interface ServiceMetadata {
  service_title: string;
  description: string;
  icon: {
    key: string;
    value: string;
  };
}

interface ServiceObject {
  slug: string;
  title: string;
  type: string;
  metadata: ServiceMetadata;
}

interface ApiResponse {
  objects: ServiceObject[];
  total: number;
}

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const getIcon = (iconName: string): React.ReactNode => {
  if (!iconName) return <FaIcons.FaCar />;
  
  // Convert kebab-case to PascalCase (e.g. "spray-can" -> "SprayCan")
  const pascalName = iconName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  // Prepend 'Fa' to match react-icons/fa naming convention
  const faKey = `Fa${pascalName}` as keyof typeof FaIcons;
  
  // Return the icon if it exists in the library, otherwise fallback to FaCar
  const IconComponent = FaIcons[faKey];
  return IconComponent ? <IconComponent /> : <FaIcons.FaCar />;
};

const Services: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('https://api.cosmicjs.com/v3/buckets/autolux-production/objects?pretty=true&query=%7B%22type%22:%22services%22%7D&limit=10&skip=0&read_key=hXSHxMOEuwYH43zRWzbEniPSkb9u2Pltz1l8v2rdCK5UCu6cyp&depth=1&props=slug,title,metadata,type');
        const data: ApiResponse = await response.json();
        
        if (data.objects) {
          const mappedServices = data.objects.map((obj) => ({
            title: obj.metadata.service_title,
            description: obj.metadata.description,
            icon: getIcon(obj.metadata.icon.key),
          }));
          setServices(mappedServices);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <section id="services" className={styles.section}>
      <div className="container">
        <SectionTitle 
          title="Nuestros Servicios" 
          subtitle="Soluciones integrales de estética y protección vehicular con estándares internacionales." 
        />
        <div className={styles.grid}>
          {services.map((service, index) => (
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
