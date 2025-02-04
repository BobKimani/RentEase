import React from 'react';
import { Building2 } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  isSelected: boolean;
  onClick: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-105 ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
    >
      <div className="relative h-48">
        <img
          src={property.imageUrl}
          alt={property.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-lg font-semibold">{property.name}</h3>
          <p className="text-sm opacity-90">{property.address}</p>
        </div>
      </div>
      <div className="p-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="flex items-center text-blue-800">
          <Building2 className="w-4 h-4 mr-2" />
          <span className="text-sm">{property.units} units</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;