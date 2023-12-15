import { UserRole } from '../consts/UserRoleConsts';
import { FeatureFlags } from '@/shared/types/featureFlags';

export interface User {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRole[];
    features?: FeatureFlags;
}

// интерфейс для стейта юзер
export interface UserSchema {
    authData?: User;
    _inited: boolean;
}
