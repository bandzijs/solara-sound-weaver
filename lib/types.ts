export interface Song {
  id: string
  title_lv: string
  title_en: string
  youtube_id: string
  style: string
  badge_lv: string
  badge_en: string
  poem_en: string
  poem_lv: string
}

export interface Banner {
  id: string
  image_url: string
  link_url: string
  is_active: boolean
  created_at: string
}

export interface Submission {
  id: string
  name: string
  email: string
  poem_text: string
  mood: string
  created_at: string
}
