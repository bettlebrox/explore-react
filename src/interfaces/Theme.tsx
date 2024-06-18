export interface DassieItem {
    id: string;
    title: string;
    original_title: string;
    summary: string | null;
    created_at: string;
    updated_at: string;
    source: string;
}

export interface Theme extends DassieItem{

}