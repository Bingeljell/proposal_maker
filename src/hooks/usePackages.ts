import { useState, useEffect, useCallback } from 'react';
import { PackageTemplate } from '../types';
import defaultPackagesData from '../data/defaultPackages.json';

const STORAGE_KEY = 'proposal_packages';

interface UsePackagesReturn {
  packages: PackageTemplate[];
  getPackageById: (id: string) => PackageTemplate | undefined;
  getPackagesByTier: (tier: PackageTemplate['tier']) => PackageTemplate[];
}

export const usePackages = (): UsePackagesReturn => {
  const [packages, setPackages] = useState<PackageTemplate[]>([]);

  // Initialize from localStorage or load defaults
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPackages(parsed);
      } catch (e) {
        console.error('Failed to parse packages', e);
        loadDefaults();
      }
    } else {
      loadDefaults();
    }
  }, []);

  const loadDefaults = () => {
    const defaults: PackageTemplate[] = defaultPackagesData.packages.map(p => ({
      ...p,
      tier: p.tier as PackageTemplate['tier']
    }));
    setPackages(defaults);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
  };

  const getPackageById = useCallback((id: string) => {
    return packages.find((pkg) => pkg.id === id);
  }, [packages]);

  const getPackagesByTier = useCallback((tier: PackageTemplate['tier']) => {
    return packages.filter((pkg) => pkg.tier === tier);
  }, [packages]);

  return {
    packages,
    getPackageById,
    getPackagesByTier,
  };
};
