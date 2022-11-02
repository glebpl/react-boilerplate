import { useMemo } from 'react';
import { v4 as uuid } from 'uuid';

export const useUniqueId = (): string => useMemo(() => uuid(), []);
