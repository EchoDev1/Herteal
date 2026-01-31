'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ShippingMethod {
  id: string;
  name: string;
  baseRate: number;
  perKgRate?: number;
  freeShippingThreshold?: number;
  estimatedDays: { min: number; max: number };
  enabled: boolean;
}

export interface ShippingZone {
  id: string;
  name: string;
  states: string[];
  methods: ShippingMethod[];
}

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
  'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
  'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

const DEFAULT_ZONES: ShippingZone[] = [
  {
    id: 'zone_lagos',
    name: 'Lagos Metro',
    states: ['Lagos'],
    methods: [
      { id: 'std_lagos', name: 'Standard', baseRate: 1500, estimatedDays: { min: 1, max: 2 }, enabled: true },
      { id: 'exp_lagos', name: 'Express', baseRate: 2500, estimatedDays: { min: 0, max: 1 }, enabled: true },
    ],
  },
  {
    id: 'zone_southwest',
    name: 'South-West',
    states: ['Ogun', 'Oyo', 'Osun', 'Ondo', 'Ekiti'],
    methods: [
      { id: 'std_sw', name: 'Standard', baseRate: 2500, estimatedDays: { min: 2, max: 4 }, enabled: true },
      { id: 'exp_sw', name: 'Express', baseRate: 4000, estimatedDays: { min: 1, max: 2 }, enabled: true },
    ],
  },
  {
    id: 'zone_southeast',
    name: 'South-East',
    states: ['Abia', 'Anambra', 'Ebonyi', 'Enugu', 'Imo'],
    methods: [
      { id: 'std_se', name: 'Standard', baseRate: 3000, estimatedDays: { min: 3, max: 5 }, enabled: true },
    ],
  },
  {
    id: 'zone_southsouth',
    name: 'South-South',
    states: ['Akwa Ibom', 'Bayelsa', 'Cross River', 'Delta', 'Edo', 'Rivers'],
    methods: [
      { id: 'std_ss', name: 'Standard', baseRate: 3500, estimatedDays: { min: 3, max: 5 }, enabled: true },
    ],
  },
  {
    id: 'zone_northcentral',
    name: 'North-Central',
    states: ['Benue', 'FCT', 'Kogi', 'Kwara', 'Nasarawa', 'Niger', 'Plateau'],
    methods: [
      { id: 'std_nc', name: 'Standard', baseRate: 3500, estimatedDays: { min: 3, max: 6 }, enabled: true },
    ],
  },
  {
    id: 'zone_northeast',
    name: 'North-East',
    states: ['Adamawa', 'Bauchi', 'Borno', 'Gombe', 'Taraba', 'Yobe'],
    methods: [
      { id: 'std_ne', name: 'Standard', baseRate: 4000, estimatedDays: { min: 4, max: 7 }, enabled: true },
    ],
  },
  {
    id: 'zone_northwest',
    name: 'North-West',
    states: ['Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Sokoto', 'Zamfara'],
    methods: [
      { id: 'std_nw', name: 'Standard', baseRate: 4000, estimatedDays: { min: 4, max: 7 }, enabled: true },
    ],
  },
];

interface ShippingContextType {
  zones: ShippingZone[];
  isLoaded: boolean;
  updateZone: (id: string, updates: Partial<ShippingZone>) => void;
  updateMethod: (zoneId: string, methodId: string, updates: Partial<ShippingMethod>) => void;
  getShippingForState: (state: string) => ShippingZone | undefined;
  calculateShipping: (state: string, methodName: string, weight?: number) => number;
}

const ShippingContext = createContext<ShippingContextType | undefined>(undefined);

const STORAGE_KEY = 'herteals_shipping_zones';

export function ShippingProvider({ children }: { children: ReactNode }) {
  const [zones, setZones] = useState<ShippingZone[]>(DEFAULT_ZONES);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setZones(JSON.parse(stored));
        } catch (error) {
          console.error('Failed to parse shipping zones:', error);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(zones));
    }
  }, [zones, isLoaded]);

  const updateZone = (id: string, updates: Partial<ShippingZone>) => {
    setZones(prev => prev.map(z => z.id === id ? { ...z, ...updates } : z));
  };

  const updateMethod = (zoneId: string, methodId: string, updates: Partial<ShippingMethod>) => {
    setZones(prev => prev.map(zone =>
      zone.id === zoneId
        ? {
            ...zone,
            methods: zone.methods.map(m => m.id === methodId ? { ...m, ...updates } : m),
          }
        : zone
    ));
  };

  const getShippingForState = (state: string) => {
    return zones.find(zone => zone.states.includes(state));
  };

  const calculateShipping = (state: string, methodName: string, weight: number = 1) => {
    const zone = getShippingForState(state);
    if (!zone) return 0;

    const method = zone.methods.find(m => m.name === methodName && m.enabled);
    if (!method) return 0;

    let cost = method.baseRate;
    if (method.perKgRate && weight > 1) {
      cost += method.perKgRate * (weight - 1);
    }

    return cost;
  };

  return (
    <ShippingContext.Provider value={{ zones, isLoaded, updateZone, updateMethod, getShippingForState, calculateShipping }}>
      {children}
    </ShippingContext.Provider>
  );
}

export function useShipping() {
  const context = useContext(ShippingContext);
  if (!context) throw new Error('useShipping must be used within ShippingProvider');
  return context;
}

export { NIGERIAN_STATES };
