'use client';

import React from 'react';
import { Property } from '../types';

// Icons
const MapPin = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const Bed = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"></path></svg>;
const Bath = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-3 0V4a2 2 0 0 0 2 2h.5"></path><path d="M14 6h.5a2 2 0 0 1 2 2v10l-2-2h-3l-2 2V8a2 2 0 0 1 2-2h3zM6 10h.01M22 20H2"></path></svg>;
const Square = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2"></rect></svg>;

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
          <span className="mr-1"><MapPin /></span>
          {property.address}
        </div>
        <div className="flex items-center justify-between text-gray-600 text-sm border-t border-gray-100 pt-3">
          <div className="flex items-center gap-1">
            <Bed />
            <span>{property.beds} Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath />
            <span>{property.baths} Baths</span>
          </div>
          <div className="flex items-center gap-1">
            <Square />
            <span>{property.sqft} sqft</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;