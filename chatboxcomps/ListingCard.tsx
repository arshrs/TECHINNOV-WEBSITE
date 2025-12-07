import React from 'react';
import { Property } from '../types';
import { Bed, Bath, Square, MapPin } from 'lucide-react';

interface ListingCardProps {
  property: Property;
}

const ListingCard: React.FC<ListingCardProps> = ({ property }) => {
  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-900 shadow-sm">
          {property.price}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-sky-500 transition-colors">{property.title}</h3>
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin size={14} className="mr-1" />
          {property.address}
        </div>
        <div className="flex items-center justify-between text-gray-600 text-sm border-t border-gray-100 pt-3">
          <div className="flex items-center gap-1">
            <Bed size={16} />
            <span>{property.beds} Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={16} />
            <span>{property.baths} Baths</span>
          </div>
          <div className="flex items-center gap-1">
            <Square size={16} />
            <span>{property.sqft} sqft</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;