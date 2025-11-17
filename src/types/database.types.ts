export interface Profile {
  id: string
  email: string
  full_name: string | null
  created_at: string
  updated_at: string
}

export interface Question {
  id: string
  type: 'text' | 'multiple' | 'rating'
  question: string
  options?: string[]
}

export interface Survey {
  id: string
  user_id: string
  title: string
  description: string | null
  questions: Question[]
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface SurveyResponse {
  id: string
  survey_id: string
  answers: Record<string, any>
  respondent_email: string | null
  submitted_at: string
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at' | 'updated_at'>
        Update: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>
      }
      surveys: {
        Row: Survey
        Insert: Omit<Survey, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Survey, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
      }
      survey_responses: {
        Row: SurveyResponse
        Insert: Omit<SurveyResponse, 'id' | 'submitted_at'>
        Update: never
      }
    }
  }
}
