// Declarative config for the smart booking system. Each service defines
// its own fields; the /quote page renders + validates them generically.

export type FieldType = 'text' | 'number' | 'date' | 'select' | 'segmented' | 'multiselect' | 'textarea'

export type Field = {
  name: string
  label: string
  type: FieldType
  options?: string[]
  placeholder?: string
  half?: boolean // render two-per-row on desktop
  default?: string | number
  required?: boolean
  showIf?: (v: Record<string, string>) => boolean
}

export type ServiceConfig = {
  key: string
  label: string
  tagline: string
  core?: boolean
  fields: Field[]
}

export const SERVICES: ServiceConfig[] = [
  {
    key: 'flights', label: 'Air Tickets', tagline: 'Domestic, regional & international flights', core: true,
    fields: [
      { name: 'clientType', label: 'Booking for', type: 'segmented', options: ['Individual', 'Corporate'], default: 'Individual' },
      { name: 'company', label: 'Company name', type: 'text', placeholder: 'Your company', showIf: v => v.clientType === 'Corporate' },
      { name: 'tripType', label: 'Trip type', type: 'segmented', options: ['Return', 'One-way', 'Multi-city'], default: 'Return' },
      { name: 'from', label: 'From', type: 'text', placeholder: 'e.g. Nairobi (NBO)', half: true, required: true },
      { name: 'to', label: 'To', type: 'text', placeholder: 'e.g. Dubai (DXB)', half: true, required: true },
      { name: 'departDate', label: 'Departure date', type: 'date', half: true, required: true },
      { name: 'returnDate', label: 'Return date', type: 'date', half: true, showIf: v => v.tripType === 'Return' },
      { name: 'adults', label: 'Adults', type: 'number', default: 1, half: true },
      { name: 'children', label: 'Children', type: 'number', default: 0, half: true },
      { name: 'infants', label: 'Infants', type: 'number', default: 0, half: true },
      { name: 'cabin', label: 'Cabin class', type: 'select', options: ['Economy', 'Premium Economy', 'Business', 'First'], default: 'Economy', half: true },
      { name: 'notes', label: 'Anything else?', type: 'textarea', placeholder: 'Preferred airline, flexible dates, baggage…' },
    ],
  },
  {
    key: 'car-hire', label: 'Car Hire', tagline: 'Corporate contracts & individual rentals', core: true,
    fields: [
      { name: 'hireType', label: 'Hire type', type: 'segmented', options: ['Corporate', 'Individual'], default: 'Corporate' },
      // Corporate path
      { name: 'corpVehicle', label: 'Vehicle class', type: 'select', options: ['Toyota Prado', 'Land Cruiser TX', 'Land Cruiser V8', 'Range Rover', 'Mercedes-Benz', 'Mixed fleet'], half: true, showIf: v => v.hireType !== 'Individual' },
      { name: 'vehicles', label: 'How many vehicles', type: 'number', default: 1, half: true, showIf: v => v.hireType !== 'Individual' },
      { name: 'contract', label: 'Contract length', type: 'select', options: ['3 days', '1 week', '2 weeks', '1 month', '3 months', '6 months', '1 year', '2 years', 'Custom'], half: true, showIf: v => v.hireType !== 'Individual' },
      { name: 'company', label: 'Company name', type: 'text', placeholder: 'Your company', half: true, showIf: v => v.hireType !== 'Individual' },
      // Individual path
      { name: 'indVehicle', label: 'Vehicle', type: 'select', options: ['Toyota Corolla (Saloon)', 'Toyota RAV4', 'Toyota Prado', 'Hiace Van (14-seat)', 'Coaster Bus (29-seat)'], half: true, showIf: v => v.hireType === 'Individual' },
      { name: 'days', label: 'Number of days', type: 'number', default: 3, half: true, showIf: v => v.hireType === 'Individual' },
      // Shared
      { name: 'driver', label: 'Driver', type: 'segmented', options: ['With driver', 'Self-drive'], default: 'With driver' },
      { name: 'startDate', label: 'Start date', type: 'date', half: true, required: true },
      { name: 'pickup', label: 'Pickup location', type: 'text', placeholder: 'e.g. JKIA / Westlands', half: true },
      { name: 'notes', label: 'Anything else?', type: 'textarea', placeholder: 'Specific model, mileage, terms…' },
    ],
  },
  {
    key: 'safari', label: 'Safari', tagline: 'Maasai Mara, Amboseli, Samburu & more', core: true,
    fields: [
      { name: 'destinations', label: 'Parks / destinations', type: 'multiselect', options: ['Maasai Mara', 'Amboseli', 'Samburu', 'Tsavo', 'Lake Nakuru', 'Not sure yet'] },
      { name: 'nights', label: 'Nights', type: 'number', default: 3, half: true, required: true },
      { name: 'tier', label: 'Accommodation', type: 'segmented', options: ['Budget', 'Mid-range', 'Luxury'], default: 'Mid-range' },
      { name: 'adults', label: 'Adults', type: 'number', default: 2, half: true },
      { name: 'children', label: 'Children', type: 'number', default: 0, half: true },
      { name: 'startDate', label: 'Travel date', type: 'date', half: true },
      { name: 'notes', label: 'Anything else?', type: 'textarea', placeholder: 'Honeymoon, specific lodge, dietary needs…' },
    ],
  },
  {
    key: 'international', label: 'International', tagline: 'Dubai, Istanbul, Maldives & beyond', core: true,
    fields: [
      { name: 'destination', label: 'Destination(s)', type: 'text', placeholder: 'e.g. Dubai, Istanbul', required: true },
      { name: 'packageType', label: 'Type', type: 'segmented', options: ['Full package', 'Custom'], default: 'Full package' },
      { name: 'startDate', label: 'Travel date', type: 'date', half: true },
      { name: 'nights', label: 'Nights', type: 'number', default: 4, half: true },
      { name: 'travellers', label: 'Travellers', type: 'number', default: 2, half: true },
      { name: 'includes', label: 'Include', type: 'multiselect', options: ['Flights', 'Hotel', 'Visa', 'Transfers', 'Tours'] },
      { name: 'notes', label: 'Anything else?', type: 'textarea', placeholder: 'Budget, occasion, must-sees…' },
    ],
  },
  {
    key: 'logistics', label: 'Logistics', tagline: 'Trailers, lorries & cargo across East Africa', core: true,
    fields: [
      { name: 'cargoType', label: 'What are you moving?', type: 'text', placeholder: 'e.g. building materials, containers', required: true },
      { name: 'truck', label: 'Truck type', type: 'select', options: ['Trailer', '10-Wheeler Lorry', 'Box Body Truck', 'Flatbed', 'Not sure'], default: 'Not sure', half: true },
      { name: 'weight', label: 'Approx weight / load', type: 'text', placeholder: 'e.g. 20 tonnes / 1 container', half: true },
      { name: 'pickup', label: 'Pickup location', type: 'text', placeholder: 'e.g. Mombasa Port', half: true, required: true },
      { name: 'dropoff', label: 'Drop-off location', type: 'text', placeholder: 'e.g. Nairobi ICD', half: true, required: true },
      { name: 'date', label: 'Date needed', type: 'date', half: true },
      { name: 'notes', label: 'Anything else?', type: 'textarea', placeholder: 'Frequency, special handling…' },
    ],
  },
  {
    key: 'hotel', label: 'Hotel', tagline: 'Stays across Kenya & worldwide',
    fields: [
      { name: 'destination', label: 'Destination', type: 'text', placeholder: 'e.g. Diani, Nairobi', required: true },
      { name: 'checkIn', label: 'Check-in', type: 'date', half: true },
      { name: 'checkOut', label: 'Check-out', type: 'date', half: true },
      { name: 'rooms', label: 'Rooms', type: 'number', default: 1, half: true },
      { name: 'guests', label: 'Guests', type: 'number', default: 2, half: true },
      { name: 'tier', label: 'Standard', type: 'segmented', options: ['Budget', '3-star', '4-star', '5-star'], default: '4-star' },
      { name: 'notes', label: 'Anything else?', type: 'textarea' },
    ],
  },
  {
    key: 'airport-transfer', label: 'Airport Transfer', tagline: 'Meet & greet pickups',
    fields: [
      { name: 'from', label: 'From', type: 'text', placeholder: 'e.g. JKIA', half: true, required: true },
      { name: 'to', label: 'To', type: 'text', placeholder: 'e.g. Westlands hotel', half: true, required: true },
      { name: 'date', label: 'Date', type: 'date', half: true },
      { name: 'passengers', label: 'Passengers', type: 'number', default: 2, half: true },
      { name: 'vehicle', label: 'Vehicle', type: 'select', options: ['Economy Sedan', 'Premium SUV', 'Minivan', 'Executive Bus'], default: 'Economy Sedan' },
      { name: 'notes', label: 'Anything else?', type: 'textarea' },
    ],
  },
  {
    key: 'pilgrimage', label: 'Pilgrimage', tagline: 'Umrah, Hajj, Holy Land',
    fields: [
      { name: 'package', label: 'Package', type: 'select', options: ['Umrah', 'Hajj', 'Holy Land (Israel)', 'Rome', 'Fatima & Lourdes', 'India Sacred Sites'], default: 'Umrah', required: true },
      { name: 'travellers', label: 'Travellers', type: 'number', default: 1, half: true },
      { name: 'startDate', label: 'Preferred date', type: 'date', half: true },
      { name: 'notes', label: 'Anything else?', type: 'textarea' },
    ],
  },
  {
    key: 'conferences', label: 'Conferences', tagline: 'MICE & corporate events',
    fields: [
      { name: 'eventType', label: 'Event type', type: 'text', placeholder: 'e.g. annual conference, retreat', required: true },
      { name: 'delegates', label: 'Delegates', type: 'number', default: 50, half: true },
      { name: 'location', label: 'Preferred location', type: 'text', placeholder: 'e.g. Mombasa, Naivasha', half: true },
      { name: 'startDate', label: 'Date', type: 'date', half: true },
      { name: 'nights', label: 'Nights', type: 'number', default: 2, half: true },
      { name: 'notes', label: 'Requirements', type: 'textarea', placeholder: 'AV, catering, team building…' },
    ],
  },
]
