export interface ColumnDetails {
    columnName: string;
    type: string;
    length?: string | number | null;
    isPrimary: boolean;
    isGenerated: boolean;
    default: any; // Vous pouvez affiner ce type si nécessaire.
    isUnique: boolean;
    nullable: boolean;
  }