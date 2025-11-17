import { supabase } from '../lib/supabase'
import { Survey, Question, SurveyResponse } from '../types/database.types'

export const surveysService = {
  // Get all surveys for current user
  async getUserSurveys(userId: string) {
    const { data, error } = await supabase
      .from('surveys')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Survey[]
  },

  // Get a single survey by ID
  async getSurveyById(surveyId: string) {
    const { data, error } = await supabase
      .from('surveys')
      .select('*')
      .eq('id', surveyId)
      .single()

    if (error) throw error
    return data as Survey
  },

  // Create a new survey
  async createSurvey(
    userId: string,
    title: string,
    description: string | null,
    questions: Question[]
  ) {
    const { data, error } = await supabase
      .from('surveys')
      .insert({
        user_id: userId,
        title,
        description,
        questions,
        is_active: true,
      })
      .select()
      .single()

    if (error) throw error
    return data as Survey
  },

  // Update a survey
  async updateSurvey(
    surveyId: string,
    updates: {
      title?: string
      description?: string | null
      questions?: Question[]
      is_active?: boolean
    }
  ) {
    const { data, error } = await supabase
      .from('surveys')
      .update(updates)
      .eq('id', surveyId)
      .select()
      .single()

    if (error) throw error
    return data as Survey
  },

  // Delete a survey
  async deleteSurvey(surveyId: string) {
    const { error } = await supabase.from('surveys').delete().eq('id', surveyId)

    if (error) throw error
  },

  // Submit a response to a survey
  async submitResponse(
    surveyId: string,
    answers: Record<string, any>,
    respondentEmail?: string
  ) {
    const { data, error } = await supabase
      .from('survey_responses')
      .insert({
        survey_id: surveyId,
        answers,
        respondent_email: respondentEmail || null,
      })
      .select()
      .single()

    if (error) throw error
    return data as SurveyResponse
  },

  // Get all responses for a survey
  async getSurveyResponses(surveyId: string) {
    const { data, error } = await supabase
      .from('survey_responses')
      .select('*')
      .eq('survey_id', surveyId)
      .order('submitted_at', { ascending: false })

    if (error) throw error
    return data as SurveyResponse[]
  },

  // Get response statistics
  async getResponseStats(surveyId: string) {
    const responses = await this.getSurveyResponses(surveyId)
    const survey = await this.getSurveyById(surveyId)

    const stats = survey.questions.map((question) => {
      const questionAnswers = responses
        .map((r) => r.answers[question.id])
        .filter(Boolean)

      if (question.type === 'multiple') {
        const counts: Record<string, number> = {}
        questionAnswers.forEach((answer) => {
          counts[answer] = (counts[answer] || 0) + 1
        })
        return {
          questionId: question.id,
          question: question.question,
          type: question.type,
          answers: counts,
        }
      } else if (question.type === 'rating') {
        const ratings = questionAnswers.map((a) => parseInt(a))
        const average =
          ratings.reduce((sum, r) => sum + r, 0) / ratings.length || 0
        return {
          questionId: question.id,
          question: question.question,
          type: question.type,
          average: average.toFixed(1),
          ratings,
        }
      } else {
        return {
          questionId: question.id,
          question: question.question,
          type: question.type,
          answers: questionAnswers,
        }
      }
    })

    return {
      totalResponses: responses.length,
      stats,
    }
  },
}
