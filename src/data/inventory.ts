export interface Product {
  product: string;
  category: string;
  type: string;
  tech_spec: string;
  price?: number;
  image?: string;
  brand?: string;
}

export const inventory = {
  inventory_master_list: {
    detailing_chemicals: {
      Vonixx: [
        {
          product: "Blend Carnaúba Silica Paste Wax",
          category: "Protección Híbrida",
          type: "Venta al Cliente",
          tech_spec: "Fusión de Carnaúba Tipo 1 y SiO2 para brillo orgánico y resistencia cerámica."
        },
        {
          product: "V-Floc",
          category: "Lavado",
          type: "Venta al Cliente",
          tech_spec: "Champú neutro con agentes acondicionadores y alta lubricidad."
        },
        {
          product: "Restaurax",
          category: "Plásticos",
          type: "Venta al Cliente",
          tech_spec: "Restaurador de polímeros plásticos con protección UV."
        },
        {
          product: "Native Brazilian Carnaúba Wax",
          category: "Ceras Naturales",
          type: "Venta al Cliente",
          tech_spec: "Cera de concurso 100% pura Carnaúba para máxima profundidad."
        }
      ],
      Gyeon: [
        {
          product: "Q2M Bathe+",
          category: "Lavado",
          type: "Venta al Cliente",
          tech_spec: "Champú con infusión de SiO2 para hidrofobia instantánea."
        },
        {
          product: "Q2M WetCoat",
          category: "Selladores",
          type: "Venta al Cliente",
          tech_spec: "Sellador en spray activado por agua, base cuarzo."
        },
        {
          product: "Q2M Iron",
          category: "Descontaminación",
          type: "Venta al Cliente",
          tech_spec: "Reactivo químico pH neutro para disolver partículas férricas."
        },
        {
          product: "Q2 Mohs EVO",
          category: "Recubrimientos Cerámicos",
          type: "Venta al Cliente / Pro",
          tech_spec: "Coating de fluoropolisilazano modificado, estructura de nanolaminado."
        }
      ],
      Mothers: [
        {
          product: "Mag & Aluminum Polish",
          category: "Metales",
          type: "Venta al Cliente",
          tech_spec: "Pasta abrasiva avanzada para restauración de metales sin recubrimiento."
        },
        {
          product: "California Gold Clay Bar System",
          category: "Descontaminación",
          type: "Venta al Cliente",
          tech_spec: "Sistema de arcilla sintética para eliminación de contaminantes adheridos."
        },
        {
          product: "CMX Ceramic Spray Coating",
          category: "Protección Cerámica",
          type: "Venta al Cliente",
          tech_spec: "Spray de mantenimiento con SiO2 y TiO2 accesible."
        }
      ],
      Sonax: [
        {
          product: "Profiline Perfect Finish",
          category: "Pulimentos",
          type: "Uso Profesional / Venta",
          tech_spec: "Abrasivos decrecientes de alta ingeniería para acabado libre de hologramas."
        },
        {
          product: "Xtreme Wheel Cleaner (Full Effect)",
          category: "Llantas",
          type: "Venta al Cliente",
          tech_spec: "Limpiador libre de ácidos con indicador de reacción química."
        },
        {
          product: "Polymer Net Shield (PNS)",
          category: "Selladores",
          type: "Venta al Cliente",
          tech_spec: "Sellador de polímeros híbridos con estructura de red inorgánica."
        }
      ],
      Nanolex: [
        {
          product: "Si3D",
          category: "Recubrimientos Cerámicos",
          type: "Uso Profesional",
          tech_spec: "Coating de matriz tridimensional de silicio para dureza y limpieza."
        },
        {
          product: "Reactivating Shampoo",
          category: "Lavado",
          type: "Venta al Cliente",
          tech_spec: "Champú diseñado para enlazar químicamente con capas cerámicas existentes."
        },
        {
          product: "EX",
          category: "Preparación",
          type: "Uso Profesional",
          tech_spec: "Limpiador de superficies basado en alcoholes y solventes especiales."
        }
      ],
      Meguiars: [
        {
          product: "Ultimate Compound",
          category: "Corrección",
          type: "Venta al Cliente",
          tech_spec: "Compuesto de microabrasivos seguros para capa transparente (Clear Coat)."
        },
        {
          product: "Hybrid Ceramic Wax",
          category: "Protección",
          type: "Venta al Cliente",
          "tech_spec": "Cera líquida con tecnología SiO2 híbrida de fácil aplicación."
        },
        {
          product: "M105 / M205 Mirror Glaze",
          category: "Sistema Profesional",
          type: "Uso Profesional",
          tech_spec: "Sistema SMAT (Super Micro Abrasive Technology) para corte y acabado."
        }
      ]
    },
    premium_protection_system: {
      Diamond_Protech: [
        {
          product: "Diamond Body 36",
          category: "Nanodiamantes (Body)",
          type: "Servicio Profesional Exclusivo",
          tech_spec: "Recubrimiento de nanodiamantes enriquecidos. 36 meses de duración. Resistente a la abrasión y flexible."
        },
        {
          product: "Diamond Body",
          category: "Nanodiamantes (Body)",
          type: "Servicio Profesional Exclusivo",
          tech_spec: "Capa protectora de nanodiamantes de 18 meses, oleofóbica e hidrofóbica."
        },
        {
          product: "Diamond Wheels",
          category: "Nanodiamantes (Alta Temp)",
          type: "Servicio Profesional Exclusivo",
          tech_spec: "Resistencia térmica hasta 1000°C para sistemas de frenado y llantas."
        },
        {
          product: "Diamond Quick Body",
          category: "Mantenimiento",
          type: "Venta al Cliente",
          tech_spec: "Spray de mantenimiento con nanodiamantes para extender la vida del coating."
        }
      ],
      "3M_Automotive": [
        {
          product: "Scotchgard™ Paint Protection Film Pro Series 4.0",
          category: "PPF (Brillo)",
          type: "Servicio Profesional",
          tech_spec: "TPU de 8 milésimas con capa top-coat autorregenerable y adhesivo PSA optimizado."
        },
        {
          product: "Scotchgard™ Pro Series Matte",
          category: "PPF (Mate)",
          type: "Servicio Profesional",
          tech_spec: "Protección física que transforma el acabado a mate satinado sin alterar el color base."
        },
        {
          product: "Crystalline Series",
          category: "Window Film",
          type: "Servicio Profesional",
          tech_spec: "Polarizado de nanotecnología multicapa óptica. Rechazo IR 97% sin metales."
        },
        {
          product: "Trizact™ Hookit™ Discs",
          category: "Abrasivos",
          type: "Insumo de Taller",
          tech_spec: "Abrasivos estructurados piramidales para matizado de pintura de alta precisión."
        }
      ]
    },
    paint_refinish_system: {
      Glasurit: [
        {
          product: "Serie 90 / Serie 100",
          category: "Pintura Base Agua",
          type: "Insumo de Taller",
          tech_spec: "Sistema Waterborne de alta eficiencia y precisión colorimétrica digital."
        },
        {
          product: "Ara Class (A-C-20)",
          category: "Barniz (Clear Coat)",
          type: "Insumo de Taller",
          tech_spec: "Barniz de ultra altos sólidos, resistente a arañazos (Anti-Scratch) y brillo espejo."
        },
        {
          product: "Imprimación Aparejo UV (Serie 151)",
          category: "Preparación",
          type: "Insumo de Taller",
          tech_spec: "Fondo de curado ultravioleta para reparaciones exprés sin merma."
        }
      ]
    }
  }
};
