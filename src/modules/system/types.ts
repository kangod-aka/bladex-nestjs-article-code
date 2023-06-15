export type SearchType = 'like' | 'against' | 'elastic';

export interface SystemConfig {
    searchType?: SearchType;
}
