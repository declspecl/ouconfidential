export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
    public: {
        Tables: {
            boards: {
                Row: {
                    board_id: number
                    created_at: string
                    creator_uuid: string
                    name: string
                    picture_url: string
                }
                Insert: {
                    board_id?: number
                    created_at?: string
                    creator_uuid: string
                    name: string
                    picture_url: string
                }
                Update: {
                    board_id?: number
                    created_at?: string
                    creator_uuid?: string
                    name?: string
                    picture_url?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "boards_creator_uuid_fkey"
                        columns: ["creator_uuid"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["user_uuid"]
                    }
                ]
            }
            boards_users: {
                Row: {
                    board_id: number
                    user_uuid: string
                }
                Insert: {
                    board_id: number
                    user_uuid: string
                }
                Update: {
                    board_id?: number
                    user_uuid?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "boards_users_board_id_fkey"
                        columns: ["board_id"]
                        isOneToOne: false
                        referencedRelation: "boards"
                        referencedColumns: ["board_id"]
                    },
                    {
                        foreignKeyName: "boards_users_user_uuid_fkey"
                        columns: ["user_uuid"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["user_uuid"]
                    }
                ]
            }
            comments: {
                Row: {
                    comment_id: number
                    content: string
                    created_at: string
                    creator_uuid: string
                    parent_post: number
                }
                Insert: {
                    comment_id?: number
                    content: string
                    created_at?: string
                    creator_uuid: string
                    parent_post: number
                }
                Update: {
                    comment_id?: number
                    content?: string
                    created_at?: string
                    creator_uuid?: string
                    parent_post?: number
                }
                Relationships: [
                    {
                        foreignKeyName: "comment_creator_uuid_fkey"
                        columns: ["creator_uuid"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["user_uuid"]
                    },
                    {
                        foreignKeyName: "comment_parent_post_fkey"
                        columns: ["parent_post"]
                        isOneToOne: false
                        referencedRelation: "posts"
                        referencedColumns: ["post_id"]
                    }
                ]
            }
            posts: {
                Row: {
                    created_at: string
                    creator_uuid: string
                    description: string
                    parent_board: number
                    post_id: number
                    title: string
                }
                Insert: {
                    created_at?: string
                    creator_uuid: string
                    description: string
                    parent_board: number
                    post_id?: number
                    title: string
                }
                Update: {
                    created_at?: string
                    creator_uuid?: string
                    description?: string
                    parent_board?: number
                    post_id?: number
                    title?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "posts_creator_uuid_fkey"
                        columns: ["creator_uuid"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["user_uuid"]
                    },
                    {
                        foreignKeyName: "posts_parent_board_fkey"
                        columns: ["parent_board"]
                        isOneToOne: false
                        referencedRelation: "boards"
                        referencedColumns: ["board_id"]
                    }
                ]
            }
            users: {
                Row: {
                    created_at: string
                    email: string
                    grizz_id: string
                    password: string
                    user_uuid: string
                }
                Insert: {
                    created_at?: string
                    email?: string
                    grizz_id: string
                    password?: string
                    user_uuid?: string
                }
                Update: {
                    created_at?: string
                    email?: string
                    grizz_id?: string
                    password?: string
                    user_uuid?: string
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
