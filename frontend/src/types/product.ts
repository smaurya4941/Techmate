/**
 * Product & Catalogue Data Types for Techmate Industries (Phase 2)
 */

export type EquipmentCategory =
  | 'cooking-ranges'
  | 'combi-ovens'
  | 'bakery-machinery'
  | 'commercial-refrigeration'
  | 'stainless-steel-prep'
  | 'warewashing-sanitation';

export interface CategoryInfo {
  slug: EquipmentCategory;
  name: string;
  description: string;
  iconName: string;
  itemCount: number;
}

export interface ProductSpecification {
  label: string;
  value: string;
  unit?: string;
  group?: 'Dimensions & Weight' | 'Electrical & Thermal' | 'Capacity & Output' | 'Construction & Material';
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  modelNumber: string;
  category: EquipmentCategory;
  categoryName: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  galleryImages?: string[];
  keyHighlights: string[];
  specifications: ProductSpecification[];
  brochureUrl?: string;
  isFlagship?: boolean;
  warrantyPeriod: string;
  certifications: string[];
  powerSource: 'Electric' | 'Gas' | 'Dual Fuel' | 'Passive';
}

export interface FilterState {
  category: string;
  powerSource: string;
  searchQuery: string;
  sortBy: 'name-asc' | 'name-desc' | 'model';
}
